import {
  getEventHash,
  getPublicKey,
  signEvent,
} from 'nostr-tools';

// Optional: add relay pool management later
const RELAY_URL = "wss://relay.damus.io"; // change or add more later

export async function submitZapwordScore({ word, tries }) {
  const privkey = localStorage.getItem('privkey');
  const pubkey = localStorage.getItem('pubkey');

  if (!privkey || !pubkey) {
    console.warn("Missing key(s)");
    return;
  }

  const event = {
    kind: 5001,
    pubkey,
    created_at: Math.floor(Date.now() / 1000),
    tags: [
      ['d', 'zapword'],
      ['date', new Date().toISOString().slice(0, 10)],
      ['tries', tries.toString()],
      ['word', word], // optional — remove if you want to hide answer
    ],
    content: 'ZapWord result',
  };

  event.id = getEventHash(event);
  event.sig = signEvent(event, privkey);

  const socket = new WebSocket(RELAY_URL);

  socket.onopen = () => {
    socket.send(JSON.stringify(["EVENT", event]));
    console.log("✅ Published score to Nostr");
    socket.close();
  };

  socket.onerror = (e) => {
    console.error("WebSocket error", e);
  };
}
