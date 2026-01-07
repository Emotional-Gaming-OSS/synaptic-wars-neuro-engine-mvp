export class NeuroDashboardEnhanced {
    constructor(neuroAdaptiveEngine, emotionalDirector) {
        this.neuroAdaptiveEngine = neuroAdaptiveEngine;
        this.emotionalDirector = emotionalDirector;
        this.dashboardElement = null;
        this.updateInterval = null;
        this.tanglerCount = 0;
        this.initializeDashboard();
        this.subscribeToGameState();
    }

    initializeDashboard() {
        this.createDashboardHTML();
        this.startUpdates();
    }

    createDashboardHTML() {
        const wrapper = document.createElement('div');
        wrapper.id = 'neuro-dashboard-enhanced';

        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'dashboard-scroll-container';
        
        scrollContainer.innerHTML = `
            <div class="dashboard-header">
                <h3>🧠 Quantum Neural Engine</h3>
                <div class="status-indicator" id="engine-status">ACTIVE</div>
            </div>
            <div class="metrics-grid">
                <div class="metric-card emotional-state">
                    <div class="metric-title">Emotional State</div>
                    <div class="metric-value" id="emotional-state">Analyzing...</div>
                    <div class="metric-bar">
                        <div class="metric-fill" id="emotional-intensity"></div>
                    </div>
                    <div class="metric-subtitle" id="emotional-confidence">Confidence: 0%</div>
                </div>
                <div class="metric-card adaptations">
                    <div class="metric-title">Active Adaptations</div>
                    <div class="adaptations-list" id="adaptations-list">
                        <div class="adaptation-item">No active adaptations</div>
                    </div>
                </div>
                <div class="metric-card eeg-data">
                    <div class="metric-title">Brain Activity</div>
                    <div class="eeg-waves">
                        <div class="eeg-wave">
                            <span class="wave-label">Focus</span>
                            <div class="wave-bar">
                                <div class="wave-fill" id="focus-wave"></div>
                            </div>
                            <span class="wave-value" id="focus-value">0%</span>
                        </div>
                        <div class="eeg-wave">
                            <span class="wave-label">Calm</span>
                            <div class="wave-bar">
                                <div class="wave-fill" id="calm-wave"></div>
                            </div>
                            <span class="wave-value" id="calm-value">0%</span>
                        </div>
                    </div>
                </div>
                <div class="metric-card performance">
                    <div class="metric-title">System Performance</div>
                    <div class="performance-metrics">
                        <div class="performance-item">
                            <span class="perf-label">Adaptation Success</span>
                            <span class="perf-value" id="success-rate">0%</span>
                        </div>
                        <div class="performance-item">
                            <span class="perf-label">Engagement</span>
                            <span class="perf-value" id="engagement-score">0%</span>
                        </div>
                        <div class="performance-item">
                            <span class="perf-label">Tau Tanglers</span>
                            <span class="perf-value" id="tangler-count">0</span>
                        </div>
                        <div class="performance-item">
                            <span class="perf-label">Total Adaptations</span>
                            <span class="perf-value" id="total-adaptations">0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="recommendations-card">
                <div class="metric-title">Neuro Recommendations</div>
                <div class="recommendations-list" id="recommendations-list">
                    <div class="recommendation-item">System initializing...</div>
                </div>
            </div>
            <div class="controls-card">
                <div class="metric-title">Neuro Controls</div>
                <div class="control-buttons">
                    <button id="reset-adaptations" class="control-btn">Reset Adaptations</button>
                    <button id="toggle-eeg" class="control-btn">EEG: Simulated</button>
                    <button id="export-data" class="control-btn">Export Data</button>
                </div>
            </div>
        `;
        
        wrapper.appendChild(scrollContainer);
        this.addDashboardStyles();
        document.body.appendChild(wrapper);

        
        this.dashboardElement = wrapper;
        this.setupEventListeners();
    }

    addDashboardStyles() {
        const styles = `
            #neuro-dashboard-enhanced { position: fixed; top: 20px; right: 20px; width: 400px; z-index: 1000; display: flex; flex-direction: column; max-height: 90vh; }
            .dashboard-scroll-container { background: rgba(10, 10, 42, 0.95); border: 2px solid #8A2BE2; border-radius: 15px; padding: 20px; backdrop-filter: blur(10px); font-family: 'Segoe UI', sans-serif; color: white; box-shadow: 0 0 30px rgba(138, 43, 226, 0.3); overflow-y: auto; flex: 1 1 auto; }
            .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #8A2BE2; padding-bottom: 10px; }
            .dashboard-header h3 { margin: 0; color: #FFD700; font-size: 1.2rem; }
            .status-indicator { padding: 4px 8px; background: #00FF7F; color: #003300; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
            .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
            .metric-card { background: rgba(20, 20, 50, 0.7); padding: 15px; border-radius: 10px; border: 1px solid rgba(0, 191, 255, 0.3); }
            .metric-title { font-size: 0.9rem; color: #00BFFF; margin-bottom: 10px; font-weight: bold; }
            .metric-value { font-size: 1.1rem; font-weight: bold; color: #FFD700; margin-bottom: 8px; }
            .metric-bar { height: 6px; background: rgba(255, 255, 255, 0.2); border-radius: 3px; overflow: hidden; margin-bottom: 5px; }
            .metric-fill { height: 100%; background: linear-gradient(90deg, #8A2BE2, #00BFFF); transition: width 0.3s ease; }
            .metric-subtitle { font-size: 0.8rem; color: #888; }
            .adaptations-list { max-height: 80px; overflow-y: auto; }
            .adaptation-item { background: rgba(138, 43, 226, 0.2); padding: 5px 8px; margin: 2px 0; border-radius: 5px; font-size: 0.8rem; border-left: 3px solid #8A2BE2; }
            .eeg-waves { display: flex; flex-direction: column; gap: 8px; }
            .eeg-wave { display: flex; align-items: center; gap: 10px; }
            .wave-label { width: 40px; font-size: 0.8rem; color: #FFD700; }
            .wave-bar { flex: 1; height: 8px; background: rgba(255, 255, 255, 0.2); border-radius: 4px; overflow: hidden; }
            .wave-fill { height: 100%; border-radius: 4px; transition: width 0.3s ease; }
            .wave-value { width: 35px; font-size: 0.8rem; text-align: right; color: #00BFFF; }
            .performance-metrics { display: flex; flex-direction: column; gap: 5px; }
            .performance-item { display: flex; justify-content: space-between; font-size: 0.9rem; }
            .perf-label { color: #CCC; }
            .perf-value { color: #FFD700; font-weight: bold; }
            .recommendations-card, .controls-card { background: rgba(20, 20, 50, 0.7); padding: 15px; border-radius: 10px; border: 1px solid rgba(0, 191, 255, 0.3); margin-bottom: 15px; }
            .recommendations-list { max-height: 60px; overflow-y: auto; }
            .recommendation-item { background: rgba(255, 215, 0, 0.1); padding: 5px 8px; margin: 2px 0; border-radius: 5px; font-size: 0.8rem; border-left: 3px solid #FFD700; }
            .control-buttons { display: flex; gap: 10px; flex-wrap: wrap; }
            .control-btn { flex: 1; padding: 8px 12px; background: linear-gradient(45deg, #8A2BE2, #00BFFF); color: white; border: none; border-radius: 20px; cursor: pointer; font-size: 0.8rem; transition: all 0.3s ease; }
            .control-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(138, 43, 226, 0.4); }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    setupEventListeners() {
        document.getElementById('reset-adaptations').addEventListener('click', () => {
            this.neuroAdaptiveEngine.reset();
            console.log('🔄 Adaptations Reset');
        });
        document.getElementById('toggle-eeg').addEventListener('click', (e) => {
            const modes = ['dynamic', 'focused', 'relaxed', 'stressed'];
            const current = e.target.dataset.mode || 'dynamic';
            const idx = modes.indexOf(current);
            const next = modes[(idx + 1) % modes.length];
            e.target.dataset.mode = next;
            e.target.textContent = `EEG: ${next.charAt(0).toUpperCase() + next.slice(1)}`;
            if (typeof window.setEEGMode === 'function') {
                window.setEEGMode(next);
            }
        });
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportNeuroData();
        });
    }

    subscribeToGameState() {
        if (typeof window.eventBus !== 'undefined') {
            window.eventBus.subscribe('gameStateUpdate', (state) => {
                this.tanglerCount = state.tanglerCount || 0;
                this.updateTanglerCount();
            });
        }
    }

    updateTanglerCount() {
        const tanglerCountElement = document.getElementById('tangler-count');
        if (tanglerCountElement) {
            tanglerCountElement.textContent = this.tanglerCount;
        }
    }

    startUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateDashboard();
        }, 1000);
    }

    updateDashboard() {
        const emotionalState = this.emotionalDirector.currentEmotionalState;
        if (emotionalState) {
            document.getElementById('emotional-state').textContent = emotionalState.emotionalState.charAt(0).toUpperCase() + emotionalState.emotionalState.slice(1);
            document.getElementById('emotional-intensity').style.width = `${emotionalState.intensity * 100}%`;
            document.getElementById('emotional-confidence').textContent = `Confidence: ${Math.round(emotionalState.confidence * 100)}%`;
        }
        const adaptations = Array.from(this.neuroAdaptiveEngine.currentAdaptations.entries());
        const adaptationsList = document.getElementById('adaptations-list');
        if (adaptations.length > 0) {
            adaptationsList.innerHTML = adaptations.map(([key, value]) => `<div class="adaptation-item">${key}: ${value}</div>`).join('');
        } else {
            adaptationsList.innerHTML = '<div class="adaptation-item">No active adaptations</div>';
        }
        const performance = this.neuroAdaptiveEngine.getPerformanceReport();
        document.getElementById('focus-wave').style.width = `${performance.engagementScore * 100}%`;
        document.getElementById('focus-value').textContent = `${Math.round(performance.engagementScore * 100)}%`;
        document.getElementById('calm-wave').style.width = `${performance.successRate * 100}%`;
        document.getElementById('calm-value').textContent = `${Math.round(performance.successRate * 100)}%`;
        document.getElementById('success-rate').textContent = `${Math.round(performance.successRate * 100)}%`;
        document.getElementById('engagement-score').textContent = `${Math.round(performance.engagementScore * 100)}%`;
        document.getElementById('total-adaptations').textContent = performance.adaptationTotal;
        this.updateTanglerCount(); // Update tangler count as well
        const recommendations = emotionalState?.recommendations || ['Continue playing for neuro-analysis'];
        const recommendationsList = document.getElementById('recommendations-list');
        recommendationsList.innerHTML = recommendations.map(rec => `<div class="recommendation-item">${rec}</div>`).join('');
    }

    exportNeuroData() {
        const data = { emotionalHistory: this.emotionalDirector.playerEmotionalHistory, adaptationHistory: this.neuroAdaptiveEngine.adaptationHistory, performance: this.neuroAdaptiveEngine.getPerformanceReport(), exportTime: new Date().toISOString() };
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `neuro-data-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
        console.log('💾 Neuro Data Exported');
    }

    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.dashboardElement) {
            this.dashboardElement.remove();
        }
    }
}
