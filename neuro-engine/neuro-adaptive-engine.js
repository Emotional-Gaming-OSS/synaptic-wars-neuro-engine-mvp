export class NeuroAdaptiveEngine {
    constructor(emotionalDirector) {
        this.emotionalDirector = emotionalDirector;
        this.adaptationHistory = [];
        this.currentAdaptations = new Map();
        this.performanceMetrics = { adaptationSuccess: 0, adaptationTotal: 0, playerRetention: 0, engagementScore: 0 };
    }

    async applyAdaptations(gameState, eegData) {
        try {
            const emotionalAnalysis = await this.emotionalDirector.processPlayerState(eegData, gameState);
            const adaptedGameState = this.adaptGameState(gameState, emotionalAnalysis.adaptations);
            this.trackAdaptationPerformance(emotionalAnalysis, gameState);
            this.adaptationHistory.push({ emotionalState: emotionalAnalysis.emotionalState, adaptations: emotionalAnalysis.adaptations, originalGameState: { ...gameState }, adaptedGameState: { ...adaptedGameState }, timestamp: Date.now() });
            if (this.adaptationHistory.length > 50) {
                this.adaptationHistory = this.adaptationHistory.slice(-50);
            }
            this.currentAdaptations = new Map(Object.entries(emotionalAnalysis.adaptations.gameplay));
            return { adaptedGameState, emotionalAnalysis, success: true };
        } catch (error) {
            console.error('NeuroAdaptiveEngine Error:', error);
            return { adaptedGameState: gameState, emotionalAnalysis: this.getFallbackAnalysis(), success: false };
        }
    }

    adaptGameState(gameState, adaptations) {
        const adaptedState = { ...gameState };
        if (adaptations.gameplay.difficultyIncrease) {
            adaptedState.difficultyMultiplier = (gameState.difficultyMultiplier || 1.0) + adaptations.gameplay.difficultyIncrease;
        }
        if (adaptations.gameplay.difficultyReduction) {
            adaptedState.difficultyMultiplier = Math.max(0.3, (gameState.difficultyMultiplier || 1.0) - adaptations.gameplay.difficultyReduction);
        }
        if (adaptations.gameplay.abilityCooldowns === 'reduced') {
            adaptedState.abilityCooldownMultiplier = 0.7;
        } else if (adaptations.gameplay.abilityCooldowns === 'increased') {
            adaptedState.abilityCooldownMultiplier = 1.3;
        }
        if (adaptations.gameplay.rewardMultiplier) {
            adaptedState.rewardMultiplier = adaptations.gameplay.rewardMultiplier;
        }
        if (adaptations.gameplay.spawnHealth) {
            adaptedState.shouldSpawnHealth = true;
        }
        if (adaptations.gameplay.pacingIncrease) {
            adaptedState.spawnRateMultiplier = (gameState.spawnRateMultiplier || 1.0) + adaptations.gameplay.pacingIncrease;
        }
        return adaptedState;
    }

    trackAdaptationPerformance(emotionalAnalysis) {
        this.performanceMetrics.adaptationTotal++;
        if (emotionalAnalysis.confidence > 0.6) {
            this.performanceMetrics.adaptationSuccess++;
        }
        this.performanceMetrics.successRate = this.performanceMetrics.adaptationSuccess / this.performanceMetrics.adaptationTotal;
        const recentStates = this.adaptationHistory.slice(-10);
        const uniqueStates = new Set(recentStates.map(a => a.emotionalState.emotionalState));
        const averageIntensity = recentStates.length ? recentStates.reduce((sum, a) => sum + a.emotionalState.intensity, 0) / recentStates.length : 0;
        this.performanceMetrics.engagementScore = (averageIntensity + (uniqueStates.size / 10)) / 2;
    }

    getPerformanceReport() {
        return { ...this.performanceMetrics, currentAdaptations: Object.fromEntries(this.currentAdaptations), adaptationHistoryCount: this.adaptationHistory.length, emotionalTrend: this.emotionalDirector.getEmotionalTrend() };
    }

    getFallbackAnalysis() {
        return { emotionalState: { emotionalState: 'neutral', intensity: 0.5 }, adaptations: { gameplay: {}, narrative: 'Fallback mode' }, recommendations: ['System recovering'], confidence: 0.3 };
    }

    reset() {
        this.adaptationHistory = [];
        this.currentAdaptations.clear();
        this.performanceMetrics = { adaptationSuccess: 0, adaptationTotal: 0, playerRetention: 0, engagementScore: 0 };
    }
}