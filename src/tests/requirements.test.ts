// Tests for the instrument registry, the Alto Saxophone requirement program and
// the generic requirement engine. Self-contained (node:assert), so it runs
// under src/tests/run.mjs and under plain `tsx`.

import assert from 'node:assert/strict';
import {
  DEFAULT_INSTRUMENT_ID,
  fullySupportedInstrumentIds,
  getInstrumentEntry,
  hasRequirementProgram,
  instrumentIdForType,
  isUnsupportedInstrument,
} from '../instruments/registry';
import { getAllLessons, trackForInstrument, getLessonById } from '../curriculum';
import { getRequirementProgram } from '../requirements/programs';
import {
  availableLevels,
  buildGapMap,
  currentFocus,
  levelComplete,
  resolveTarget,
  stateOf,
} from '../requirements/engine';
import type { RequirementRecord } from '../requirements/model';

type Case = { name: string; run: () => void };
const cases: Case[] = [];
const test = (name: string, run: () => void) => cases.push({ name, run });

const program = getRequirementProgram('alto-sax');
if (!program) throw new Error('alto-sax requirement program is not registered');
const reqs = program.requirements;
const basicIds = reqs.filter((r) => r.level === 'BASIC').map((r) => r.id);
const oneIds = reqs.filter((r) => r.level === 'ONE').map((r) => r.id);

const observed = (ids: readonly string[]): Record<string, RequirementRecord> =>
  Object.fromEntries(ids.map((id) => [id, { observedPassAt: '2026-11-01T00:00:00.000Z', observedBy: 'test' }]));

// ---------------------------------------------------------------- registry

test('alto sax is fully supported and is the default', () => {
  assert.equal(DEFAULT_INSTRUMENT_ID, 'alto-sax');
  assert.equal(hasRequirementProgram('alto-sax'), true);
  assert.equal(isUnsupportedInstrument('alto-sax'), false);
  assert.deepEqual(fullySupportedInstrumentIds(), ['alto-sax']);
});

test('unregistered instruments are unsupported and never fall back to saxophone content', () => {
  // undefined means "the active instrument" by design, so it is tested separately below.
  for (const id of ['tenor-sax', 'baritone-sax', 'soprano-sax', 'trumpet', 'made-up', '', null]) {
    assert.equal(isUnsupportedInstrument(id as string | null | undefined), true, `${String(id)} should be unsupported`);
    assert.equal(trackForInstrument(id as string | null | undefined), null, `${String(id)} must have no track`);
    assert.equal(getAllLessons(id as string | null | undefined).length, 0, `${String(id)} must have no lessons`);
    assert.equal(getRequirementProgram(id as string | null | undefined), null, `${String(id)} must have no program`);
  }
});

test('a lookup with no instrument uses the active track, which defaults to alto sax', () => {
  assert.equal(getAllLessons().length > 0, true);
});

test('clarinet keeps legacy lesson content but has no requirement program yet', () => {
  assert.equal(getInstrumentEntry('clarinet')?.support, 'legacy');
  assert.equal(hasRequirementProgram('clarinet'), false);
  assert.equal(getAllLessons('clarinet').length > 0, true);
});

test('onboarding instrument types map to instrument ids; unknown types map to nothing', () => {
  assert.equal(instrumentIdForType('alto'), 'alto-sax');
  assert.equal(instrumentIdForType('tenor'), 'tenor-sax');
  assert.equal(instrumentIdForType('bogus'), null);
});

// ---------------------------------------------------------------- program data

test('requirement ids are unique and contain no instrument name', () => {
  const ids = reqs.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate requirement id');
  for (const id of ids) assert.ok(!/sax|saxophone|clarinet/i.test(id), `instrument name in id: ${id}`);
});

test('every requirement has a title, a standard and a source', () => {
  for (const r of reqs) {
    assert.ok(r.title.trim(), `${r.id} title`);
    assert.ok(r.standard.trim(), `${r.id} standard`);
    assert.ok(r.source.trim(), `${r.id} source`);
  }
});

