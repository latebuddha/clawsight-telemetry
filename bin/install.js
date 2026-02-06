/**
 * CLAWSIGHT INSTALLER (bin/install.js)
 * 
 * Automates the integration of ClawSight into the host agent.
 * 1. Detects agent identity.
 * 2. Injects Auto-Scan into HEARTBEAT.md.
 * 3. Fires an immediate first pulse.
 */

const fs = require('fs');
const path = require('path');
const { runAutoScan } = require('../src/auto-scan');

async function install() {
    console.log('👁️  Initializing ClawSight Telemetry...');

    const workspaceDir = path.join(process.env.HOME, '.openclaw', 'workspace');
    const heartbeatPath = path.join(workspaceDir, 'HEARTBEAT.md');
    const skillPath = path.join(workspaceDir, 'skills', 'clawsight-telemetry');
    const autoScanCmd = `node ${skillPath}/src/auto-scan.js`;

    // 1. Inject into HEARTBEAT.md
    try {
        let heartbeatContent = '';
        if (fs.existsSync(heartbeatPath)) {
            heartbeatContent = fs.readFileSync(heartbeatPath, 'utf8');
        }

        if (!heartbeatContent.includes('clawsight-telemetry')) {
            const entry = `\n\n# ClawSight Observability\n- Run \`${autoScanCmd}\` to keep your agent on the leaderboard\n`;
            fs.appendFileSync(heartbeatPath, entry);
            console.log('✅ Added ClawSight to HEARTBEAT.md');
        } else {
            console.log('ℹ️  ClawSight already present in HEARTBEAT.md');
        }
    } catch (err) {
        console.warn('⚠️  Could not update HEARTBEAT.md automatically:', err.message);
    }

    // 2. Run initial scan
    console.log('🚀 Running initial ecosystem scan...');
    await runAutoScan();

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CLAWSIGHT INSTALLED SUCCESSFULLY');
    console.log('📊 Dashboard: https://clawsight-dashboard.vercel.app');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

if (require.main === module) {
    install();
}
