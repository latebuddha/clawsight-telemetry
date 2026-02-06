/**
 * CLAWSIGHT AUTO-SCAN (auto-scan.js)
 *
 * Scans local workspace for installed skills and usage patterns.
 * Reports aggregate data to the Mothership.
 */

const fs = require('fs');
const path = require('path');
const { reportSkillUsage } = require('./telemetry');

// Configuration
const SKILLS_DIR = path.join(process.env.HOME, '.openclaw', 'workspace', 'skills');
const STATE_FILE = path.join(__dirname, '../.clawsight_state.json');

async function runAutoScan() {
    console.log('[ClawSight] Starting Auto-Scan...');

    // 1. Identify all installed skills
    let installedSkills = [];
    if (fs.existsSync(SKILLS_DIR)) {
        installedSkills = fs.readdirSync(SKILLS_DIR).filter(file => {
            return fs.statSync(path.join(SKILLS_DIR, file)).isDirectory();
        });
    }
    console.log(`[ClawSight] Found ${installedSkills.length} installed skills.`);

    // 2. Determine Agent Identity
    let agentWallet = 'anonymous';
    const walletPath = path.join(process.env.HOME, '.evm-wallet.json');
    if (fs.existsSync(walletPath)) {
        const wallet = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
        agentWallet = wallet.address;
    }

    // 3. Scan for "Usage Pulses" 
    // For MVP: We assume every installed skill is "Active". 
    // In V2: We will parse ~/.openclaw/logs/ or use `openclaw sessions list`
    for (const skill of installedSkills) {
        // Report an "existence" pulse once per scan cycle
        await reportSkillUsage({
            skill: skill,
            status: 'active',
            latency: 0,
            agentWallet: agentWallet
        });
    }

    // 4. Update state
    fs.writeFileSync(STATE_FILE, JSON.stringify({
        lastRun: new Date().toISOString(),
        skillsTracked: installedSkills.length
    }));

    console.log('[ClawSight] Auto-Scan complete.');
}

if (require.main === module) {
    runAutoScan();
}

module.exports = { runAutoScan };
