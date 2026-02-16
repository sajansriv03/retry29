# 🔧 TROUBLESHOOTING & FAQ

## 🚨 Common Issues & Solutions

### Issue: "Firebase: Error (auth/invalid-api-key)"

**Cause:** Firebase configuration not updated or incorrect

**Solution:**
1. Open `src/App.jsx`
2. Find lines 9-16 (the `firebaseConfig` object)
3. Make sure you replaced ALL the placeholder values
4. Verify you copied the ENTIRE config from Firebase console
5. Check for typos in the values
6. Save the file
7. Rebuild and redeploy

**How to verify:**
- Your config should have REAL values like:
  - `apiKey: "AIzaSy..."` (not "YOUR_API_KEY")
  - `projectId: "wacky-west-123"` (not "YOUR_PROJECT_ID")
- All values should match what Firebase console shows

---

### Issue: "Room not found"

**Cause 1:** Room code is case-sensitive

**Solution:** 
- Room codes are UPPERCASE
- Make sure you're typing exactly what you see
- Better: use "Copy Room Link" button instead

**Cause 2:** Room doesn't exist

**Solution:**
- Have the host create the room first
- Make sure you're using the correct room code
- Room codes are 6 random characters (like "ABC123")

---

### Issue: "Can't connect to Firebase" or "Permission denied"

**Cause:** Realtime Database not enabled or rules too restrictive

**Solution:**
1. Go to Firebase Console
2. Click "Realtime Database" in sidebar
3. If you see "Create Database" → click it and enable
4. If database exists, click "Rules" tab
5. Make sure rules look like this:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
6. Click "Publish"

**Note:** These open rules are fine for a private game with friends. For public deployment, you'd want to add proper security rules.

---

### Issue: Game won't start

**Possible causes:**

**1. Not enough players**
- Need at least 2 players
- Maximum 4 players
- Wait for players to join

**2. You're not the host**
- Only the first player (host) can start
- Host has crown emoji 👑 next to name
- Other players see "Waiting for host..."

**3. Players disconnected**
- All players must be connected
- Check player list - all should show green "Connected"
- Have disconnected players refresh their browser

---

### Issue: Players see different game states

**Cause:** Firebase sync issue or stale data

**Solution:**
1. All players refresh their browsers (Ctrl+R / Cmd+R)
2. If problem persists, check browser console (F12) for errors
3. Verify all players using same room code
4. Check your internet connection
5. Try clearing browser cache and reloading

---

### Issue: Can't drag tiles

**Possible causes:**

**1. Not your turn**
- Only current player can drag tiles
- Check for ⭐ emoji next to player name
- Wait for your turn

**2. Browser compatibility**
- Drag and drop works in modern browsers
- Try updating your browser
- Test in Chrome/Firefox/Edge

**3. Tile has no valid moves**
- Tile might be blocked
- Try a different tile
- Check worker positions

---

### Issue: Voting doesn't work

**Possible causes:**

**1. Not all players voted**
- ALL players must select at least one card
- Check if all players have selections
- "Cast Votes" button disabled until everyone selected

**2. No cards to vote with**
- If all your cards are used, you can't vote
- This shouldn't happen - it's a bug

**3. Wildcard confusion**
- Click Wildcard → modal appears
- Choose "Yes 2" or "No 2"
- Then it counts as a vote

---

### Issue: Can't see other players' tiles/cards

**This is intentional!** Privacy feature.

**To view other players:**
1. Look for "View Player:" dropdown in sidebar
2. Select the player you want to view
3. Their tiles/cards will appear
4. Select yourself to go back to your view

---

### Issue: Workers have black backgrounds

**Cause:** Old code still being used

**Solution:**
1. Make sure you're using the NEW `src/App.jsx` I provided
2. Check line ~22 for worker image definition
3. Should be an SVG with a circle, not a square
4. Rebuild and redeploy
5. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

---

### Issue: Hover transparency doesn't work

**Cause:** Browser doesn't support hover on SVG elements, or JavaScript disabled

**Solution:**
1. Try a different browser (Chrome/Firefox recommended)
2. Make sure JavaScript is enabled
3. Check browser console for errors
4. Hard refresh (Ctrl+Shift+R)

---

### Issue: Reconnection doesn't work

**Possible causes:**

**1. Different browser/device**
- Player ID stored in localStorage
- Each browser/device has different ID
- Can't reconnect from different device (by design)

**2. Cleared browser data**
- If you cleared cookies/localStorage, ID is lost
- Will join as new player instead

**3. Room was deleted**
- Rooms persist until manually deleted
- If admin deleted room in Firebase, it's gone

**Solution:**
- Use same browser/device
- Don't clear browser data mid-game
- Keep track of which browser you started with

---

### Issue: "npm: command not found"

**Cause:** Node.js not installed

**Solution:**
1. Go to https://nodejs.org
2. Download the LTS version (left button)
3. Install it
4. Restart your terminal/command prompt
5. Try `npm --version` to verify

---

### Issue: "vercel: command not found"

**Cause:** Vercel CLI not installed or not in PATH

**Solution:**
```bash
npm install -g vercel
```

**If that fails:**
- **Mac/Linux:** Try `sudo npm install -g vercel`
- **Windows:** Run Command Prompt as Administrator

**Still doesn't work:**
- Use Vercel web dashboard instead:
  1. Go to https://vercel.com
  2. Click "Import Project"
  3. Upload your files
  4. Deploy

---

