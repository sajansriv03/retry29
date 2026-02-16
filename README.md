# 🤠 Wacky Wacky West - Online Multiplayer

**Play your board game online with friends!** Share a link, 2-4 players join, and play together in real-time.

## 📚 Documentation Guide

**START HERE:**
1. 📖 **[QUICK-START.md](QUICK-START.md)** - Get online in 10 minutes (1-page reference)
2. 📘 **[SETUP-GUIDE.md](SETUP-GUIDE.md)** - Detailed step-by-step walkthrough
3. 📋 **[TESTING-GUIDE.md](TESTING-GUIDE.md)** - Verify everything works
4. 🔧 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Fix common issues
5. 📊 **[IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md)** - What was built & how

**Pick your path:**
- 🏃 **In a hurry?** → Read QUICK-START.md
- 🎯 **Want details?** → Read SETUP-GUIDE.md  
- 🐛 **Having issues?** → Read TROUBLESHOOTING.md
- 🧪 **Testing?** → Read TESTING-GUIDE.md
- 🤔 **Curious about tech?** → Read IMPLEMENTATION-SUMMARY.md

---

## ⚡ Ultra-Quick Start (TL;DR)

### 1. Firebase Setup (3 min)
- Go to https://console.firebase.google.com
- Create project → Enable Realtime Database → Copy config

### 2. Update Code (1 min)
- Edit `src/App.jsx` lines 9-16
- Paste your Firebase config

### 3. Deploy (4 min)
```bash
npm install -g vercel
cd wacky-west-online
npm install
vercel
```

### 4. Play!
- Share the URL with friends
- Create room → friends join → start game

**Cost:** $0 forever  
**Time:** 10 minutes  
**Skill needed:** None (just follow steps)

---

## 🚀 Full Quick Start Guide

Follow these steps **exactly** to get your game online:

### Step 1: Set Up Firebase (5 minutes)

Firebase is **FREE** and will handle your game's online features with NO usage limits for your needs.

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** (or **"Create a project"** if it's your first)
3. Enter a project name (e.g., "wacky-west")
4. **Disable** Google Analytics (you don't need it) and click **Create project**
5. Wait for it to finish, then click **Continue**

### Step 2: Enable Realtime Database

1. In the Firebase console, click **"Realtime Database"** in the left sidebar
2. Click **"Create Database"**
3. Choose **United States** (or your preferred location)
4. Select **"Start in test mode"** (we'll secure it later)
5. Click **Enable**

### Step 3: Get Your Firebase Config

1. Click the **gear icon** ⚙️ next to "Project Overview" in the top left
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** `</>`  (it looks like this: `</>`)
5. Enter an app nickname (e.g., "wacky-west-web")
6. **Don't check** "Firebase Hosting" 
7. Click **"Register app"**
8. You'll see a code block with `firebaseConfig` - **COPY THIS**. It looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

### Step 4: Update Your Code

1. Open `src/App.jsx` in a text editor
2. Find these lines near the top (around line 9-16):

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

3. **REPLACE the entire `firebaseConfig` object** with the one you copied from Firebase
4. **Save the file**

### Step 5: Deploy to Vercel (2 minutes)

Vercel is **FREE** and will host your game online forever.

1. Go to https://vercel.com/signup
2. Sign up with **GitHub** (easiest option)
3. Install **Vercel CLI** on your computer:
   - Open Terminal/Command Prompt
   - Run: `npm install -g vercel`

4. Navigate to your project folder:
   ```bash
   cd path/to/wacky-west-online
   ```

5. Run:
   ```bash
   npm install
   ```

6. Deploy:
   ```bash
   vercel
   ```

7. Answer the prompts:
   - **Set up and deploy?** → Press Enter (Yes)
   - **Which scope?** → Press Enter (your account)
   - **Link to existing project?** → Press Enter (No)
   - **What's your project's name?** → Press Enter (use default) or type a name
   - **In which directory is your code located?** → Press Enter (current directory)
   - **Want to override the settings?** → Press Enter (No)

8. Wait for deployment to finish. You'll get a URL like: `https://wacky-west-online.vercel.app`

### Step 6: Play!

1. Open the URL you got from Vercel
2. Click **"Create New Room"**
3. Enter your name
4. Click **"📋 Copy Room Link"**
5. Share the link with friends
6. When 2-4 players have joined, the host clicks **"Start Game"**

## 🎮 How to Play Online

### Creating/Joining a Room
- **Create**: First player creates a room and gets a unique link
- **Join**: Other players click the link or enter the room code
- **Start**: Host starts when 2-4 players are ready

### During the Game
- **Your Turn**: Drag and drop tiles when it's your turn
- **View Others**: Use the dropdown to see other players' tiles/cards
- **Voting**: When someone hits an outhouse, everyone votes
- **Reconnect**: If you disconnect, just refresh and you'll rejoin automatically

### Privacy Features
- Secret buildings are hidden until game ends
- Other players' tiles are hidden by default (click dropdown to view)
- Other players' vote cards are hidden by default (click dropdown to view)
- Selected votes are hidden until everyone casts their vote

### Game Features
- **Hover Tiles**: Hover over placed tiles to see what's underneath (they become transparent)
- **Reconnection**: If you disconnect, refresh the page and you'll automatically rejoin your seat
- **No Timers**: Take your time - game waits for you

## 🔧 Troubleshooting

### "Room not found"
- Make sure you copied the full link
- Room codes are case-sensitive

### "Can't connect to Firebase"
- Double-check you pasted your Firebase config correctly in `src/App.jsx`
- Make sure you enabled Realtime Database in Firebase

### Game not starting
- Need at least 2 players, max 4 players
- Only the host (first player) can start the game

### Players can't join
- Room is full (max 4 players)
- Game already started

### Want to redeploy after changes
```bash
vercel --prod
```

## 📝 Features Implemented

✅ **2-4 Player Support**: Up to 4 players can play together  
✅ **Room System**: Share a link to invite players  
✅ **Reconnection**: Players automatically rejoin if disconnected  
✅ **Privacy Controls**: Hidden secrets, click to view other players  
✅ **Hover Transparency**: See underneath placed tiles  
✅ **Worker Transparency**: Red circles without black backgrounds  
✅ **Even Tile Distribution**: Tiles distributed fairly across all players  
✅ **Real-time Sync**: All players see moves instantly  
✅ **No Timers**: Game waits for players, no auto-skip  
✅ **Game End Reveal**: All secret buildings shown at end  

## 🆘 Need Help?

If something's not working:
1. Check the browser console for errors (F12 → Console tab)
2. Make sure your Firebase config is correct
3. Make sure Realtime Database is enabled in Firebase
4. Try clearing your browser cache and refreshing

## 🎉 You're Done!

Your game is now live and ready to play with friends. Just share the link and have fun!
