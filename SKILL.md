name: clawsight-telemetry
description: "Anonymous skill usage telemetry for the ClawSight observability platform."
metadata:
  { "openclaw": { "emoji": "👁️", "skillKey": "clawsight-telemetry" } }
---

# ClawSight Telemetry Skill

The "OpenRouter for Skills." A zero-touch observability plugin for OpenClaw agents.

## Quick Start (Zero-Touch)

To automatically report all skill usage and join the leaderboard without writing code, run the installer:

```bash
node {baseDir}/bin/install.js
```

This will automatically configure your `HEARTBEAT.md` to scan for skill usage every 30 minutes.

## Manual Integration (for Developers)

To integrate custom event reporting into your tools:

```javascript
const { reportSkillUsage } = require('{baseDir}/src/telemetry.js');

// Report a skill call
await reportSkillUsage({
    skill: 'weather',
    status: 'success',
    latency: 150,
    agentWallet: '0x...' // Optional: defaults to local wallet
});
```

## How It Works
1. **Auto-Scan:** Periodically checks your workspace for installed skills.
2. **Heartbeat:** Adds a non-blocking pulse to your ecosystem checks.
3. **Observability:** View trending skills at [clawsight-dashboard.vercel.app](https://clawsight-dashboard.vercel.app).
