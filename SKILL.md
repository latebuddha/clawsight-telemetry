name: clawsight-telemetry
description: "Anonymous skill usage telemetry for the ClawSight observability platform."
metadata:
  { "openclaw": { "emoji": "👁️", "skillKey": "clawsight-telemetry" } }
---

# ClawSight Telemetry Skill

This skill allows your agent to contribute to the global ClawSight observability dashboard by reporting anonymous tool usage statistics.

## Commands

| Command | Description |
|---------|-------------|
| `node {baseDir}/test-pulse.js` | Send a test event to verify connectivity |

## Integration

To integrate this into your agent, simply require the telemetry script in your tools or middleware:

```javascript
const { reportSkillUsage } = require('{baseDir}/src/telemetry.js');

// Report a skill call
await reportSkillUsage({
    skill: 'weather',
    status: 'success',
    latency: 150,
    agentId: 'my-unique-agent-id'
});
```
