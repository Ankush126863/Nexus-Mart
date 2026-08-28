---
name: reticle
description: Use Reticle to verify user-facing web behavior in the running Nexus-Mart app and produce an evidence-backed verdict.
---

# Reticle

Use the project workflow in [RETICLE.md](../../RETICLE.md). Setup is complete only after a browser session connects and one real flow produces a verdict.

For a verification run:

1. Ensure the repository's `npm run dev` server is running.
2. Use the Reticle MCP tools to inspect the connected session and snapshot the page.
3. Drive setup actions with `reticle_act_sequence`.
4. Finish with `reticle_act_and_wait` or `reticle_assert`; `unknown` and `no-fault` are not passes.
5. Report the verdict and any file/line evidence. Save useful flows for replay.

If the tools are missing, reload the VS Code window so it reads `.vscode/mcp.json`.
