import React, { useState, useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '../../utils/useIsomorphicLayoutEffect';
import PropTypes from 'prop-types';
import Interval, { intervalTypes } from '../atoms/Interval';
import Tab, { tabTypes } from '../atoms/Tab';
import { isBelowBreakpoint } from '../../utils/tailwindUtil';
import useClientWidth from '../../utils/useClientWidth';
import findClosest from '../../utils/findClosest';
import { generateBlocks, parseTimeline } from '../../utils/timelineUtil';

const timeline = parseTimeline({
  blocks: generateBlocks(4 * 12, 30, 10)
});

const { pages, pageValues, scaleMap, scales, intervals } = timeline;
function Timeline() {
  const [scale, setScale] = useState(15);
  const [hours, setHours] = useState(scaleMap[scale]);

  const clientWidth = useClientWidth();
  const isMobile = isBelowBreakpoint(clientWidth, '932');

  const timelineProps = {
    intervals,
    pages,
    hours,
    setHours,
    scale,
    setScale,
    progress: 0,
  };
  
  const regularTimeline = (
    <div className="hidden 932:block">
      <RegularTimeline {...timelineProps} />
    </div>
  );

  const mobileTimeline = (
    <div className="block 932:hidden">
      <MobileTimeline {...timelineProps} />
    </div>
  );

  return isMobile === null ? (
    // return both on server side to avoid flickering
    <>
      {regularTimeline}
      {mobileTimeline}
    </>
  ) : isMobile === false ? regularTimeline : mobileTimeline;
}

const RegularTimeline = ({ intervals, pages, scale, setScale, hours, setHours, progress }) => {
  const timelineRef = useRef();
  const [page, setPage] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [scrollTarget, setScrollTarget] = useState({ value: null, smooth: null });

  // Listen for scroll event
  useIsomorphicLayoutEffect(() => {
    const timeline = timelineRef.current;

    if (timeline) {
      const { clientWidth, scrollWidth } = timeline;
      const scrollableWidth = scrollWidth - clientWidth;

      const handleScroll = e => {
        const currentScroll = e.target.scrollLeft / scrollableWidth;

        if (scrollTarget.value === currentScroll) {
          setScrollTarget({ value: null, smooth: null });
        }

        setScroll(currentScroll);
      };

      timeline.addEventListener('scroll', handleScroll);
    }

    return () => timeline.removeEventListener('scroll', handleScroll);
  }, [timelineRef, scrollTarget.value]);

  // Update the current page while scrolling
  useEffect(() => {
    const nextPage = findClosest(scroll, pageValues);

    if (page !== nextPage && scrollTarget.value === null) {
      setPage(nextPage);
    }
  }, [scroll]);

  // Programatically scroll to a certain scroll target
  useIsomorphicLayoutEffect(() => {
    if (scrollTarget.value !== null && scrollTarget.smooth !== null) {
      scrollTo(scrollTarget);
    }
  }, [scrollTarget.value, scrollTarget.smooth]);

  const scrollTo = ({ value, smooth }) => {
    const timeline = timelineRef.current;

    if (timeline) {
      const { clientWidth, scrollWidth } = timeline;
      const scrollableWidth = scrollWidth - clientWidth;

      timeline.scrollTo({
        left: value  * scrollableWidth,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  }

  const handleScaleChange = newScale => {
    if (newScale !== scale) {
      setScrollTarget({
        value: scroll,
        smooth: false
      });
      setScale(newScale);
      setHours(scaleMap[newScale]);
    }
  }

  const handlePageChange = newPage => {
    setPage(newPage);
    setScrollTarget({
      value: newPage,
      smooth: true
    });
  }

  return (
    <div> 
      <div
        tabIndex={0}
        ref={timelineRef}
        className="overflow-x-auto pb-64 custom-scrollbar focus:outline-none"
        onMouseEnter={() => timelineRef.current.focus()}
      >
        <div
          className='px-[50%]'
          style={{
            width: `calc(100% + ${(156 * (hours.length - 1))}px)`,
            // (label width in px * 3) * (number of labels - 1)
            // minWidth: clientWidth - monopadding
          }}
        >
          <Arrow
            isMobile={false}
            visible={true}
            type={intervalTypes.work}
            progress={progress}
          />

          <ul className='flex flex-row'>
            {intervals.map((interval, index) => (
              <Interval key={interval.timestamp} type={interval.type} first={index === 0} last={index === intervals.length - 1} duration={interval.duration} />
              ))}
          </ul>

          <ul className='flex flex-row justify-between mt-24 -mx-monopad'>
            {hours.map(hour => (
              <Hour key={hour}>{hour}</Hour>
            ))}
          </ul>
        </div>
      </div>

      <Pagination
        pages={pages}
        page={page}
        handlePageChange={handlePageChange}
        scales={scales}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
      />

    </div>
  );
};

function MobileTimeline({ intervals, scale, setScale, hours, setHours, progress }) {
  // const timelineRef = useRef();
  const handleScaleChange = newScale => {
    if (newScale !== scale) {
      setScale(newScale);
      setHours(scaleMap[newScale]);
    }
  }

  return (
    <div>
      <Pagination
        scales={scales}
        currentScale={scale}
        handleScaleChange={handleScaleChange}
        isMobile={true}
      />
      
      <div
        // ref={timelineRef}
      >
        <div
          className="relative inline-flex flex-row-reverse justify-center"
          style={{
            height: `${(156 * (hours.length - 1))}px`,
          }}
        >
          <Arrow
            isMobile={true}
            visible={true}
            type={intervalTypes.work}
            progress={progress}
          />

          <ul className="inline-flex flex-col h-full py-8 420:py-12">
            {intervals.map((interval, index) => (
              <Interval key={interval.timestamp} type={interval.type} first={index === 0} last={index === intervals.length - 1} duration={interval.duration} />
              ))}
          </ul>

          <ul className="absolute top-0 h-full -left-16 420:-left-24 -translate-x-full flex flex-col justify-between">
            {hours.map(hour => (
              <Hour key={hour}>{hour}</Hour>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
  Timeline.propTypes = {
  timeline: PropTypes.array,
  hours: PropTypes.array,
  showArrow: PropTypes.bool
};

function Hour({ children }) {
  return (
    <li className="mono-med text-gray-500 select-none">{children}</li>
  );
}
function Arrow({ type, visible, progress, isMobile }) {
  let colorStyle = '';

  switch (type) {
    case intervalTypes.work:
    case intervalTypes.break:
      colorStyle = 'fill-primary-500';
      break;
    case intervalTypes.blocked:
    case intervalTypes.floating:
    colorStyle = 'fill-blocked-500';
      break;
    default:
      break;
  }

  const visibilityStyle = visible ? "visible" : "invisible";

  return (isMobile ? (
    <div className={`${visibilityStyle} absolute left-full top-8 420:top-12 bottom-8 420:bottom-12`}>
      <svg
        className="relative w-16 h-16 420:w-20 420:h-20 ml-8 -translate-y-1/2"
        style={{ top: `${progress}%` }}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  ) : (
    <div className={`${visibilityStyle}`}>
      <svg
        className="relative mb-8 w-20 h-20 -rotate-90 -translate-x-1/2"
        style={{ left: `${progress}%` }}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <path className={colorStyle} d="M17.5 1.66666L2.5 9.99999L17.5 18.3333L17.5 1.66666Z"/>
      </svg>
    </div>
  ));
}

Arrow.propTypes = {
  type: PropTypes.string,
  visible: PropTypes.bool,
  progress: PropTypes.number
};

function Pages({ pages, currentPage, handlePageChange }) {
  return (
    <ul className="flex">
      {pages.map((page, index) => (
        <Tab
          key={page.value}
          type={tabTypes.pagination}
          first={index === 0}
          active={page.value === currentPage}
          last={index === pages.length - 1}
          value={page.value}
          handleClick={() => handlePageChange(page.value)}
        >
          {page.name}
        </Tab>
      ))}
    </ul>
  );
}

function Pagination({ pages, page, handlePageChange, scales, currentScale, handleScaleChange, isMobile }) {
  return isMobile ? (
    <div className="flex justify-center py-32 420:py-48">
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}  
      />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-24 pb-0 pt-48">
      <Pages
        pages={pages}
        currentPage={page}
        handlePageChange={handlePageChange}
      />
      <Pages
        pages={scales}
        currentPage={currentScale}
        handlePageChange={handleScaleChange}
      />
    </div>
  );
}

export default Timeline;