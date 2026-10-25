// Data kana dasar. Katakana dibentuk dari hiragana (+0x60).
export const KANA_GROUPS: Array<[string, string, string[]]> = [
  ['vowels', 'あいうえお', ['a', 'i', 'u', 'e', 'o']],
  ['k', 'かきくけこ', ['ka', 'ki', 'ku', 'ke', 'ko']],
  ['s', 'さしすせそ', ['sa', 'shi', 'su', 'se', 'so']],
  ['t', 'たちつてと', ['ta', 'chi', 'tsu', 'te', 'to']],
  ['n', 'なにぬねの', ['na', 'ni', 'nu', 'ne', 'no']],
  ['h', 'はひふへほ', ['ha', 'hi', 'fu', 'he', 'ho']],
  ['m', 'まみむめも', ['ma', 'mi', 'mu', 'me', 'mo']],
  ['y', 'やゆよ', ['ya', 'yu', 'yo']],
  ['r', 'らりるれろ', ['ra', 'ri', 'ru', 're', 'ro']],
  ['w', 'わを', ['wa', 'wo']],
  ['nn', 'ん', ['n']],
  ['g', 'がぎぐげご', ['ga', 'gi', 'gu', 'ge', 'go']],
  ['z', 'ざじずぜぞ', ['za', 'ji', 'zu', 'ze', 'zo']],
  ['d', 'だぢづでど', ['da', 'ji', 'zu', 'de', 'do']],
  ['b', 'ばびぶべぼ', ['ba', 'bi', 'bu', 'be', 'bo']],
  ['p', 'ぱぴぷぺぽ', ['pa', 'pi', 'pu', 'pe', 'po']],
];

export const toKatakana = (s: string) =>
  [...s].map((c) => String.fromCharCode(c.charCodeAt(0) + 0x60)).join('');
