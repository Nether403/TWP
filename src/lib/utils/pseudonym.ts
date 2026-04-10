import { createHash } from 'crypto';

/**
 * Generate a SHA-256 hash of testimony text for tamper detection.
 * The hash serves as an immutable content identifier.
 */
export function hashTestimony(text: string): string {
  return createHash('sha256').update(text, 'utf-8').digest('hex');
}

/**
 * Generate a deterministic pseudonym from a UUID.
 * Uses word pairs to create memorable, anonymous identifiers.
 */
const ADJECTIVES = [
  'Silent', 'Distant', 'Hollow', 'Shadowed', 'Fractured', 'Unnamed',
  'Watchful', 'Buried', 'Shimmering', 'Unchained', 'Wandering', 'Bound',
  'Scorched', 'Veiled', 'Broken', 'Forged', 'Sunken', 'Rising',
  'Forgotten', 'Luminous', 'Ephemeral', 'Tempered', 'Drifting', 'Woven',
];

const NOUNS = [
  'Witness', 'Cipher', 'Echo', 'Fragment', 'Signal', 'Thread',
  'Ember', 'Vigil', 'Chronicle', 'Meridian', 'Threshold', 'Archive',
  'Shard', 'Beacon', 'Remnant', 'Nexus', 'Conduit', 'Prism',
  'Vessel', 'Catalyst', 'Origin', 'Margin', 'Anchor', 'Tide',
];

export function generatePseudonym(uuid: string): string {
  const hash = createHash('md5').update(uuid).digest();
  const adj = ADJECTIVES[hash[0] % ADJECTIVES.length];
  const noun = NOUNS[hash[1] % NOUNS.length];
  const num = ((hash[2] << 8) | hash[3]) % 1000;
  return `${adj}${noun}-${num.toString().padStart(3, '0')}`;
}
