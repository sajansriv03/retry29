# 🧪 TESTING GUIDE - Verify Everything Works

Use this checklist to test all features after deployment.

## ✅ Pre-Deployment Tests (Local)

### 1. Build Test
```bash
npm run build
```
- [ ] Builds without errors
- [ ] Creates `dist/` folder
- [ ] No warnings about missing Firebase config

### 2. Local Development Test
```bash
npm run dev
```
- [ ] Starts on http://localhost:3000
- [ ] No console errors
- [ ] Lobby screen loads

## ✅ Post-Deployment Tests (Live)

### Test 1: Room Creation
- [ ] Open your deployed URL
- [ ] Enter a name
- [ ] Click "Create New Room"
- [ ] Room code appears (6 characters)
- [ ] "Copy Room Link" button works
- [ ] Player appears in player list
- [ ] Player shows as "Connected" (green)
- [ ] Crown emoji appears next to your name (host)

### Test 2: Room Joining (2 Browser Windows)
- [ ] Open deployed URL in second browser/incognito
- [ ] Enter different name
- [ ] Either click copied link OR enter room code manually
- [ ] Second player appears in player list
- [ ] Both players show as "Connected"
- [ ] Player count shows "2/4"
- [ ] Start button enabled for host

### Test 3: Game Start (2+ Players)
- [ ] Host clicks "Start Game"
- [ ] Game board appears for all players
- [ ] All players see the same board
- [ ] Each player sees their own tiles in sidebar
- [ ] Each player sees their own secret building
- [ ] Current turn indicator shows (⭐ emoji)
- [ ] All players see same current player
- [ ] Scores show for all players (all start at 15)

### Test 4: Tile Placement
- [ ] Current player can drag tiles
- [ ] Other players CANNOT drag tiles (not their turn)
- [ ] Valid moves show in green on board
- [ ] Hover shows yellow highlight
- [ ] Drop tile on valid spot
- [ ] Tile appears on board for ALL players
- [ ] Worker moves to new position for ALL players
- [ ] Turn indicator changes to next player
- [ ] Scores update if buildings covered

### Test 5: Privacy Controls
**Tile Box Privacy:**
- [ ] By default, you only see YOUR tiles
- [ ] Other players' tiles NOT visible
- [ ] Dropdown shows all players
- [ ] Select another player from dropdown
- [ ] Their tiles now show in sidebar
- [ ] Select yourself again → your tiles show

**Vote Card Privacy:**
- [ ] Your vote cards always visible in header
- [ ] Dropdown to view other players
- [ ] Select another player
- [ ] Their remaining vote cards appear in sidebar
- [ ] Only remaining cards shown (not used ones)

**Secret Buildings:**
- [ ] You see your secret building in sidebar
- [ ] Other players' secrets NOT shown anywhere
- [ ] No way to view others' secrets during game

### Test 6: Hover Transparency
- [ ] Place at least one tile on board
- [ ] Hover cursor over the placed tile
- [ ] Tile becomes semi-transparent (can see through)
- [ ] Move cursor away → tile becomes opaque again
- [ ] Works for all placed tiles
- [ ] Can see buildings underneath clearly

### Test 7: Worker Appearance
- [ ] Workers appear on board (red circles)
- [ ] NO black backgrounds around workers
- [ ] Clean circles with dark red border
- [ ] Workers visible against board

### Test 8: Outhouse Voting
**Trigger Vote:**
- [ ] Place tile that covers an outhouse space
- [ ] Voting panel appears on right side
- [ ] All players listed in voting panel
- [ ] Each player's available vote cards shown

**Cast Votes:**
- [ ] Each player clicks their vote cards to select
- [ ] Selected cards show gold border + yellow background
- [ ] OTHER PLAYERS' SELECTIONS HIDDEN (can't see what they picked)
- [ ] Can see IF they selected (count shown)
- [ ] Click "Cast Votes" when all players selected
- [ ] Vote resolves (Yes ≥ No → pass, otherwise fail)

**After Vote:**
- [ ] Used vote cards removed from all players
- [ ] If passed: tile placed, worker moves
- [ ] If failed: tile not placed, turn passes
- [ ] Voting panel closes
- [ ] Game continues

