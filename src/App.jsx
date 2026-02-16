import React, { useState, useRef, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, update, get, onDisconnect } from 'firebase/database';

// Firebase config - REPLACE WITH YOUR OWN CONFIG
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV20Gnxh_Sg8Rr1Ffc5KkVWQWcwhP-owQ",
  authDomain: "wacky-wacky-west-online.firebaseapp.com",
  databaseURL: "https://wacky-wacky-west-online-default-rtdb.firebaseio.com",
  projectId: "wacky-wacky-west-online",
  storageBucket: "wacky-wacky-west-online.firebasestorage.app",
  messagingSenderId: "430338728417",
  appId: "1:430338728417:web:a917ecab2ff14abee5f2a0",
  measurementId: "G-LZW2JSD4W2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const V = [164, 276, 388, 499, 609, 720, 831, 941, 1050, 1159, 1270, 1380, 1489, 1599, 1710, 1822];
const H = [174, 284, 395, 506, 617, 728, 839, 949, 1060, 1171, 1280];

const BUILDINGS = {
  '0,5': {type: 'General_Store', points: 1}, '1,2': {type: 'Stable', points: 2}, '2,1': {type: 'School', points: 2},
  '2,4': {type: 'Saloon', points: 4}, '2,8': {type: 'Bank', points: 2}, '3,3': {type: 'Bank', points: 4},
  '3,6': {type: 'School', points: 3}, '4,2': {type: 'Jail', points: 3}, '4,7': {type: 'General_Store', points: 4},
  '5,4': {type: 'School', points: 5}, '5,8': {type: 'Stable', points: 3}, '6,0': {type: 'Saloon', points: 1},
  '6,5': {type: 'Stable', points: 5}, '6,9': {type: 'Jail', points: 1}, '7,3': {type: 'Jail', points: 5},
  '7,6': {type: 'Bank', points: 5}, '8,0': {type: 'Bank', points: 1}, '8,4': {type: 'General_Store', points: 5},
  '8,9': {type: 'School', points: 1}, '9,1': {type: 'General_Store', points: 3}, '9,5': {type: 'Saloon', points: 5},
  '10,2': {type: 'Stable', points: 4}, '10,7': {type: 'Bank', points: 3}, '11,3': {type: 'Saloon', points: 3},
  '11,6': {type: 'Jail', points: 4}, '12,1': {type: 'Jail', points: 2}, '12,5': {type: 'School', points: 4},
  '12,8': {type: 'Saloon', points: 2}, '13,7': {type: 'General_Store', points: 2}, '14,4': {type: 'Stable', points: 1}
};

const OUTHOUSES = [[1,4], [2,3], [2,6], [3,2], [3,7], [4,8], [5,3], [6,4], [7,5], [8,6], [10,1], [10,4], [11,2], [11,7], [12,3], [12,6], [13,5]];
const BUILDING_TYPES = ['Bank', 'General_Store', 'Jail', 'Saloon', 'School', 'Stable'];

const IMAGES = {
  board: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwMCIgaGVpZ2h0PSIxNDI2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNFREM5QUYiLz48L3N2Zz4=',
  worker: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0iI0RDMTQzQyIgc3Ryb2tlPSIjOEIwMDAwIiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=',
  Road__type_1_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzg4NjY0NCIvPjwvc3ZnPg==',
  Road__type_2_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzk5NzA1MiIvPjwvc3ZnPg==',
  Road__type_3_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0FBN0E1QSIvPjwvc3ZnPg==',
  River__type_1_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzRBOTBFMiIvPjwvc3ZnPg==',
  River__type_2_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzVCQTBGMiIvPjwvc3ZnPg==',
  River__type_3_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzZDQjBGRiIvPjwvc3ZnPg==',
  Railroad_topsy__type_1_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg==',
  Railroad_topsy__type_2_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzQ0NDQ0NCIvPjwvc3ZnPg==',
  Railroad_topsy__type_3_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzU1NTU1NSIvPjwvc3ZnPg==',
  Railroad_turvy__type_1_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzIyMjIyMiIvPjwvc3ZnPg==',
  Railroad_turvy__type_2_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg==',
  Railroad_turvy__type_3_: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzQ0NDQ0NCIvPjwvc3ZnPg==',
  Bank: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0ZGRDcwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCI+JDwvdGV4dD48L3N2Zz4=',
  General_Store: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0ZGQTUwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+RzwvdGV4dD48L3N2Zz4=',
  Jail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzgwODA4MCIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+SjwvdGV4dD48L3N2Zz4=',
  Saloon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0NDMzMzMyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+UzwvdGV4dD48L3N2Zz4=',
  School: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzOTlGRiIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+UzwvdGV4dD48L3N2Zz4=',
  Stable: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzhCNDUxMyIvPjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGRiI+SDwvdGV4dD48L3N2Zz4=',
  Yes_1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzkwRUU5MCIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDA2NDAwIj5ZPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI5NSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDY0MDAiPjE8L3RleHQ+PC9zdmc+',
  Yes_2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzkwRUU5MCIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDA2NDAwIj5ZPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI5NSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDY0MDAiPjI8L3RleHQ+PC9zdmc+',
  Yes_3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iIzkwRUU5MCIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDA2NDAwIj5ZPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI5NSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDY0MDAiPjM8L3RleHQ+PC9zdmc+',
  No_1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGQjZDMSIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOEIwMDAwIj5OPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI5NSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4QjAwMDAiPjE8L3RleHQ+PC9zdmc+',
  No_2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGQjZDMSIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOEIwMDAwIj5OPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI5NSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4QjAwMDAiPjI8L3RleHQ+PC9zdmc+',
  No_3: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0ZGQjZDMSIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOEIwMDAwIj5OPC90ZXh0Pjx0ZXh0IHg9IjUwIiB5PSI5NSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM4QjAwMDAiPjM8L3RleHQ+PC9zdmc+',
  Indifferent: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0RERERERCIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNzUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij5MQVRFUJWVT8L3RleHQ+PC9zdmc+',
  Wildcard: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM5MEVFOTAiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkI2QzEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE0MCIgZmlsbD0idXJsKCNnKSIgcng9IjUiLz48dGV4dCB4PSI1MCIgeT0iNzUiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkZGIj4/PC90ZXh0Pjwvc3ZnPg=='
};

