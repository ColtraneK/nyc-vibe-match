/**
 * Checks if an email looks like a real person's address.
 * Returns false for throwaway/junk inputs that pass basic format validation
 * but clearly aren't someone's real email.
 */
export function isPlausibleEmail(email: string): boolean {
  if (!email) return false;

  const local = email.split("@")[0];
  if (!local) return false;

  // Local part too short (a@b.co, x@y.io)
  if (local.length < 3) return false;

  // All same character (aaa@, xxx@, 111@)
  if (/^(.)\1+$/.test(local)) return false;

  // Keyboard smash: no vowels at all in 4+ char local part
  if (local.length >= 4 && !/[aeiouy]/i.test(local)) return false;

  // Sequential keys / obvious junk patterns
  const junk = [
    "asdf", "qwer", "zxcv", "test", "fake", "nope", "none",
    "1234", "abcd", "aaaa", "temp", "trash", "junk", "noemail",
    "no@", "na@", "notreal", "example", "foobar", "barfoo",
  ];
  const lower = local.toLowerCase();
  if (junk.some((j) => lower === j || lower.startsWith(j + "+"))) return false;

  return true;
}
