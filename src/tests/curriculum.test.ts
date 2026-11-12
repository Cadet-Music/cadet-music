// Structural checks for the rewritten curriculum. If your runner is Jest rather than Vitest,
// change the first import to use Jest's globals.
import { describe, it, expect } from 'vitest';
import {
  getAllLessons, getCurriculumContent, getCurriculumExercises, getLessonStatus, getOfficialSongs,
  migrateCompletedLessons, trackForInstrument,
} from '../curriculum';

const INSTRUMENTS = ['alto-sax', 'clarinet'];

describe('curriculum', () => {
  it('has the same number of lessons on both instrument paths', () => {
    expect(getAllLessons('alto-sax').length).toBe(getAllLessons('clarinet').length);
  });

  it('has unique lesson ids across both instruments', () => {
    const ids = INSTRUMENTS.flatMap((i) => getAllLessons(i).map((l) => l.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every lesson content and a quiz (song lessons supply their own content)', () => {
    for (const inst of INSTRUMENTS) {
      for (const lesson of getAllLessons(inst)) {
        if (lesson.id.startsWith('song-')) continue;
        const content = getCurriculumContent(lesson.id);
        expect(content, `content for ${lesson.id}`).not.toBeNull();
        expect(content!.sections.length, lesson.id).toBeGreaterThan(0);
        expect((getCurriculumExercises(lesson.id) ?? []).length, `quiz for ${lesson.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it('writes valid quiz questions', () => {
    for (const inst of INSTRUMENTS) {
      for (const lesson of getAllLessons(inst)) {
        for (const q of getCurriculumExercises(lesson.id) ?? []) {
          if (q.type === 'multiple-choice') {
            expect(q.options!.filter((o) => o.correct).length, `${lesson.id}: ${q.question}`).toBe(1);
          }
          if (q.type === 'fill-order') {
            expect([...q.items!].sort()).toEqual([...q.correctOrder!].sort());
          }
          if (q.type === 'true-false') expect(['true', 'false']).toContain(q.correctAnswer);
        }
      }
    }
  });

  it('never uses an id prefix that LessonView treats specially, except the existing saxophone Basic songs', () => {
    for (const inst of INSTRUMENTS) {
      for (const lesson of getAllLessons(inst)) {
        expect(lesson.id.startsWith('clarinet-'), lesson.id).toBe(false);
        if (lesson.id.startsWith('song-')) {
          expect(inst).toBe('alto-sax');
          expect(lesson.level).toBe('BASIC');
        }
      }
    }
  });

  it('links every drill lesson to videos', () => {
    for (const inst of INSTRUMENTS) {
      for (const lesson of getAllLessons(inst).filter((l) => l.topic === 'Band Drill')) {
        const videos = getCurriculumContent(lesson.id)?.videos ?? [];
        expect(videos.length, lesson.id).toBeGreaterThan(0);
        for (const v of videos) expect(v.url.startsWith('https://')).toBe(true);
      }
    }
  });

  it('only unlocks a lesson after the previous lesson on the SAME instrument path', () => {
    const sax = getAllLessons('alto-sax');
    expect(getLessonStatus(sax[0].id, [], 'alto-sax')).toBe('available');
    expect(getLessonStatus(sax[1].id, [], 'alto-sax')).toBe('locked');
    expect(getLessonStatus(sax[1].id, [sax[0].id], 'alto-sax')).toBe('available');
    // A clarinet player never needs a saxophone lesson.
    const cl = getAllLessons('clarinet');
    expect(getLessonStatus(cl[0].id, [], 'clarinet')).toBe('available');
  });

  it('uses the official repertoire lists', () => {
    expect(getOfficialSongs('ONE', 'alto-sax').listA.map((s) => s.title)).toContain('Annie Laurie');
    expect(getOfficialSongs('THREE', 'clarinet').listB.map((s) => s.title)).toContain('Duet Brillant');
    expect(getOfficialSongs('FIVE', 'alto-sax').listB.length).toBe(2);
  });

  it('routes instruments to the right path', () => {
    expect(trackForInstrument('tenor-sax')).toBeNull(); // unregistered: no fallback to saxophone
    expect(trackForInstrument('bass-clarinet')).toBeNull(); // unregistered until implemented
  });

  it('maps old lesson ids onto the new ones', () => {
    expect(migrateCompletedLessons(['basic-intro'])).toContain('sax-b-parts');
  });
});
