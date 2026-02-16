# COMPLETE SETUP WALKTHROUGH
# Follow these steps EXACTLY and you'll have your game online in 10 minutes

## BEFORE YOU START
- You need: A computer with Node.js installed (download from https://nodejs.org if you don't have it)
- Cost: $0 (everything is free forever)
- Time: 10 minutes

## STEP 1: CREATE FIREBASE PROJECT (3 minutes)

### 1a. Go to Firebase Console
- Open your browser
- Go to: https://console.firebase.google.com/
- Sign in with your Google account (or create one)

### 1b. Create New Project
- Click the big "Add project" button (or "Create a project")
- Project name: Type anything you want (e.g., "wacky-west-game")
- Click "Continue"
- **IMPORTANT**: Toggle OFF "Enable Google Analytics" (you don't need it)
- Click "Create project"
- Wait 20-30 seconds for it to be created
- Click "Continue" when done

## STEP 2: ENABLE REALTIME DATABASE (2 minutes)

### 2a. Open Realtime Database
- You should now be in your Firebase project dashboard
- Look at the left sidebar menu
- Click "Realtime Database" (under "Build" section)
- If you don't see it, click the "All products" button at the bottom

### 2b. Create Database
- Click "Create Database" button
- Location: Choose "United States (us-central1)" or closest to you
- Click "Next"
- Security rules: Select "Start in test mode"
  - **Don't worry**: This is fine for a small private game with friends
  - If you want to secure it later, you can (but not needed for now)
- Click "Enable"
- Wait 10-20 seconds for the database to be created

## STEP 3: GET YOUR FIREBASE CONFIGURATION (2 minutes)

### 3a. Register Your Web App
- Click the gear icon ⚙️ next to "Project Overview" in the top left
- Click "Project settings"
- Scroll down to the "Your apps" section (at the bottom)
- Click the "</>" icon (web platform icon)
  - It's the third icon, looks like angle brackets: </>

### 3b. Register App
- App nickname: Type anything (e.g., "wacky-west-web")
- **DO NOT** check "Also set up Firebase Hosting"
- Click "Register app"

### 3c. Copy Configuration
- You'll see a code snippet that starts with "const firebaseConfig = {"
- **COPY EVERYTHING** inside the curly braces { }
- It should look like this:

```
apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXX",
authDomain: "your-project-123.firebaseapp.com",
databaseURL: "https://your-project-123-default-rtdb.firebaseio.com",
projectId: "your-project-123",
storageBucket: "your-project-123.appspot.com",
messagingSenderId: "1234567890",
appId: "1:1234567890:web:xxxxxxxxxxxxx"
```

- **SAVE THIS** in a notepad or leave the tab open - you'll need it in Step 4
- Click "Continue to console" (you're done with Firebase for now!)

## STEP 4: UPDATE YOUR CODE (1 minute)

### 4a. Open the Project
- Find the "wacky-west-online" folder on your computer
- Open the file: `src/App.jsx` in any text editor
  - Use Notepad, VS Code, Sublime, or any editor

### 4b. Find and Replace Firebase Config
- Look for these lines near the top (around line 9-16):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4c. Replace with Your Config
- **DELETE** everything inside the { } braces
- **PASTE** what you copied from Firebase in Step 3c
- It should now look like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-123.firebaseapp.com",
  databaseURL: "https://your-project-123-default-rtdb.firebaseio.com",
  projectId: "your-project-123",
  storageBucket: "your-project-123.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:xxxxxxxxxxxxx"
};
```

- **SAVE THE FILE** (Ctrl+S or Cmd+S)

## STEP 5: DEPLOY TO VERCEL (4 minutes)

### 5a. Install Vercel CLI
- Open Terminal (Mac) or Command Prompt (Windows)
  - Mac: Press Cmd+Space, type "Terminal", press Enter
  - Windows: Press Win+R, type "cmd", press Enter

- Type this command and press Enter:
```bash
npm install -g vercel
```
- Wait for it to install (30-60 seconds)

### 5b. Navigate to Your Project
- In the terminal, go to your project folder:
  - **Mac**: `cd ~/Desktop/wacky-west-online` (or wherever you put it)
  - **Windows**: `cd C:\Users\YourName\Desktop\wacky-west-online`
  - **Tip**: You can drag the folder into the terminal to auto-fill the path

### 5c. Install Dependencies
- Type this and press Enter:
```bash
npm install
```
- Wait for it to finish (1-2 minutes)

### 5d. Deploy to Vercel
- Type this and press Enter:
```bash
vercel
```

- **First time?** It will ask you to log in:
  - Choose "Continue with GitHub" (easiest)
  - A browser window will open - authorize Vercel
  - Go back to your terminal

- Now answer the prompts:

```
? Set up and deploy "~/wacky-west-online"? 
→ Press ENTER (Yes)

? Which scope do you want to deploy to?
→ Press ENTER (your account)

? Link to existing project?
→ Press ENTER (No)

? What's your project's name?
→ Press ENTER (or type a custom name)

? In which directory is your code located?
→ Press ENTER (current directory)

? Want to modify these settings?
→ Press ENTER (No)
```

- Wait for deployment (1-2 minutes)

### 5e. Get Your URL
- When done, you'll see:
```
✅ Production: https://wacky-west-online.vercel.app
```

- **THAT'S YOUR GAME URL!** Copy it!

## STEP 6: PLAY THE GAME!

### Start a Game
1. Open your game URL in a browser
2. Type your name
3. Click "Create New Room"
4. You'll see a room code (e.g., "AB12CD")
5. Click "📋 Copy Room Link"

### Invite Friends
- Send them the link you just copied
- OR tell them to go to your game URL and enter the room code

### Start Playing
- Wait for 2-4 players to join
- Host (you) clicks "Start Game"
- Play!

## THAT'S IT! 🎉

Your game is now live at your Vercel URL forever. Any time you want to play:
1. Go to your URL
2. Create or join a room
3. Play with friends!

## COMMON QUESTIONS

**Q: Do I need to keep my computer running for others to play?**
A: NO! Once deployed, Vercel hosts it 24/7. You can turn off your computer.

**Q: Can I use this forever for free?**
A: YES! Both Firebase and Vercel are free for small games like this.

**Q: What if I close the terminal?**
A: That's fine! Your game is already deployed and will stay online.

**Q: How do I update the game later?**
A: Make your changes, save files, then run `vercel --prod` again.

**Q: The game won't start**
A: Make sure you have 2-4 players in the room. Only the host can start.

**Q: Players can't see each other's moves**
A: Check that you updated the Firebase config in src/App.jsx correctly.

**Q: I want to start over**
A: Delete the project in Vercel dashboard and run `vercel` again.

## TROUBLESHOOTING

### "Firebase: Error (auth/invalid-api-key)"
- You didn't update the Firebase config in src/App.jsx
- Go back to Step 4 and make sure you pasted your real config

### "Room not found"
- Room codes are case-sensitive
- Make sure friends are using the exact link you sent

### "npm: command not found"
- You need to install Node.js from https://nodejs.org
- Download and install it, then restart your terminal

### "Permission denied"
**Mac**: Run `sudo npm install -g vercel` (it will ask for your password)
**Windows**: Run Command Prompt as Administrator

### Still stuck?
- Make sure you followed every step exactly
- Check that Firebase Realtime Database is enabled
- Try clearing browser cache and refreshing
- Open browser console (F12) and check for error messages

## SUCCESS CHECKLIST

Before you contact support, make sure you:
- [ ] Created Firebase project
- [ ] Enabled Realtime Database (in "test mode" is fine)
- [ ] Copied Firebase config and pasted it into src/App.jsx
- [ ] Saved the src/App.jsx file
- [ ] Ran `npm install` successfully
- [ ] Ran `vercel` and got a deployment URL
- [ ] Can open the URL in your browser

If you checked all these boxes and it's still not working, open browser console (F12) and check for errors.
