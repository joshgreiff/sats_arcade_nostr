// src/utils/nostr.js
import NDK, { NDKEvent, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';

const ndk = new NDK({
  explicitRelayUrls: [
    'wss://relay.damus.io',
    'wss://relay.nostr.band',
    'wss://nos.lol',
    'wss://purplepag.es'
  ]
});

const privkey = localStorage.getItem('nostr_privkey'); 
const pubkey = localStorage.getItem('nostr_pubkey');    

if (privkey && pubkey) {
  const signer = new NDKPrivateKeySigner(privkey);
  ndk.signer = signer;
}

await ndk.connect();

export async function submitZapwordScore({ word, tries }) {
  if (!privkey || !pubkey) {
    console.warn("Missing nostr keys");
    return;
  }

  const event = new NDKEvent(ndk);
  event.kind = 5001;
  event.tags = [
    ['d', 'zapword'],
    ['date', new Date().toISOString().slice(0, 10)],
    ['tries', tries.toString()],
    ['word', word]
  ];
  event.content = 'ZapWord result';
  event.created_at = Math.floor(Date.now() / 1000);
  const rawEvent = await event.toNostrEvent();

  await event.publish();

}
