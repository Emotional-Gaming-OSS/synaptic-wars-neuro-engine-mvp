export class EmotionalDirector {
    constructor(neuroBridge) {
        this.neuroBridge = neuroBridge;
        this.playerEmotionalHistory = [];
        this.adaptationStrategies = new Map();
        this.currentEmotionalState = null;
        this.initializeStrategies();
    }

    initializeStrategies() {
        this.adaptationStrategies.set('focused', { tauTanglerBehavior: 'more_aggressive', abilityCooldowns: 'reduced', environment: 'more_challenging', narrative: 'challenge_accepted' });
        this.adaptationStrategies.set('frustrated', { tauTanglerBehavior: 'less_aggressive', abilityCooldowns: 'reduced', environment: 'supportive', narrative: 'encouraging', spawnHealth: true });
        this.adaptationStrategies.set('calm', { tauTanglerBehavior: 'strategic', abilityCooldowns: 'normal', environment: 'engaging', narrative: 'immersive' });
        this.adaptationStrategies.set('excited', { tauTanglerBehavior: 'unpredictable', abilityCooldowns: 'variable', environment: 'dynamic', narrative: 'thrilling' });
        this.adaptationStrategies.set('neutral', { tauTanglerBehavior: 'strategic', abilityCooldowns: 'normal', environment: 'engaging', narrative: 'balanced' });
    }

    async processPlayerState(eegData, gameState) {
        try {
            const emotionalAnalysis = await this.neuroBridge.processEmotionalState(eegData, gameState);
            this.playerEmotionalHistory.push({ ...emotionalAnalysis, gameState: { ...gameState }, timestamp: Date.now() });
            if (this.playerEmotionalHistory.length > 100) {
                this.playerEmotionalHistory = this.playerEmotionalHistory.slice(-100);
            }
            this.currentEmotionalState = emotionalAnalysis;
            const adaptations = this.generateAdaptations(emotionalAnalysis, gameState);
            return { emotionalState: emotionalAnalysis, adaptations, recommendations: this.generateRecommendations(emotionalAnalysis), confidence: emotionalAnalysis.confidence };
        } catch (error) {
            console.error('EmotionalDirector Error:', error);
            return this.getFallbackAdaptations();
        }
    }

    generateAdaptations(emotionalState) {
        const strategy = this.adaptationStrategies.get(emotionalState.emotionalState) || this.adaptationStrategies.get('neutral');
        const adaptations = { gameplay: { ...strategy }, narrative: emotionalState.narrativePrompt, intensity: emotionalState.intensity, timestamp: Date.now() };
        switch (emotionalState.emotionalState) {
            case 'frustrated':
                adaptations.gameplay.difficultyReduction = 0.2;
                adaptations.gameplay.healthBoost = true;
                break;
            case 'focused':
                adaptations.gameplay.difficultyIncrease = 0.15;
                adaptations.gameplay.rewardMultiplier = 1.2;
                break;
            case 'calm':
                adaptations.gameplay.pacingIncrease = 0.1;
                adaptations.gameplay.complexityBonus = true;
                break;
        }
        return adaptations;
    }

    generateRecommendations(emotionalState) {
        const recommendations = [];
        switch (emotionalState.emotionalState) {
            case 'frustrated':
                recommendations.push('Consider taking a brief break');
                recommendations.push('Try using defensive abilities more');
                break;
            case 'focused':
                recommendations.push('Perfect state for challenging content');
                recommendations.push('Try aggressive ability combinations');
                break;
            case 'calm':
                recommendations.push('Great for strategic planning');
                recommendations.push('Experiment with different approaches');
                break;
        }
        return recommendations;
    }

    getEmotionalTrend() {
        if (this.playerEmotionalHistory.length < 5) return 'stable';
        const recentStates = this.playerEmotionalHistory.slice(-5);
        const intensities = recentStates.map(state => state.intensity);
        const averageIntensity = intensities.reduce((a, b) => a + b) / intensities.length;
        if (averageIntensity > 0.7) return 'increasing';
        if (averageIntensity < 0.3) return 'decreasing';
        return 'stable';
    }

    getFallbackAdaptations() {
        return { emotionalState: this.getDefaultEmotionalState(), adaptations: { gameplay: this.adaptationStrategies.get('neutral'), narrative: 'Default adaptation mode', intensity: 0.5 }, recommendations: ['System in fallback mode'], confidence: 0.5 };
    }

    getDefaultEmotionalState() {
        return { emotionalState: 'neutral', intensity: 0.5, confidence: 0.5 };
    }
}