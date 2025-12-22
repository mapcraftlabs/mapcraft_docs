# USING_AI.md

This document explains **how MapCraft documentation is intended to be used with AI assistants** (such as ChatGPT, Claude, Gemini, etc) and what users should expect when asking AI systems questions about MapCraft Labs.

This file is **human-facing**. The authoritative behavioral contract for AI systems lives in `AGENTS.md`.

---

## Purpose

MapCraft documentation is designed to be safely consumable by AI systems **without producing invented features, APIs, or workflows**.

This guide exists to:

-   Help users ask better questions
-   Set expectations about AI limitations
-   Reduce hallucinated or misleading answers
-   Align AI responses with MapCraft’s documented behavior

---

## How AI Is Expected to Use These Docs

When an AI assistant is given a link to the MapCraft documentation repository, it is expected to:

-   Rely **only** on documented behavior
-   Preserve MapCraft’s core mental model
-   Explicitly state when something is not documented
-   Avoid speculation or invented solutions

These expectations are formally defined in **AGENTS.md**.

---

## Canonical Documentation Sources

When asking AI systems about MapCraft, the following sources are the **only sources of truth**:

-   MapCraft documentation repository:
    [https://github.com/mapcraftlabs/mapcraft_docs](https://github.com/mapcraftlabs/mapcraft_docs)

-   MapCraft public API documentation:
    [https://api.mapcraft.io/docs](https://api.mapcraft.io/docs)

If a behavior, feature, or API detail is not described in these sources, it should be treated as **unknown**.

---

## How to Ask Questions (Recommended)

You do **not** need to write a complex prompt. A simple question is usually sufficient.

However, for best results, you may optionally include one of the following phrases:

> "Answer this using only the MapCraft documentation and API docs. If it’s not documented, say so."

or

> "Explain this using MapCraft’s mental model (Projects, Layers, Globals, Scenarios, Simulations)."

AI systems should follow these rules even if you do **not** explicitly include them.

---

## Examples of Good Questions

-   "Should this change be a Global or a Layer Scenario?"
-   "Why would a simulation fail during the Extract step?"
-   "How are frozen scenarios different from active scenarios?"
-   "What permissions are required to upload an analysis file?"

---

## Examples of Unsupported Questions

AI assistants may not be able to answer questions that are **not covered by documentation**, such as:

-   Internal infrastructure details
-   Undocumented API endpoints
-   Future roadmap features
-   Performance guarantees not stated in the docs

In these cases, the AI should clearly say that the information is not documented.

---

## What AI Assistants Will _Not_ Do

When using MapCraft documentation, AI assistants should **not**:

-   Invent features, UI elements, or APIs
-   Guess simulation results or policy outcomes
-   Claim to run, inspect, or modify projects
-   Bypass user permissions

If an answer sounds overly confident but is not traceable to documentation, it should be treated with caution.

---

## Relationship to AGENTS.md

-   `AGENTS.md` defines **how AI systems must behave**
-   `USING_AI.md` explains **how humans should use AI systems with these docs**

If there is any conflict, **AGENTS.md takes precedence**.

---

## Final Note

AI assistants are best used as **documentation interpreters**, not decision-makers.

When in doubt, consult the official MapCraft documentation directly or contact the MapCraft team.

---

**End of USING_AI.md**