test('every teaching lesson id resolves to a real alto sax lesson', () => {
  const lessonIds = new Set(getAllLessons('alto-sax').map((l) => l.id));
  for (const r of reqs) {
    assert.ok(r.teachingLessonIds.length > 0, `${r.id} has no teaching lesson`);
    for (const id of r.teachingLessonIds) {
      assert.ok(lessonIds.has(id), `${r.id} references missing lesson ${id}`);
      assert.ok(getLessonById(id), `${id} not found by getLessonById`);
    }
  }
});

test('Basic and Level One are present, Basic first', () => {
  assert.deepEqual(availableLevels(program), ['BASIC', 'ONE']);
});

// ---------------------------------------------------------------- engine

test('stateOf: observed pass beats self-check beats lesson completion', () => {
  const def = reqs.find((r) => r.id === 'rhythm.basic')!;
  const lessonDone = [def.teachingLessonIds[0]];
  assert.equal(stateOf(def, undefined, []), 'not-started');
  assert.equal(stateOf(def, undefined, lessonDone), 'learning');
  assert.equal(stateOf(def, { readyAt: 'x' }, lessonDone), 'ready-to-check');
  assert.equal(stateOf(def, { readyAt: 'x', observedPassAt: 'y' }, []), 'observed-pass');
});

test('lesson completion never counts toward a level', () => {
  const allLessons = [...new Set(basicIds.flatMap((id) => reqs.find((r) => r.id === id)!.teachingLessonIds))];
  assert.equal(levelComplete(program, 'BASIC', {}, allLessons), false);
  assert.equal(currentFocus(program, 'BASIC', {}, allLessons)?.def.id, 'maintenance.basic');
});

test('self-check does not count; observed pass does', () => {
  const ready = Object.fromEntries(basicIds.map((id) => [id, { readyAt: 'x' }]));
  assert.equal(levelComplete(program, 'BASIC', ready, []), false);
  assert.equal(levelComplete(program, 'BASIC', observed(basicIds), []), true);
});

test('focus moves to the next unmet requirement in pathway order', () => {
  const first = basicIds[0];
  const records = observed([first]);
  assert.equal(currentFocus(program, 'BASIC', records, [])?.def.id, basicIds[1]);
});

test('no focus once everything up to the target is counted', () => {
  assert.equal(currentFocus(program, 'BASIC', observed(basicIds), []), null);
});

test('target resolution: requested level wins; otherwise first open level; unknown level ignored', () => {
  assert.equal(resolveTarget(program, 'ONE', {}, []), 'ONE');
  assert.equal(resolveTarget(program, undefined, {}, []), 'BASIC');
  assert.equal(resolveTarget(program, undefined, observed(basicIds), []), 'ONE');
  assert.equal(resolveTarget(program, 'FIVE', {}, []), 'BASIC', 'FIVE has no requirements yet');
});

test('gap map for Level One lists earlier open Basic requirements separately', () => {
  const gap = buildGapMap(program, 'ONE', observed([basicIds[0]]), []);
  assert.equal(gap.target, 'ONE');
  assert.equal(gap.targetTotal, oneIds.length);
  assert.equal(gap.targetOpen, oneIds.length);
  assert.equal(gap.earlierOpen.length, basicIds.length - 1);
  assert.equal(gap.focus?.def.id, basicIds[1]);
});

test('gap map groups target requirements by family without losing any', () => {
  const gap = buildGapMap(program, 'ONE', {}, []);
  const grouped = gap.targetGroups.reduce((n, g) => n + g.items.length, 0);
  assert.equal(grouped, oneIds.length);
});

let failed = 0;
for (const c of cases) {
  try {
    c.run();
    console.log(`✅ ${c.name}`);
  } catch (err) {
    failed++;
    console.log(`❌ ${c.name}\n   ${(err as Error).message}`);
  }
}
console.log(`requirements: ${cases.length - failed}/${cases.length} passed`);
if (failed > 0) process.exit(1);