### Issue: Deployment fails with errors

**Common causes:**

**1. Build errors**
```bash
npm run build
```
- If this fails, check for syntax errors in code
- Look for missing dependencies

**2. Missing Firebase config**
- Error mentions Firebase
- Make sure config is updated in `src/App.jsx`

**3. Wrong directory**
- Make sure you're in `wacky-west-online` folder
- Run `ls` (Mac/Linux) or `dir` (Windows) to check

**4. Network issues**
- Check internet connection
- Try again in a few minutes
- Vercel might be down (rare)

---

### Issue: Game is slow or laggy

**Possible causes:**

**1. Slow internet connection**
- Firebase needs decent internet
- Test your connection speed
- Try on better wifi/connection

**2. Too many players (unlikely with 4 max)**
- Shouldn't be an issue with only 4 players

**3. Firebase free tier limits**
- Unlikely unless you have MANY games running
- Check Firebase usage dashboard
- 99.9% chance you're well under limits

**Solution:**
- Refresh all browsers
- Check Firebase Console → Usage tab
- Make sure you're using Firebase Realtime Database (not Firestore)

---

### Issue: Secret buildings visible to others

**This is a BUG if it happens!**

**Check:**
1. Open browser dev tools (F12)
2. Go to Network tab
3. Filter by "firebase"
4. Check what data is being sent

**Verify:**
- Secrets stored at `/rooms/{roomId}/secretBuildings/{playerName}`
- Each player should only see their own
- Viewing another player shouldn't show their secret

**If secrets ARE visible:**
- File a bug report (this shouldn't happen)
- Code might have been modified incorrectly

---

### Issue: Page is blank / won't load

**Possible causes:**

**1. JavaScript errors**
- Open console (F12)
- Look for red errors
- Most common: Firebase config issue

**2. Wrong URL**
- Make sure you're using the full Vercel URL
- Should be like: `https://your-project.vercel.app`

**3. Deployment failed**
- Check Vercel dashboard
- Look at deployment logs
- Might need to redeploy

**Solution:**
1. Check browser console for errors
2. Verify URL is correct
3. Try different browser
4. Hard refresh (Ctrl+Shift+R)

---

## 🔍 How to Debug

### Step 1: Check Browser Console
1. Press F12
2. Click "Console" tab
3. Look for red error messages
4. Google the error or ask for help with exact message

### Step 2: Check Firebase Console
1. Go to Firebase Console
2. Click "Realtime Database"
3. Look at the data structure
4. Make sure rooms are being created

### Step 3: Check Vercel Logs
1. Go to Vercel Dashboard
2. Click your project
3. Click latest deployment
4. Click "View Function Logs"
5. Look for errors

### Step 4: Test Locally
```bash
npm run dev
```
- If it works locally but not deployed:
  - Issue is with deployment/Firebase
- If it doesn't work locally:
  - Issue is with code/dependencies

---

## 📞 Getting Help

### Before Asking for Help

Have ready:
- [ ] Browser console errors (screenshot)
- [ ] Exact steps to reproduce
- [ ] Which browser/device
- [ ] Firebase project ID
- [ ] Vercel deployment URL
- [ ] Room code (if relevant)

### Where to Get Help

1. **Read the guides:**
   - `SETUP-GUIDE.md` for deployment
   - `TESTING-GUIDE.md` for verification
   - `README.md` for general info

2. **Check Firebase docs:**
   - https://firebase.google.com/docs/database

3. **Check Vercel docs:**
   - https://vercel.com/docs

4. **Stack Overflow:**
   - Search for your error message
   - Tag: firebase, react, vercel

---

## 🎯 Quick Fixes Checklist

Before doing anything else, try these:

- [ ] Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Clear browser cache
- [ ] Try incognito/private window
- [ ] Try different browser
- [ ] Check internet connection
- [ ] Verify Firebase config is correct
- [ ] Verify Realtime Database is enabled
- [ ] Check Firebase Console for data
- [ ] Check Vercel logs for errors
- [ ] Redeploy with `vercel --prod`

**90% of issues are solved by one of these!**

---

## ✅ Verification Checklist

If you're having issues, verify:

1. **Firebase:**
   - [ ] Project created
   - [ ] Realtime Database enabled
   - [ ] Test mode rules active
   - [ ] Config copied to `src/App.jsx`
   - [ ] All placeholder values replaced

2. **Code:**
   - [ ] Using the correct `src/App.jsx` file
   - [ ] No syntax errors
   - [ ] `npm install` completed successfully
   - [ ] `npm run build` works locally

3. **Deployment:**
   - [ ] Vercel deployment successful
   - [ ] No build errors in logs
   - [ ] URL accessible
   - [ ] Latest code is deployed

4. **Browser:**
   - [ ] JavaScript enabled
   - [ ] Cookies enabled
   - [ ] Modern browser (Chrome/Firefox/Safari/Edge)
   - [ ] No extensions blocking requests

---

## 🎉 Still Stuck?

If you've tried everything above and it's still not working:

1. **Delete and start over:**
   - Sometimes easier than debugging
   - Follow `SETUP-GUIDE.md` from scratch
   - Takes only 10 minutes

2. **Test with minimal setup:**
   - Create new Firebase project
   - Use default settings
   - Deploy with no modifications

3. **Provide detailed error info:**
   - Exact error message
   - Steps to reproduce
   - Browser console screenshot
   - Firebase/Vercel URLs

Most issues are simple fixes - don't give up!
