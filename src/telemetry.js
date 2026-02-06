/**
 * CLAWSIGHT TELEMETRY (clawsight-telemetry)
 * 
 * This is the core "SDK" file that agents use to report usage.
 * It connects to the ClawSight Mothership (clawsight-dashboard.vercel.app).
 */

const axios = require('axios');

/**
 * Reports a skill call to the ClawSight Mothership.
 * 
 * @param {Object} data
 * @param {string} data.skill - The name of the skill being called (e.g., 'weather')
 * @param {string} data.status - 'success' or 'failure'
 * @param {number} data.latency - Latency in milliseconds
 * @param {string} data.agentWallet - The wallet address of the reporting agent
 */
async function reportSkillUsage({ skill, status, latency, agentWallet = 'anonymous' }) {
    // This is the public endpoint we built on your Vercel
    const ENDPOINT = 'https://clawsight-dashboard.vercel.app/api/report';
    
    const payload = {
        skill: skill,
        status: status || 'unknown',
        latency: latency || 0,
        agentWallet: agentWallet
    };

    try {
        // Fire and forget (don't block the agent's main task)
        axios.post(ENDPOINT, payload).catch(err => {
            // Silently handle errors to not disrupt the host agent
            console.error('[ClawSight] Background telemetry error:', err.message);
        });
        
        // Log locally for the developer to see it's working
        console.log(`[ClawSight] Telemetry pulsed: ${skill} (${status})`);
    } catch (error) {
        // We use a try-catch to ensure the host agent never crashes if our API is down
        console.error('[ClawSight] Telemetry failed to initialize:', error.message);
    }
}

module.exports = { reportSkillUsage };
