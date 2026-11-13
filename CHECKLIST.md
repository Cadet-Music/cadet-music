# Pending changes (apply in the next batch)

## Ready to apply
- [x] `src/components/Settings.tsx`: tenor, baritone and soprano are disabled and marked "Coming later".
      Replace the whole file with the copy in this folder.

## Next: automatic readiness and read-only instructor monitoring
Direction (confirmed):
- The app judges how ready each cadet is, using the evidence it can measure.
- The official level test is separate and happens outside the app. The app does not record it.
- Instructors monitor progress. They are part-time, so the view must be read-only and need no action to stay useful.
- No per-requirement sign-off. No test-result recording.

- [x] Identity: B. Each cadet account has a unique ID, keyed by cadet email (slice 1).
- [x] Sync requirement evidence to the server, keyed per cadet (slice 1: saved as part of the full profile)
- [ ] Evaluators: theory items from quiz results; scale accuracy from pitch detector
- [ ] Readiness rule: consistent passes across two separate sessions ("likely ready")
- [ ] Items with no evaluator (rhythm, sight-reading, pieces, tone, drill) stay "needs assessor" in the app
- [ ] Read-only instructor view: cadets by level, grouped "likely ready for test", "getting close", "needs attention"
- [ ] Hide IP/location telemetry from instructor views

## Human review (content)
- [ ] Confirm Basic and Level One requirement list against official packages
- [ ] Confirm whether band drill is graded
- [ ] Check Level One scale tables against printed pages

## Known, not yet scheduled
- [ ] LessonView: clarinet content chosen by lesson-ID prefix
- [ ] Remove the saxophone/clarinet union type in favour of registry-derived tracks
- [ ] Admin panel lesson total hardcoded to alto

## Access and account design (decided)
- Login: cadet email + password (hashed on server). Passwords are never viewable by anyone.
- Reset: admin sets a temporary password; cadet must change it at next sign-in.
- Tiers: Cadet | Command team (read-only) | Command team confidential (2FA) | Admin (2FA).
- Command team = drum major, director of music, adult staff.
- Access codes: admin creates a code for a section and period. Codes work for 30 days from creation.
- Codes are shared, with a maximum of 5 uses per code. Every use is logged.
- Live codes are viewable by admin/confidential tier only; stored encrypted, key kept in hosting secrets.
- Accounts inactive for 12 months are deleted, with a warning list shown in the admin dashboard.
- Scope check: a cadet code can never grant Command team confidential access.

## Still needed before going live
- [ ] Privacy notice updated (auto-deletion, codes, Command team access). Drafted for squadron review.
- [ ] Decision: clear existing test accounts (yes, agreed)

## Slice 1 (built, in next-batch/)
- [x] Hashed passwords (scrypt), cadet-email-only sign-up, sign-in lockout after 5 wrong tries
- [x] Full profile saved per account and restored on sign-in
- [x] Sign-out clears the session; a device without a session must sign in
- [x] Admin reset with forced change at sign-in; old sessions stop working
- [x] Admin Accounts tab: reset and clear-test-data (type DELETE TEST DATA)
- [x] Settings: tenor, baritone and soprano disabled and marked "Coming later"

## Action needed in Vercel (before deploying slice 1)
- [ ] Add environment variable SESSION_SECRET (at least 32 random characters).
      Sign-in refuses to work without it, on purpose.
- [ ] After deploying, open Admin > Accounts and clear test data once.

## Slice 2 onward (next)
- [ ] Command team access codes (5 uses, 30 days, shared, visible to admin)
- [ ] Two-factor authentication for Command team confidential and admin
- [ ] Auto-delete accounts inactive for 12 months, with a warning list
- [ ] Read-only Command team view (progress, readiness, who is ready to test)
- [ ] Evaluators and "likely ready" rule
