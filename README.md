![image](https://github.com/user-attachments/assets/62b9f174-b826-4ac7-a0d1-9858b4456afa)

## Using The App

### Working With Timelines

A Timeline is a sequence of work and break intervals that can help you track your screen time with the help of timers.
<br/><br/>
Go to the Timeline screen by clicking the **Timeline** tab in the top navigation:

![image](https://github.com/user-attachments/assets/9469321d-a2d5-4003-98e2-ea7e6db545ca)
<br/><br/>

Use the **Timeline Duration** and **Interval Size** controls to create your timeline:

![image](https://github.com/user-attachments/assets/ce644963-b302-4068-a87e-7f8b6d058180)
<br/><br/>

The generated Timeline will appear at the bottom of the page and it will be updated automatically every time you make a change.
<br/><br/>
Once you are done making changes, click on the **Start** button to start the Timeline:

![image](https://github.com/user-attachments/assets/b3ce784e-aa7c-48c6-a7e2-f4e6d4548419)
<br/><br/>

Once you start the Timeline, you will see the active Timeline screen. Here you can keep track of your work and break intervals.
<br/><br/>
Cick on the **Stop Timeline** button if you want to delete the current active Timeline and start over:

![image](https://github.com/user-attachments/assets/4ebbba74-8a0f-48b0-89f6-6c2a7fe6cba2)
<br/><br/>

### Using Presets

You can save a Timeline to your account for later use. This is called a **Preset**.
<br/><br/>
Create a new Timeline from the Timeline screen and click the **Save** button:

![image](https://github.com/user-attachments/assets/88944caf-4577-407d-b64b-c28c622227ef)
<br/><br/>

You will see a modal prompting you to create an account.
<br/><br/>
Enter your username and password and click the **Sign Up** button:

![image](https://github.com/user-attachments/assets/e07262e5-4576-4a63-a0d2-47b0d3ac6da7)
<br/><br/>

Once you create your account, click on the **Save** button once again. You should see a new modal appear prompting you to save your timeline.
<br/><br/>
Enter the name of your Preset and click the **Save** button:

![image](https://github.com/user-attachments/assets/4f4118e4-6624-47ef-8e35-209b1f5d0316)
<br/><br/>

Once you have saved your Preset, you will be redirected to the **Presets** screen where you can manage all of your Presets.
<br/><br/>
To delete a Preset, click on the **Delete** button:

![image](https://github.com/user-attachments/assets/56613749-9b4c-4d24-b248-3f00c1287a64)
<br/><br/>

You will see a modal prompting you to delete the preset.
<br/><br/>
Click on the **Delete** button:

![image](https://github.com/user-attachments/assets/eaaa2e5a-9ed7-43af-b8d7-cfce8b955d30)

## Local Setup

### 1. Install Packages

Clone the repo and run `npm install` from the repository's root to install the required package dependencies

### 2. Running Locally

Run `npm run dev` from the repository's root to start the local dev build.

Go to `localhost:3000` to access the app:

![image](https://github.com/user-attachments/assets/3b2de016-efd6-4533-87a0-4a00d1162eda)
<br/><br/>

### (Optional) Configure Firebase

If you want to be able to save presets you need to connect the app to Firebase.

Go to https://firebase.google.com/ and create a new Web app.

Go to https://console.firebase.google.com/ and find your app's `firebaseConfig`.

Create a file called `.env.development.local` in the project's root and set your environment variables to match the `firebaseConfig`\
(You can reference the provided example `.env.development` file):

![image](https://github.com/user-attachments/assets/ea8e066c-dc44-44e1-80da-f3b500c91ab4)
<br/><br/>

Restart the dev server by running `npm run dev` again.

You should be able to create an account and save presets.
