# AGENTS.md — Cita.ai

Directives for any AI assistant working in this repository. **This file is the single
source of truth.** `CLAUDE.md` is a pointer to it and repeats nothing: two rulebooks
drift apart, and when they disagree there is no way to tell which one wins.

---

## 1. How this team works: Spec-Driven Development

**The spec is the source. The code is a consequence.** Nothing gets implemented that
isn't specified first, and when the code and the spec disagree, the spec is not the
thing that's wrong by default — the disagreement gets reported, not silently resolved.

The cycle, and what each stage produces:

| Stage | Produces | Blocked until |
| :--- | :--- | :--- |
| `constitution` | `.specify/memory/constitution.md` — the rules no feature may break | — |
| `specify` | `specs/<NNN>-<slug>/spec.md` — what and why, never how | — |
| `clarify` | Open questions resolved and written into the spec | The spec exists |
| `plan` | `plan.md` — technical approach, and `research.md` when a decision needed digging | The spec has no blocking ambiguity |
| `tasks` | `tasks.md` — ordered, checkable units of work | The plan is agreed |
| `implement` | Code, against the tasks | See the constitution's quality gate |
| `analyze` | Verification that what shipped matches what was specified | The feature is implemented |

**Feature folders are numbered and never renumbered.** `specs/003-limite-del-plan-gratuito/`
keeps its number forever, even if features are abandoned. Cross-references point at
these numbers.

## 2. The constitution is binding

`.specify/memory/constitution.md` outranks every other document here, including this
one. A feature that violates it does not ship. If a spec needs an exception, the
exception is written into the spec with its reason — it is never assumed.

## 3. Git

- **Never commit to `main`.** Branch names: `feat/<NNN>-<slug>`, `fix/<slug>`,
  `docs/<slug>`, `chore/<slug>`.
- **Conventional Commits**, in English: `feat(booking):`, `fix(auth):`, `docs(specs):`,
  `chore(ci):`.
- One pull request per feature, referencing its spec folder.

## 4. Language

**Product documentation, specs, commit bodies aimed at the team, and anything a user
reads are written in Spanish (rioplatense, with accents and `ñ`).** Code identifiers,
field names, branch names, commit subjects and this file stay in English.

This is not a style preference: the users are Spanish-speaking professionals, and a
spec written in a language the product doesn't speak invites translation drift between
the acceptance criteria and the interface copy.

## 5. Secrets

- Real values live in `.env`, which is git-ignored and **never read into context**.
  Load them into the shell with `set -a; . ./.env; set +a` and reference the variable.
- **Never** `echo $VARIABLE`, and never `curl -v` on an authenticated call: both print
  the secret into the transcript.
- `.env.example` is versioned and lists **which** variables are needed, never their
  values. A new variable that isn't declared there doesn't exist as far as this team
  is concerned.
- `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. It is server-side only, and
  any new use of it needs a line in the plan explaining why the anon client wasn't
  enough.

## 6. Editing rules

- **`docs/historial/` is a record, not working documentation. It is never edited.**
  It holds what the project knew before this team adopted SDD. Discrepancies between
  it and the current specs are findings, not typos to clean up.
- Generated files are not hand-edited: `src/types/supabase.ts` comes from the database
  schema, `pnpm-lock.yaml` from the package manager.
- One package manager: **pnpm**. Don't add a second lockfile.

## 7. Stack, in one table

| Layer | What |
| :--- | :--- |
| Framework | Next.js 14 (App Router), TypeScript |
| Data & auth | Supabase — Postgres, Auth, Row Level Security |
| UI | Tailwind, Radix, react-hook-form + zod |
| Dates | date-fns, locale `es` |
| Transactional email | Resend |
| Hosting | Vercel |
