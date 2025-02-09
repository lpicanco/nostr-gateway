import {bech32} from 'bech32'

export const kindNames = {
  0: 'profile metadata',
  1: 'text note',
  2: 'relay recommendation',
  3: 'contact list',
  4: 'encrypted direct message',
  5: 'event deletion',
  7: 'reaction',
  40: 'channel creation',
  41: 'channel metadata',
  42: 'channel message',
  43: 'channel hide message',
  44: 'channel mute user'
}

export const relays = [
  'wss://knostr.neutrine.com:8880',
  'wss://nostr.rocks',
  'wss://relay.damus.io'
]

export function nip05toURL(identifier) {
  const [name, domain] = identifier.split('@')
  return `https://${domain}/.well-known/nostr.json?name=${name}`
}

export function npubToHex(npub) {
  let {prefix, words} = bech32.decode(npub)
  if (prefix === 'npub') {
    let bytes = bech32.fromWords(words).slice(0, 32)
    let pubkey = Buffer.from(bytes).toString('hex')
    return pubkey
  }
  throw new Error('not an npub key')
}

export function hexToNpub(hex) {
  return bech32.encode('npub', bech32.toWords(Buffer.from(hex, 'hex')))
}
