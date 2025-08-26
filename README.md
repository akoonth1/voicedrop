# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Thought for 13s

Goal

Connect strangers through short voice notes.

Low friction. Safe by design.

MVP features

Anonymous signup with email or phone.

Simple profile: nickname, age range, country, time window, languages.

Match queue for “pen-pal style” pairing.

Record and send voice notes, max 60–90 seconds.

Inbox with threads. Each thread is one pairing.

Reply with voice. Optional short text caption.

Daily send limit to prevent spam.

Report, mute, block.

Auto transcription for accessibility and moderation.

Basic notifications: email or push when a new note arrives.

Delete note, delete account, export data.

Next version features

Topic prompts to spark messages.

Stickers or quick reactions.

Light profile badges for consistency streaks.

“Open to new pals” toggle while keeping old threads.

Language practice mode with auto translation.

Optional in-app coins to throttle abusers, not to monetize.

User stories
Onboarding

As a new user, I want to create an account in under one minute, so I start quickly.

As a new user, I want to set language and time window, so matches reach me while I am awake.

As a new user, I want a short tutorial, so I know how to record and reply.

Matching

As a user, I want one new match per day, so I focus on real exchanges.

As a user, I want to skip a match a limited number of times, so I avoid bad fits.

As a user, I want filters like language and age range, so I feel safe.

Messaging

As a user, I want to record a note in one tap, so I speak without friction.

As a user, I want to listen at 1x or 1.5x, so I manage time.

As a user, I want transcripts, so I understand accents or listen in quiet spaces.

As a user, I want to reply in the same thread, so context stays intact.

As a user, I want to send a quick reaction, so I acknowledge without a full note.

Safety and control

As a user, I want to report, mute, or block, so I feel protected.

As a user, I want clear content rules, so I know the boundaries.

As a user, I want to delete my notes and account, so I stay in control.

As a user, I want to hide location and last-seen, so I keep privacy.

Re-engagement

As a user, I want a gentle nudge when I have an unread note, so I return.

As a user, I want a streak or weekly recap, so I keep momentum.

Site map and structure
Public

Landing

What it is, how it works, safety, FAQ

Create account, Log in

Terms, Privacy

App (after login)

Home

Your queue: “New match available” card

Continue a thread

Inbox

List of threads with last note preview and timestamp

Thread view

Player, transcript, record button, reactions, report, block

Record

Hold to record, preview, caption, send

Profile

Nickname, avatar, language, time window, filters, notifications

Settings

Data export, delete account, rules, help

Core flows
First session

Create account

Pick preferences

Record a 10 second intro (optional)

Receive first match card

Send first note

Daily loop

Notification about a new note

Play, react, reply

If the thread stalls for 7 days, prompt to nudge or archive

Matching logic options

Daily random within filters, one new thread per day.

Optional prompt-based matching: both pick a topic, then match on overlap.

Cooldowns. If a user skips three times in a row, pause new matches for 24 hours.

Content rules and moderation

Automatic screening on transcripts and audio features.

Tiered actions: warn, restrict, suspend.

Shadow rate-limits for mass send patterns.

Manual review queue for reports with audio snippet and transcript.

Data model, minimal

User: id, email or phone, nickname, avatar, language, time window, filters, created_at, status.

Match: id, user_a_id, user_b_id, created_at, status (active, archived).

Message: id, match_id, sender_id, audio_url, duration, transcript, sentiment flags, created_at, deleted_at.

Report: id, reporter_id, target_user_id, message_id, reason, created_at, status.

Device/Notification: id, user_id, device_token, channel, enabled.

Non-functional basics

Fast record and playback under bad networks.

Audio storage with short TTL signed URLs.

Data retention policy for deleted notes.

GDPR and CCPA support.

Accessibility: transcripts, keyboard control.

MVP success metrics

Day-1 activation rate: sent at least one note.

First reply rate within 24 hours.

Median notes per active thread per week.

Report rate below a set threshold.

7-day retention.

Build sketch

Frontend: React or React Native Web, audio recorder, background playback.

Backend: Node or Python API, auth, matching, rate limits.

Storage: S3-style for audio, Postgres for data.

Services: Transcription API, content moderation API, email and push.

Quick naming prompts for tone alignment

VoicePals, NoteSwap, HelloVoice, PingPal
