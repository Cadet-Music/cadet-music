/**
 * Unit tests for pure telemetry helpers (src/utils/telemetry.ts).
 * parseUserAgent is DOM-free; the module import itself is side-effect free.
 * Dependency-free: npx tsx src/tests/telemetry.test.ts
 */
import { parseUserAgent } from '../utils/telemetry';

let failures = 0;
function assert(cond: boolean, msg: string) {
  if (!cond) { console.error('❌ FAIL:', msg); failures++; }
  else console.log('✅ PASS:', msg);
}

const UA = {
  iphoneSafari: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  ipadSafari: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/604.1',
  iosChrome: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0 Mobile/15E148 Safari/604.1',
  androidChrome: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  winEdge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
  macFirefox: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
  linuxChrome: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  cros: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  opera: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
};

assert(parseUserAgent(UA.iphoneSafari).os === 'iOS', 'detects iOS on iPhone');
assert(parseUserAgent(UA.iphoneSafari).browser === 'Safari', 'detects Safari via Version/ token');
assert(parseUserAgent(UA.ipadSafari).os === 'iPadOS', 'detects iPadOS via iPad token');
assert(parseUserAgent(UA.iosChrome).browser === 'Chrome (iOS)', 'CriOS wins over generic Safari');
assert(parseUserAgent(UA.androidChrome).os === 'Android', 'detects Android');
assert(parseUserAgent(UA.androidChrome).browser === 'Chrome', 'Android stock browser = Chrome');
assert(parseUserAgent(UA.winEdge).os === 'Windows 10/11', 'detects Windows NT 10');
assert(parseUserAgent(UA.winEdge).browser === 'Edge', 'Edg/ token detected before Chrome (both present)');
assert(parseUserAgent(UA.macFirefox).os === 'macOS', 'detects macOS');
assert(parseUserAgent(UA.macFirefox).browser === 'Firefox', 'detects Firefox');
assert(parseUserAgent(UA.linuxChrome).os === 'Linux', 'detects Linux');
assert(parseUserAgent(UA.cros).os === 'ChromeOS', 'CrOS detected before generic Linux');
assert(parseUserAgent(UA.opera).browser === 'Opera', 'OPR/ detected before Chrome');
assert(parseUserAgent('totally unknown agent').os === 'Unknown', 'unknown UA -> Unknown os');
assert(parseUserAgent('').browser === 'Unknown', 'empty UA -> Unknown browser');

if (failures > 0) { console.error(`\n${failures} test(s) FAILED`); process.exit(1); }
console.log('\nAll telemetry tests passed.');