### Test 9: Wildcard Voting
- [ ] Select Wildcard during vote
- [ ] Modal appears: "Use Wildcard as:"
- [ ] Two buttons: "Yes 2" and "No 2"
- [ ] Click one
- [ ] Wildcard replaced with choice
- [ ] Counts as 2 votes

### Test 10: Reconnection
**Disconnect Test:**
- [ ] Close browser tab during game (not your turn)
- [ ] Player shows as "Disconnected" in lobby for others
- [ ] Game continues without you
- [ ] Reopen URL
- [ ] Automatically rejoins same seat
- [ ] Game state preserved (same tiles, same score)
- [ ] Shows as "Connected" again

**Your Turn Disconnect:**
- [ ] Close browser during your turn
- [ ] Reopen and rejoin
- [ ] Still your turn
- [ ] Can continue playing

### Test 11: 3-4 Player Support
**With 3 Players:**
- [ ] Three players join room
- [ ] Host starts game
- [ ] All three players get tiles
- [ ] Tiles distributed evenly (±1 tile difference max)
- [ ] Turns rotate: P1 → P2 → P3 → P1
- [ ] All game features work

**With 4 Players:**
- [ ] Four players join room
- [ ] Host starts game
- [ ] All four players get tiles
- [ ] Tiles distributed evenly (±1 tile difference max)
- [ ] Turns rotate: P1 → P2 → P3 → P4 → P1
- [ ] All game features work

### Test 12: Game End
**Trigger End:**
- [ ] Play until no valid moves remain
- [ ] Game end modal appears for ALL players
- [ ] Shows "Game Over!" title
- [ ] Shows winner name + "Wins!"
- [ ] Shows final scores for all players
- [ ] Trophy emoji (🏆) next to winner
- [ ] **ALL SECRET BUILDINGS REVEALED** in sidebar
- [ ] Each player's secret building clearly shown
- [ ] "Play Again" button appears

**Play Again:**
- [ ] Click "Play Again"
- [ ] Page refreshes
- [ ] Returns to lobby
- [ ] Can create new room to play again

### Test 13: Edge Cases
**Room Full:**
- [ ] 4 players in room
- [ ] 5th player tries to join
- [ ] Shows "Room is full" error

**Game Already Started:**
- [ ] Start game with 2 players
- [ ] 3rd player tries to join
- [ ] Shows "Game already started" error (unless they were in before)

**Invalid Room Code:**
- [ ] Enter random room code
- [ ] Click join
- [ ] Shows "Room not found" error

**No Players:**
- [ ] Create room alone
- [ ] Try to start with only 1 player
- [ ] Start button disabled
- [ ] Shows "Need 2-4 players"

## 🐛 Bug Checklist

If ANY of these happen, there's a bug:
- [ ] Firebase errors in console
- [ ] Players see different game states
- [ ] Tiles disappear or duplicate
- [ ] Turns don't rotate properly
- [ ] Scores don't update correctly
- [ ] Reconnection doesn't work
- [ ] Voting doesn't resolve correctly
- [ ] Secret buildings visible during game
- [ ] Workers have black backgrounds
- [ ] Hover transparency doesn't work
- [ ] Game doesn't end when it should
- [ ] Secrets not revealed at end

## 📊 Performance Tests

### Load Test
- [ ] Create room
- [ ] Add 4 players
- [ ] Play full game
- [ ] No lag or delays
- [ ] All moves sync within 1 second
- [ ] No console errors
- [ ] No memory leaks (check dev tools)

### Network Test
- [ ] Play on slow connection (throttle in dev tools)
- [ ] Moves still sync correctly
- [ ] UI shows loading appropriately
- [ ] No data loss

### Browser Compatibility
Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (Mac/iOS)
- [ ] Mobile browsers

## ✅ Final Verification

Before sharing with friends:
- [ ] All above tests pass
- [ ] No console errors
- [ ] Game plays smoothly
- [ ] All features work as expected
- [ ] Reconnection is reliable
- [ ] Room links work correctly

## 🎉 Ready to Go!

If everything above checks out, your game is production-ready!
