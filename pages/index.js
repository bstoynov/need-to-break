import Button, { buttonTypes } from "../components/atoms/Button";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="bg-landing p-24 420:p-32 932:p-48 flex flex-col w-screen h-screen">
      {/* Main */}
      <div className="w-full flex flex-col justify-start items-center">
        <div className="flex flex-col gap-24">
          <h1 className="flex flex-col gap-4 justify-center items-center heading-landing text-center uppercase text-white">
            <span>Take Your Productivity</span>
            <span>To The</span>
            <span className="text-primary-500 bg-white px-16 py-0 rounded-8">
              Next Level
            </span>
          </h1>
          <h2 className="flex flex-col gap-4 subheading-landing pt-8 text-center text-white">
            <span>The Smart Way to manage your screen time</span>
            <span>While staying Productive</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 480:grid-cols-2 gap-32 py-48">
          <div className="480:col-span-2 480:flex justify-center">
            <Button
              styleOverride="w-full 480:w-auto"
              type={buttonTypes.callToAction}
              handleClick={() => router.push("/timeline")}
            >
              Try It Now
            </Button>
          </div>

          <Button
            type={buttonTypes.primary}
            handleClick={() =>
              (window.location.href =
                "https://github.com/Sharpirate/need-to-break")
            }
          >
            Open in Github
          </Button>
          <Button
            type={buttonTypes.secondary}
            handleClick={() =>
              (window.location.href =
                "https://github.com/Sharpirate/need-to-break")
            }
          >
            Open in Figma
          </Button>
        </div>
      </div>

      {/* Devices Image */}
      <div className="devices-landing h-full w-full" />
    </main>
  );
}