export default function App() {
  const [roomId, setRoomId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [inLobby, setInLobby] = useState(true);
  const [gameState, setGameState] = useState(null);
  const [myPlayerIndex, setMyPlayerIndex] = useState(null);
  
  // Local UI state (not synced)
  const [dragging, setDragging] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [previewMove, setPreviewMove] = useState(null);
  const [dragPos, setDragPos] = useState({x: 0, y: 0});
  const [wildcardChoice, setWildcardChoice] = useState(null);
  const [viewingPlayer, setViewingPlayer] = useState(null);
  const [hoveredTileIndex, setHoveredTileIndex] = useState(null);
  
  const boardRef = useRef(null);
  const roomRef = useRef(null);

  // Generate or retrieve player ID
  useEffect(() => {
    let pid = localStorage.getItem('wackyWestPlayerId');
    if (!pid) {
      pid = `player_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('wackyWestPlayerId', pid);
    }
    setPlayerId(pid);

    // Check URL for room ID
    const params = new URLSearchParams(window.location.search);
    const urlRoomId = params.get('room');
    if (urlRoomId) {
      setRoomId(urlRoomId);
    }
  }, []);

  // Listen to game state changes
  useEffect(() => {
    if (!roomId) return;
    
    // Validate room ID - must be alphanumeric only
    const cleanRoomId = roomId.trim().replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (!cleanRoomId || cleanRoomId.length < 4) {
      console.error('Invalid room ID:', roomId);
      return;
    }
    
    roomRef.current = ref(database, `rooms/${cleanRoomId}`);
    const unsubscribe = onValue(roomRef.current, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameState(data);
        
        // Find my player index
        if (data.players) {
          const myIndex = data.players.findIndex(p => p.id === playerId);
          if (myIndex !== -1) {
            setMyPlayerIndex(myIndex);
            setInLobby(false);
          }
        }
      }
    });

    return () => unsubscribe();
  }, [roomId, playerId]);

  // Setup disconnect handler
  useEffect(() => {
    if (!roomId || myPlayerIndex === null || !gameState) return;
    
    const playerRef = ref(database, `rooms/${roomId}/players/${myPlayerIndex}`);
    const connectedRef = onDisconnect(playerRef);
    connectedRef.update({ connected: false });

    // Mark as connected
    update(playerRef, { connected: true });

    return () => {
      connectedRef.cancel();
    };
  }, [roomId, myPlayerIndex, gameState]);

  const createOrJoinRoom = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    let rid = roomId;
    
    // Parse room ID from URL if full URL was pasted
    if (rid && (rid.includes('http://') || rid.includes('https://') || rid.includes('?room='))) {
      try {
        const url = new URL(rid.includes('http') ? rid : `https://${rid}`);
        const params = new URLSearchParams(url.search);
        rid = params.get('room') || rid;
      } catch (e) {
        // If parsing fails, try to extract room code manually
        const match = rid.match(/[?&]room=([A-Z0-9]{6})/i);
        if (match) {
          rid = match[1];
        }
      }
      rid = rid.trim().toUpperCase();
      setRoomId(rid);
    }
    
    if (!rid) {
      // Create new room
      rid = Math.random().toString(36).substr(2, 6).toUpperCase();
      setRoomId(rid);
      window.history.pushState({}, '', `?room=${rid}`);
      
      // Initialize room
      await set(ref(database, `rooms/${rid}`), {
        host: playerId,
        players: [{
          id: playerId,
          name: playerName,
          connected: true,
          seat: 0
        }],
        started: false,
        created: Date.now()
      });
    } else {
      // Join existing room
      const roomSnapshot = await get(ref(database, `rooms/${rid}`));
      const room = roomSnapshot.val();
      
      if (!room) {
        alert('Room not found!');
        return;
      }

      if (room.started && !room.players.some(p => p.id === playerId)) {
        alert('Game already started!');
        return;
      }

      // Check if player was in room before (reconnection)
      const existingPlayerIndex = room.players.findIndex(p => p.id === playerId);
      
      if (existingPlayerIndex !== -1) {
        // Reconnect
        await update(ref(database, `rooms/${rid}/players/${existingPlayerIndex}`), {
          connected: true,
          name: playerName
        });
      } else {
        // New player joining
        if (room.players.length >= 4) {
          alert('Room is full (max 4 players)');
          return;
        }

        await update(ref(database, `rooms/${rid}/players`), {
          [room.players.length]: {
            id: playerId,
            name: playerName,
            connected: true,
            seat: room.players.length
          }
        });
      }
    }
  };

  const startGame = async () => {
    if (!gameState || gameState.host !== playerId) return;
    
    const numPlayers = gameState.players.length;
    if (numPlayers < 2 || numPlayers > 4) {
      alert('Need 2-4 players to start');
      return;
    }

    // Initialize game state
    const players = gameState.players.map(p => p.name);
    const board = Array(10).fill(0).map(() => Array(15).fill(0).map(() => ({covered: false})));
    const workers = {road: {c: 0, r: 0}, river: {c: 14, r: 9}, topsy: {c: 14, r: 0}, turvy: {c: 0, r: 9}};
    
    // Generate tiles
    const all = [];
    let id = 0;
    ['Road', 'River', 'Railroad_topsy', 'Railroad_turvy'].forEach(base => {
      [1, 2, 3].forEach(size => {
        [1, 2, 3].forEach(() => {
          all.push({type: `${base}__type_${size}_`, size, id: id++});
        });
      });
    });

    // Shuffle and assign secret buildings
    const shuffledBuildings = [...BUILDING_TYPES].sort(() => Math.random() - 0.5);
    const secretBuildings = {};
    players.forEach((p, i) => {
      secretBuildings[p] = shuffledBuildings[i % BUILDING_TYPES.length];
    });

    // Distribute tiles evenly across players
    const dealtTiles = {};
    players.forEach(p => dealtTiles[p] = []);
    
    const groupedByFamily = {};
    all.forEach(tile => {
      const family = tile.type.replace('__type_2_', '').replace('__type_1_', '').replace('__type_3_', '');
      if (!groupedByFamily[family]) groupedByFamily[family] = [];
      groupedByFamily[family].push(tile);
    });

    let playerIndex = 0;
    Object.values(groupedByFamily).forEach(group => {
      const shuffled = [...group].sort(() => Math.random() - 0.5);
      shuffled.forEach(tile => {
        dealtTiles[players[playerIndex]].push(tile);
        playerIndex = (playerIndex + 1) % numPlayers;
      });
    });

    // Shuffle and deal voting cards
    const allVotingCards = [
      'Yes_1', 'Yes_1', 'Yes_2', 'Yes_2', 'Yes_3', 'Yes_3',
      'No_1', 'No_1', 'No_2', 'No_2', 'No_3', 'No_3',
      'Indifferent', 'Indifferent', 'Indifferent', 'Indifferent',
      'Wildcard', 'Wildcard'
    ];
    const shuffledCards = [...allVotingCards].sort(() => Math.random() - 0.5);
    const votingCards = {};
    const cardsPerPlayer = Math.floor(shuffledCards.length / numPlayers);
    players.forEach((p, i) => {
      votingCards[p] = shuffledCards.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer);
    });

    const scores = {};
    players.forEach(p => scores[p] = 15);

    await update(ref(database, `rooms/${roomId}`), {
      started: true,
      board,
      workers,
      tiles: dealtTiles,
      secretBuildings,
      votingCards,
      scores,
      currentPlayer: 0,
      placedTiles: [],
      gameEnded: false,
      winner: null,
      pendingVote: null,
      voteSelections: {}
    });
  };

  const calcMovesForState = (tile, boardState, workersState, placedTilesState) => {
    const type = tile.type.startsWith('Road') ? 'road' : tile.type.startsWith('River') ? 'river' : 'railroad';
    const tracks = type === 'railroad' ? ['topsy','turvy'] : [type];
    const moves = [];
    tracks.forEach(track => {
      const w = workersState[track];
      [{dx:1,dy:0,r:0},{dx:0,dy:1,r:90},{dx:-1,dy:0,r:180},{dx:0,dy:-1,r:270}].forEach(d => {
        const cells = Array(tile.size).fill(0).map((_,i) => [w.c+d.dx*(i+1), w.r+d.dy*(i+1)]);
        const ok = cells.every(([c,r],i) => {
          if(c<0||c>14||r<0||r>9) return false;
          if((c===0&&r===0)||(c===14&&r===0)||(c===0&&r===9)||(c===14&&r===9)) return false;
          if(boardState[r][c].covered) return false;
          if(i===0) {
            const dc=Math.abs(c-w.c), dr=Math.abs(r-w.r);
            if(dc===1&&dr===0||dc===0&&dr===1) return true;
            return false;
          }
          return true;
        });
        if(ok) moves.push({cells,track,rot:d.r});
        
        const isBridgeCenter = (c0, r0) => placedTilesState.some(t => t.size===3 && t.cells[1] && t.cells[1][0]===c0 && t.cells[1][1]===r0);
        for(let span=1; span<=14; span++) {
          const crossed = Array(span).fill(0).map((_,i) => [w.c+d.dx*(i+1), w.r+d.dy*(i+1)]);
          const crossedAreValidBridgeCenters = crossed.every(([c,r]) => {
            if(c<0||c>14||r<0||r>9) return false;
            if(!boardState[r][c].covered) return false;
            return isBridgeCenter(c, r);
          });
          if(!crossedAreValidBridgeCenters) break;

          const landingCells = Array(tile.size).fill(0).map((_,i) => [w.c+d.dx*(span+i+1), w.r+d.dy*(span+i+1)]);
          const canLand = landingCells.every(([c,r]) => {
            if(c<0||c>14||r<0||r>9) return false;
            if((c===0&&r===0)||(c===14&&r===0)||(c===0&&r===9)||(c===14&&r===9)) return false;
            if(boardState[r][c].covered) return false;
            return true;
          });
          if(canLand) moves.push({cells:landingCells,track,rot:d.r});
        }
      });
    });
    return moves;
  };

  const calculateScores = (boardState, secretBuildingsState, playersArray) => {
    const newScores = {};
    playersArray.forEach(player => {
      const building = secretBuildingsState[player];
      if(!building) return;
      let lostPoints = 0;
      Object.entries(BUILDINGS).forEach(([key, bldg]) => {
        if(bldg.type === building) {
          const [c, r] = key.split(',').map(Number);
          if(boardState[r][c].covered) lostPoints += bldg.points;
        }
      });
      newScores[player] = 15 - lostPoints;
    });
    return newScores;
  };

  const checkOuthouses = (cells) => cells.some(([c, r]) => OUTHOUSES.some(([oc, or]) => oc === c && or === r));

  const getTileImageLayout = (x, y, w, h, rotation) => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const isHorizontal = normalizedRotation === 90 || normalizedRotation === 270;
    if(!isHorizontal) return {x, y, width: w, height: h};
    return {x: x + (w - h) / 2, y: y + (h - w) / 2, width: h, height: w};
  };

  const onDragStart = (e, tile) => {
    if (myPlayerIndex !== gameState.currentPlayer) return;
    e.dataTransfer.effectAllowed = 'move';
    setDragging(tile);
    const moves = calcMovesForState(tile, gameState.board, gameState.workers, gameState.placedTiles);
    setValidMoves(moves);
    setDragPos({x: e.clientX, y: e.clientY});
  };

  const onDrag = (e) => {
    if(e.clientX !== 0 && e.clientY !== 0) {
      setDragPos({x: e.clientX, y: e.clientY});
    }
  };

  const onDragEnd = () => {
    setDragging(null);
    setValidMoves([]);
    setPreviewMove(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!dragging || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 2000;
    const svgY = ((e.clientY - rect.top) / rect.height) * 1426;
    let hoverCell = null;
    for(let c=0; c<15; c++) {
      for(let r=0; r<10; r++) {
        if(svgX >= V[c] && svgX < V[c+1] && svgY >= H[r] && svgY < H[r+1]) {
          hoverCell = {c, r};
          break;
        }
      }
      if(hoverCell) break;
    }
    if(!hoverCell) {
      setPreviewMove(null);
      return;
    }
    const move = validMoves.find(m => m.cells.some(([c,r]) => c===hoverCell.c && r===hoverCell.r));
    setPreviewMove(move || null);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!dragging || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 2000;
    const svgY = ((e.clientY - rect.top) / rect.height) * 1426;
    let dropCell = null;
    for(let c=0; c<15; c++) {
      for(let r=0; r<10; r++) {
        if(svgX >= V[c] && svgX < V[c+1] && svgY >= H[r] && svgY < H[r+1]) {
          dropCell = {c, r};
          break;
        }
      }
      if(dropCell) break;
    }
    if(!dropCell) return;
    const moveToPlace = validMoves.find(m => m.cells.some(([c,r]) => c===dropCell.c && r===dropCell.r));
    if(!moveToPlace) return;
    
    if(checkOuthouses(moveToPlace.cells)) {
      await update(ref(database, `rooms/${roomId}`), {
        pendingVote: {move: moveToPlace, tile: dragging}
      });
      setDragging(null);
      setValidMoves([]);
      setPreviewMove(null);
      return;
    }
    
    await placeTile(moveToPlace, dragging);
  };

  const placeTile = async (move, tile) => {
    const players = gameState.players.map(p => p.name);
    const nb = gameState.board.map(r => r.map(c => ({...c})));
    move.cells.forEach(([c,r]) => { nb[r][c].covered = true; });
    const newPlacedTiles = [...gameState.placedTiles, {type: tile.type, cells: move.cells, rotation: move.rot, size: tile.size}];
    const [lc,lr] = move.cells[move.cells.length-1];
    const nw = {...gameState.workers};
    nw[move.track] = {c:lc, r:lr};
    const pn = players[gameState.currentPlayer];
    const nt = {...gameState.tiles};
    nt[pn] = nt[pn].filter(t => t.id !== tile.id);

    const newScores = calculateScores(nb, gameState.secretBuildings, players);
    const noMoves = players.every(p => {
      const pTiles = nt[p] || [];
      return pTiles.length === 0 || pTiles.every(t => calcMovesForState(t, nb, nw, newPlacedTiles).length === 0);
    });

    const updates = {
      board: nb,
      placedTiles: newPlacedTiles,
      workers: nw,
      tiles: nt,
      scores: newScores
    };

    if(noMoves) {
      const winnerName = Object.keys(newScores).reduce((a, b) => newScores[a] > newScores[b] ? a : b);
      updates.gameEnded = true;
      updates.winner = winnerName;
    } else {
      updates.currentPlayer = (gameState.currentPlayer + 1) % players.length;
    }

    await update(ref(database, `rooms/${roomId}`), updates);
    setDragging(null);
    setValidMoves([]);
    setPreviewMove(null);
  };

  const toggleVoteCard = async (playerName, card) => {
    if(card === 'Wildcard') {
      setWildcardChoice({player: playerName, callback: async (choice) => {
        const current = gameState.voteSelections[playerName] || [];
        await update(ref(database, `rooms/${roomId}/voteSelections`), {
          [playerName]: [...current, `Wildcard_${choice}`]
        });
        setWildcardChoice(null);
      }});
      return;
    }
    
    const current = gameState.voteSelections[playerName] || [];
    if(current.includes(card)) {
      await update(ref(database, `rooms/${roomId}/voteSelections`), {
        [playerName]: current.filter(c => c !== card)
      });
    } else {
      await update(ref(database, `rooms/${roomId}/voteSelections`), {
        [playerName]: [...current, card]
      });
    }
  };

  const handleVote = async () => {
    const players = gameState.players.map(p => p.name);
    let yesVotes = 0, noVotes = 0;
    const usedCards = [];
    
    Object.entries(gameState.voteSelections).forEach(([player, cards]) => {
      cards.forEach(card => {
        if(card.startsWith('Yes')) yesVotes += parseInt(card.split('_')[1]);
        else if(card.startsWith('No')) noVotes += parseInt(card.split('_')[1]);
        else if(card === 'Wildcard_Yes') yesVotes += 2;
        else if(card === 'Wildcard_No') noVotes += 2;
        if(card !== 'Indifferent') usedCards.push({player, card: card.startsWith('Wildcard') ? 'Wildcard' : card});
      });
    });
    
    const votePass = yesVotes >= noVotes;
    const newCards = {...gameState.votingCards};
    usedCards.forEach(uc => {
      newCards[uc.player] = newCards[uc.player].filter(c => c !== uc.card);
    });

    if(votePass) {
      await placeTile(gameState.pendingVote.move, gameState.pendingVote.tile);
      await update(ref(database, `rooms/${roomId}`), {
        votingCards: newCards,
        pendingVote: null,
        voteSelections: {}
      });
    } else {
      await update(ref(database, `rooms/${roomId}`), {
        votingCards: newCards,
        currentPlayer: (gameState.currentPlayer + 1) % players.length,
        pendingVote: null,
        voteSelections: {}
      });
    }
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}${window.location.pathname}?room=${roomId}`;
    navigator.clipboard.writeText(link);
    alert('Room link copied! Share it with friends to play together.');
  };

  // Lobby view - show until game actually starts
  if (inLobby || !gameState || !gameState.started) {
    // Check if we're actually in the room (player exists in gameState)
    const isInRoom = gameState && gameState.players && gameState.players.some(p => p.id === playerId);
    
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#D2691E',padding:'20px'}}>
        <div style={{background:'white',padding:'40px',borderRadius:'15px',maxWidth:'500px',width:'100%'}}>
          <h1 style={{margin:'0 0 20px 0',textAlign:'center'}}>Wacky Wacky West</h1>
          
          {!isInRoom ? (
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{width:'100%',padding:'12px',fontSize:'16px',marginBottom:'15px',borderRadius:'8px',border:'1px solid #ccc'}}
              />
              <button
                onClick={createOrJoinRoom}
                style={{width:'100%',padding:'15px',fontSize:'18px',background:'#FFD700',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold',marginBottom:'10px'}}
              >
                Create New Room
              </button>
              <div style={{textAlign:'center',margin:'15px 0',color:'#666'}}>- OR -</div>
              <input
                type="text"
                placeholder="Room code or paste full link"
                value={roomId}
                onChange={(e) => {
                  let value = e.target.value;
                  // If user pastes a URL, extract the room code
                  if (value.includes('?room=')) {
                    const match = value.match(/[?&]room=([A-Z0-9]+)/i);
                    if (match) {
                      value = match[1];
                    }
                  }
                  // Clean and uppercase
                  value = value.trim().replace(/[^A-Z0-9]/gi, '').toUpperCase();
                  setRoomId(value);
                }}
                style={{width:'100%',padding:'12px',fontSize:'16px',marginBottom:'15px',borderRadius:'8px',border:'1px solid #ccc'}}
              />
              <input
                type="text"
                placeholder="Your Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                style={{width:'100%',padding:'12px',fontSize:'16px',marginBottom:'15px',borderRadius:'8px',border:'1px solid #ccc'}}
              />
              <button
                onClick={createOrJoinRoom}
                disabled={!roomId}
                style={{width:'100%',padding:'15px',fontSize:'18px',background:roomId ? '#4CAF50' : '#ccc',border:'none',borderRadius:'8px',cursor:roomId ? 'pointer' : 'not-allowed',fontWeight:'bold'}}
              >
                Join Room
              </button>
            </div>
          ) : (
            <div>
              <div style={{background:'#f5f5f5',padding:'15px',borderRadius:'8px',marginBottom:'20px'}}>
                <div style={{fontSize:'14px',color:'#666',marginBottom:'5px'}}>Room Code:</div>
                <div style={{fontSize:'32px',fontWeight:'bold',textAlign:'center',letterSpacing:'4px'}}>{roomId}</div>
                <button
                  onClick={copyRoomLink}
                  style={{width:'100%',padding:'10px',fontSize:'14px',background:'#4CAF50',color:'white',border:'none',borderRadius:'8px',cursor:'pointer',marginTop:'10px'}}
                >
                  📋 Copy Room Link
                </button>
              </div>
              
              <div style={{marginBottom:'20px'}}>
                <h3 style={{margin:'0 0 10px 0'}}>Players ({gameState?.players?.length || 0}/4):</h3>
                {gameState?.players?.map((p, i) => (
                  <div key={i} style={{padding:'10px',background:p.connected ? '#e8f5e9' : '#ffebee',borderRadius:'5px',marginBottom:'5px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span>{p.name} {p.id === gameState.host && '👑'}</span>
                    <span style={{fontSize:'12px',color:p.connected ? '#4CAF50' : '#f44336'}}>
                      {p.connected ? '● Connected' : '○ Disconnected'}
                    </span>
                  </div>
                ))}
              </div>

              {gameState?.host === playerId && !gameState?.started && (
                <button
                  onClick={startGame}
                  disabled={!gameState?.players || gameState.players.length < 2}
                  style={{width:'100%',padding:'15px',fontSize:'18px',background:gameState?.players?.length >= 2 ? '#FFD700' : '#ccc',border:'none',borderRadius:'8px',cursor:gameState?.players?.length >= 2 ? 'pointer' : 'not-allowed',fontWeight:'bold'}}
                >
                  Start Game (2-4 players)
                </button>
              )}
              
              {gameState?.host !== playerId && !gameState?.started && (
                <div style={{textAlign:'center',color:'#666',padding:'15px'}}>
                  Waiting for host to start the game...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Game has started - render the game board
  // Add defensive checks to prevent crashes during Firebase updates
  if (!gameState.players || !gameState.board || !gameState.workers || 
      !gameState.tiles || !gameState.secretBuildings || !gameState.votingCards ||
      !gameState.scores || myPlayerIndex === null) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#F5DEB3'}}>
        <div style={{background:'white',padding:'40px',borderRadius:'15px',textAlign:'center'}}>
          <h2>Loading game...</h2>
          <p style={{color:'#666',marginTop:'10px'}}>Please wait a moment</p>
        </div>
      </div>
    );
  }

  const players = gameState.players.map(p => p.name);
  const currentPlayerName = players[gameState.currentPlayer];
  const myName = gameState.players[myPlayerIndex].name;
  const myTiles = gameState.tiles[myName] || [];
  const mySecret = gameState.secretBuildings[myName];
  const displayPlayer = viewingPlayer || myName;

  return (
    <div style={{padding:'15px',background:'#F5DEB3',minHeight:'100vh'}}>
      {/* Header */}
      <div style={{marginBottom:'15px',background:'white',padding:'12px 20px',borderRadius:'10px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
          <div>
            <h2 style={{margin:0}}>Wacky West - Room {roomId}</h2>
            <div style={{display:'flex',gap:'15px',marginTop:'8px',fontSize:'14px',flexWrap:'wrap'}}>
              {players.map((p, i) => (
                <span key={i} style={{
                  fontWeight: i === gameState.currentPlayer ? 'bold' : 'normal',
                  color: i === gameState.currentPlayer ? '#FFD700' : 'inherit',
                  background: i === gameState.currentPlayer ? '#FFF9E6' : 'transparent',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  {p}: {gameState.scores[p] ?? 15} pts {i === gameState.currentPlayer && '⭐'}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <div style={{fontSize:'12px',color:'#666',marginBottom:'5px'}}>
              {currentPlayerName === myName ? "Your Turn!" : `${currentPlayerName}'s Turn`}
            </div>
            <div style={{display:'flex',gap:'5px',flexWrap:'wrap',maxWidth:'300px'}}>
              {gameState.votingCards[myName]?.map(card => (
                <div key={card} style={{width:'40px',height:'55px',border:'1px solid #ccc',borderRadius:'3px',overflow:'hidden'}}>
                  <img src={IMAGES[card]} style={{width:'100%',height:'100%',objectFit:'cover'}} alt={card}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{display:'flex',gap:'15px',flexWrap:'wrap'}}>
        {/* Board */}
        <div style={{flex:'0 0 70%',minWidth:'600px'}}>
          <div ref={boardRef} onDragOver={onDragOver} onDrop={onDrop} style={{background:'white',padding:'8px',borderRadius:'10px',position:'relative'}}>
            <img src={IMAGES.board} style={{width:'100%',display:'block',border:'3px solid #8B4513',borderRadius:'5px'}} alt=""/>
            <svg style={{position:'absolute',top:'8px',left:'8px',width:'calc(100% - 16px)',height:'calc(100% - 16px)',pointerEvents:'none'}} viewBox="0 0 2000 1426">
              {dragging && validMoves.map((m,i) => m.cells.map(([c,r],j) => {
                const hover = previewMove?.cells.some(([hc,hr]) => hc===c && hr===r);
                return <rect key={`${i}-${j}`} x={V[c]} y={H[r]} width={V[c+1]-V[c]} height={H[r+1]-H[r]} fill={hover?"yellow":"lime"} opacity={hover?0.7:0.5} stroke={hover?"orange":"yellow"} strokeWidth="5"/>;
              }))}
              {gameState.pendingVote && (() => {
                const minC = Math.min(...gameState.pendingVote.move.cells.map(([c]) => c));
                const maxC = Math.max(...gameState.pendingVote.move.cells.map(([c]) => c));
                const minR = Math.min(...gameState.pendingVote.move.cells.map(([_, r]) => r));
                const maxR = Math.max(...gameState.pendingVote.move.cells.map(([_, r]) => r));
                return <rect x={V[minC]} y={H[minR]} width={V[maxC+1]-V[minC]} height={H[maxR+1]-H[minR]} fill="orange" opacity="0.5" stroke="red" strokeWidth="8"/>;
              })()}
              {previewMove && dragging && (() => {
                const minC = Math.min(...previewMove.cells.map(([c]) => c));
                const maxC = Math.max(...previewMove.cells.map(([c]) => c));
                const minR = Math.min(...previewMove.cells.map(([_, r]) => r));
                const maxR = Math.max(...previewMove.cells.map(([_, r]) => r));
                const x = V[minC], y = H[minR], w = V[maxC + 1] - V[minC], h = H[maxR + 1] - H[minR];
                const centerX = x + w / 2, centerY = y + h / 2;
                const adjustedRot = previewMove.rot + 90;
                const imageLayout = getTileImageLayout(x, y, w, h, adjustedRot);
                return <image x={imageLayout.x} y={imageLayout.y} width={imageLayout.width} height={imageLayout.height} href={IMAGES[dragging.type]} preserveAspectRatio="xMidYMid meet" opacity="0.7" transform={`rotate(${adjustedRot} ${centerX} ${centerY})`}/>;
              })()}
              {gameState.placedTiles.map((tile, idx) => {
                const minC = Math.min(...tile.cells.map(([c]) => c));
                const maxC = Math.max(...tile.cells.map(([c]) => c));
                const minR = Math.min(...tile.cells.map(([_, r]) => r));
                const maxR = Math.max(...tile.cells.map(([_, r]) => r));
                const x = V[minC], y = H[minR], w = V[maxC + 1] - V[minC], h = H[maxR + 1] - H[minR];
                const centerX = x + w / 2, centerY = y + h / 2;
                const adjustedRot = tile.rotation + 90;
                const imageLayout = getTileImageLayout(x, y, w, h, adjustedRot);
                return (
                  <image 
                    key={`tile-${idx}`} 
                    x={imageLayout.x} 
                    y={imageLayout.y} 
                    width={imageLayout.width} 
                    height={imageLayout.height} 
                    href={IMAGES[tile.type]} 
                    preserveAspectRatio="xMidYMid meet" 
                    transform={`rotate(${adjustedRot} ${centerX} ${centerY})`}
                    opacity={hoveredTileIndex === idx ? 0.4 : 1}
                    style={{cursor: 'pointer', pointerEvents: 'all'}}
                    onMouseEnter={() => setHoveredTileIndex(idx)}
                    onMouseLeave={() => setHoveredTileIndex(null)}
                  />
                );
              })}
              {Object.entries(gameState.workers).map(([n,w]) => <image key={n} x={V[w.c]+20} y={H[w.r]+20} width={V[w.c+1]-V[w.c]-40} height={H[w.r+1]-H[w.r]-40} href={IMAGES.worker} preserveAspectRatio="xMidYMid meet"/>)}
            </svg>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{flex:'1',minWidth:'280px',display:'flex',flexDirection:'column',gap:'10px',maxHeight:'85vh'}}>
          {/* Secret Building */}
          {!gameState.gameEnded && (
            <div style={{background:'white',padding:'10px',borderRadius:'10px'}}>
              <h4 style={{margin:'0 0 8px 0',fontSize:'13px'}}>Your Secret: {mySecret?.replace(/_/g,' ')}</h4>
              <img src={IMAGES[mySecret]} style={{width:'100%',maxHeight:'100px',objectFit:'contain'}} alt=""/>
            </div>
          )}

          {/* Game Over - Show all secrets */}
          {gameState.gameEnded && (
            <div style={{background:'white',padding:'10px',borderRadius:'10px',maxHeight:'200px',overflowY:'auto'}}>
              <h4 style={{margin:'0 0 8px 0',fontSize:'13px'}}>Secret Buildings:</h4>
              {players.map(p => (
                <div key={p} style={{marginBottom:'10px',paddingBottom:'10px',borderBottom:'1px solid #eee'}}>
                  <div style={{fontSize:'12px',fontWeight:'bold',marginBottom:'4px'}}>{p}</div>
                  <div style={{fontSize:'11px',marginBottom:'4px'}}>{gameState.secretBuildings[p]?.replace(/_/g,' ')}</div>
                  <img src={IMAGES[gameState.secretBuildings[p]]} style={{width:'100%',maxHeight:'60px',objectFit:'contain'}} alt=""/>
                </div>
              ))}
            </div>
          )}

          {/* Player Selector */}
          <div style={{background:'white',padding:'10px',borderRadius:'10px'}}>
            <h4 style={{margin:'0 0 8px 0',fontSize:'13px'}}>View Player:</h4>
            <select 
              value={displayPlayer} 
              onChange={(e) => setViewingPlayer(e.target.value === myName ? null : e.target.value)}
              style={{width:'100%',padding:'8px',borderRadius:'5px',border:'1px solid #ccc'}}
            >
              {players.map(p => (
                <option key={p} value={p}>{p} {p === myName && '(You)'}</option>
              ))}
            </select>
          </div>

          {/* Tiles */}
          <div style={{background:'white',padding:'10px',borderRadius:'10px',flex:1,display:'flex',flexDirection:'column',minHeight:0,overflow:'hidden'}}>
            <h4 style={{margin:'0 0 8px 0',fontSize:'13px'}}>
              {displayPlayer === myName ? 'Your' : `${displayPlayer}'s`} Tiles ({(gameState.tiles[displayPlayer] || []).length})
            </h4>
            <div style={{overflowY:'auto',flex:1,paddingRight:'5px'}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'8px',alignContent:'start'}}>
                {(gameState.tiles[displayPlayer] || []).map(t => (
                  <div 
                    key={t.id} 
                    draggable={displayPlayer === myName && myPlayerIndex === gameState.currentPlayer} 
                    onDragStart={(e)=>onDragStart(e,t)} 
                    onDrag={onDrag} 
                    onDragEnd={onDragEnd}
                    style={{
                      height:'80px',
                      border:'1px solid #ccc',
                      borderRadius:'4px',
                      cursor: displayPlayer === myName && myPlayerIndex === gameState.currentPlayer ? 'grab' : 'default',
                      padding:'4px',
                      background:'white',
                      opacity: dragging?.id === t.id ? 0 : 1,
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center'
                    }}
                  >
                    <img src={IMAGES[t.type]} style={{maxWidth:'100%',maxHeight:'100%',width:'auto',height:'auto',objectFit:'contain',display:'block',pointerEvents:'none'}} alt="" draggable={false}/>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Voting Cards */}
          {viewingPlayer && (
            <div style={{background:'white',padding:'10px',borderRadius:'10px',maxHeight:'150px',overflowY:'auto'}}>
              <h4 style={{margin:'0 0 8px 0',fontSize:'13px'}}>{displayPlayer}'s Vote Cards:</h4>
              <div style={{display:'flex',gap:'5px',flexWrap:'wrap'}}>
                {(gameState.votingCards[displayPlayer] || []).map(card => (
                  <div key={card} style={{width:'40px',height:'55px',border:'1px solid #ccc',borderRadius:'3px',overflow:'hidden'}}>
                    <img src={IMAGES[card]} style={{width:'100%',height:'100%',objectFit:'cover'}} alt={card}/>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dragging preview */}
      {dragging && (
        <div style={{position:'fixed',left:dragPos.x,top:dragPos.y,transform:'translate(-50%, -50%)',pointerEvents:'none',zIndex:10000}}>
          <img src={IMAGES[dragging.type]} style={{width:'auto',maxWidth:'120px',height:'auto',maxHeight:'120px',objectFit:'contain',opacity:0.9,background:'white',border:'2px solid #333',borderRadius:'4px',padding:'3px'}} alt="" draggable={false}/>
        </div>
      )}

      {/* Wildcard choice */}
      {wildcardChoice && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000}}>
          <div style={{background:'white',padding:'30px',borderRadius:'15px',textAlign:'center'}}>
            <h3>Use Wildcard as:</h3>
            <div style={{display:'flex',gap:'20px',marginTop:'20px'}}>
              <button onClick={() => wildcardChoice.callback('Yes')} style={{padding:'15px 30px',fontSize:'18px',background:'#90EE90',border:'none',borderRadius:'8px',cursor:'pointer'}}>Yes 2</button>
              <button onClick={() => wildcardChoice.callback('No')} style={{padding:'15px 30px',fontSize:'18px',background:'#FFB6C1',border:'none',borderRadius:'8px',cursor:'pointer'}}>No 2</button>
            </div>
          </div>
        </div>
      )}

      {/* Voting panel */}
      {gameState.pendingVote && !wildcardChoice && (
        <div style={{position:'fixed',right:'20px',top:'120px',background:'white',padding:'20px',borderRadius:'15px',boxShadow:'0 4px 20px rgba(0,0,0,0.3)',zIndex:1000,maxHeight:'70vh',overflowY:'auto',width:'320px'}}>
          <h3 style={{margin:'0 0 15px 0'}}>Outhouse - Vote!</h3>
          {players.map(player => (
            <div key={player} style={{marginBottom:'15px'}}>
              <h4 style={{margin:'5px 0'}}>{player}</h4>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'6px'}}>
                {(gameState.votingCards?.[player] || []).map(card => {
                  const selected = (gameState.voteSelections[player] || []).some(c => c === card || c.startsWith(card));
                  return (
                    <div 
                      key={card} 
                      onClick={() => toggleVoteCard(player, card)} 
                      style={{
                        border: selected ? '3px solid #FFD700' : '2px solid #ccc',
                        padding:'3px',
                        cursor:'pointer',
                        borderRadius:'4px',
                        background: selected ? '#FFFACD' : 'white'
                      }}
                    >
                      <img src={IMAGES[card]} style={{width:'100%',display:'block'}} alt={card}/>
                    </div>
                  );
                })}
              </div>
              {gameState.voteSelections[player] && gameState.voteSelections[player].length > 0 && (
                <div style={{marginTop:'5px',fontSize:'11px',color:'#666'}}>
                  Selected: {gameState.voteSelections[player].join(', ')}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={handleVote} 
            disabled={!players.every(p => gameState.voteSelections[p]?.length > 0)} 
            style={{
              padding:'12px 30px',
              fontSize:'18px',
              background: players.every(p => gameState.voteSelections[p]?.length > 0) ? '#FFD700' : '#ccc',
              border:'none',
              borderRadius:'10px',
              cursor: players.every(p => gameState.voteSelections[p]?.length > 0) ? 'pointer' : 'not-allowed',
              fontWeight:'bold',
              width:'100%',
              marginTop:'15px'
            }}
          >
            Cast Votes
          </button>
        </div>
      )}

      {/* Game over */}
      {gameState.gameEnded && (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.85)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'white',padding:'40px',borderRadius:'15px',textAlign:'center',maxWidth:'400px'}}>
            <h1 style={{margin:'0 0 20px 0',color:'#FFD700'}}>Game Over!</h1>
            <h2 style={{margin:'0 0 30px 0'}}>{gameState.winner} Wins!</h2>
            <div style={{marginBottom:'30px'}}>
              {Object.entries(gameState.scores).map(([player, score]) => (
                <div key={player} style={{fontSize:'18px',margin:'10px 0',fontWeight: player === gameState.winner ? 'bold' : 'normal'}}>
                  {player}: {score} points {player === gameState.winner && '🏆'}
                </div>
              ))}
            </div>
            <button onClick={() => window.location.reload()} style={{padding:'15px 30px',fontSize:'18px',background:'#FFD700',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'bold'}}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
