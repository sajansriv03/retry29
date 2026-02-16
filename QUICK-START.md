# 🚀 QUICK START - Get Your Game Online in 10 Minutes

## Step 1: Firebase Setup (3 min)
1. Go to https://console.firebase.google.com
2. Create project → Disable Analytics → Create
3. Click "Realtime Database" → Create Database → US → Test Mode → Enable
4. Click ⚙️ → Project Settings → Scroll down → Click "</>" 
5. Register app → Copy the `firebaseConfig` object

## Step 2: Update Code (1 min)
1. Open `src/App.jsx`
2. Find lines 9-16 (the `firebaseConfig` object)
3. Replace with what you copied from Firebase
4. Save file

## Step 3: Deploy (4 min)
```bash
npm install -g vercel
cd wacky-west-online
npm install
vercel
```

Follow prompts (just press Enter for all questions)

## Step 4: Play!
1. Copy the URL Vercel gives you
2. Open it in browser
3. Create room
4. Share link with friends
5. Start game when 2-4 players joined

---

## 📋 Deployment Checklist
- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] Firebase config copied to src/App.jsx
- [ ] File saved
- [ ] `npm install` completed
- [ ] `vercel` deployed successfully
- [ ] Game URL works in browser

## 🎮 How to Play
- **Create room**: First player creates and gets shareable link
- **Join**: Friends click link or enter room code
- **Start**: Host starts when 2-4 players ready
- **Play**: Drag tiles on your turn, vote on outhouses
- **Reconnect**: Refresh page if disconnected

## 🔧 Quick Troubleshooting
| Issue | Solution |
|-------|----------|
| "Firebase error" | Update config in src/App.jsx |
| "Room not found" | Use exact link/code (case-sensitive) |
| "npm not found" | Install Node.js from nodejs.org |
| Game won't start | Need 2+ players, host must start |

## 📚 Detailed Help
- **Full walkthrough**: Read `SETUP-GUIDE.md`
- **Implementation details**: Read `IMPLEMENTATION-SUMMARY.md`
- **General info**: Read `README.md`

## 🎉 That's It!
Your game is now live and ready to play with friends!
