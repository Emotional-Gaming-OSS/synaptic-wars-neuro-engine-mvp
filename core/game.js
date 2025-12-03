import { config } from '../config.js';
import { eventBus } from './event-bus.js';
import { inputHandler } from './input-handler.js';
import { NeuroBridge } from '../neuro-engine/neuro-bridge.js';
import { EmotionalDirector } from '../neuro-engine/emotional-director.js';
import { NeuroAdaptiveEngine } from '../neuro-engine/neuro-adaptive-engine.js';
import { EEGSimulator } from '../neuro-engine/eeg-simulator.js';
import { NeuroEnhancedTanglers } from '../gameplay/neuro-enhanced-tanglers.js';
import { AdaptiveAbilities } from '../gameplay/adaptive-abilities.js';

class Game {
    constructor() {
        this.gameState = { 
            score: 0, 
            level: 1, 
            playerEnergy: config.player.initialEnergy, 
            maxEnergy: config.player.maxEnergy, 
            playerPosition: { x: 0, y: 0, z: 0 }, 
            difficultyMultiplier: 1.0, 
            spawnRateMultiplier: 1.0, 
            rewardMultiplier: 1.0, 
            gameActive: false 
        };
        this.spawnTimer = 0;
        this.initializeNeuroEngine();
    }

    async initializeNeuroEngine() {
        try {
            this.neuroBridge = new NeuroBridge();
            await this.neuroBridge.initialize();
            this.emotionalDirector = new EmotionalDirector(this.neuroBridge);
            this.neuroAdaptiveEngine = new NeuroAdaptiveEngine(this.emotionalDirector);
            this.eegSimulator = new EEGSimulator();
            this.tanglers = new NeuroEnhancedTanglers(this.neuroAdaptiveEngine);
            this.abilities = new AdaptiveAbilities(this.neuroAdaptiveEngine);
            
            this.eegSimulator.connect();
            this.eegSimulator.setDataUpdateHandler((eegData) => this.handleEEGUpdate(eegData));
            
            eventBus.subscribe('startGame', () => this.start());
            eventBus.subscribe('useAbility', (abilityName) => this.useAbility(abilityName));
            eventBus.subscribe('setEEGMode', (mode) => this.setEEGMode(mode));

            console.log('✅ Game and Neuro Engine Initialized!');
        } catch (error) {
            console.error('❌ Game Initialization Failed:', error);
        }
    }

    start() {
        if (this.gameState.gameActive) return;
        this.gameState.gameActive = true;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.tanglers.spawnTangler(), i * 1000);
        }
        console.log('🎮 Game Started with Neuro-Adaptive AI!');
        eventBus.publish('gameStarted');
    }

    update(deltaTime) {
        if (!this.gameState.gameActive) return;

        this.handlePlayerMovement(deltaTime);
        this.abilities.updateAbilities(deltaTime);
        
        const tanglerCount = this.tanglers.updateTanglers(deltaTime, this.gameState.playerPosition);
        this.handleTanglerSpawning(deltaTime, tanglerCount);

        this.recoverEnergy(deltaTime);
        this.publishGameState();
    }
    
    handlePlayerMovement(deltaTime) {
        const speed = config.player.moveSpeed;
        if (inputHandler.isKeyPressed('KeyW')) this.gameState.playerPosition.y -= speed * deltaTime;
        if (inputHandler.isKeyPressed('KeyS')) this.gameState.playerPosition.y += speed * deltaTime;
        if (inputHandler.isKeyPressed('KeyA')) this.gameState.playerPosition.x -= speed * deltaTime;
        if (inputHandler.isKeyPressed('KeyD')) this.gameState.playerPosition.x += speed * deltaTime;
    }

    handleTanglerSpawning(deltaTime, currentTanglerCount) {
        const rate = Math.max(0.5, config.game.baseSpawnInterval / (this.gameState.spawnRateMultiplier || 1.0));
        this.spawnTimer += deltaTime;
        if (this.spawnTimer >= rate) {
            this.tanglers.spawnTangler();
            this.spawnTimer = 0;
        }
        if (currentTanglerCount < config.game.minTanglerCount) {
            this.tanglers.spawnTangler();
        }
    }

    recoverEnergy(deltaTime) {
        this.gameState.playerEnergy = Math.min(
            this.gameState.maxEnergy, 
            this.gameState.playerEnergy + (config.player.energyRecoveryRate * deltaTime)
        );
    }
    
    async handleEEGUpdate(eegData) {
        if (!this.gameState.gameActive) return;
        try {
            const result = await this.neuroAdaptiveEngine.applyAdaptations(this.gameState, eegData);
            if (result.success) {
                this.gameState = { ...this.gameState, ...result.adaptedGameState };
                this.tanglers.updateAdaptationSettings(result.adaptations);
                
                const emotionalState = result.emotionalAnalysis.emotionalState;
                if (emotionalState.intensity > 0.7) {
                    console.log(`🎭 High Intensity: ${emotionalState.emotionalState} (${Math.round(emotionalState.intensity * 100)}%)`);
                }
            }
        } catch (error) {
            console.error('EEG Processing Error:', error);
        }
    }

    useAbility(abilityName) {
        const result = this.abilities.activateAbility(abilityName, this.gameState.playerEnergy);
        if (!result.success) return;

        this.gameState.playerEnergy = result.remainingEnergy;
        const tanglers = this.tanglers.getTanglerData();
        if (tanglers.length === 0) return;

        const randomTangler = tanglers[Math.floor(Math.random() * tanglers.length)];

        switch (abilityName) {
            case 'dendritic_lightning':
                const damage = result.damage || config.abilities.dendritic_lightning.damage;
                if (this.tanglers.applyDamage(randomTangler.id, damage)) {
                    this.gameState.score += Math.round(config.tangler.scoreValue * (this.gameState.rewardMultiplier || 1.0));
                }
                break;
            case 'serotonin_tsunami':
                const healing = result.healing || config.abilities.serotonin_tsunami.healing;
                this.gameState.playerEnergy = Math.min(this.gameState.maxEnergy, this.gameState.playerEnergy + healing);
                this.tanglers.applyCalm(config.abilities.serotonin_tsunami.calmDuration);
                break;
            case 'quantum_entanglement':
                const duration = result.duration || config.abilities.quantum_entanglement.duration;
                this.tanglers.activateEntanglement(duration);
                break;
        }
        console.log(`⚡ ${abilityName} used successfully!`);
    }

    getTanglerData() {
        return this.tanglers.getTanglerData();
    }
    
    setEEGMode(mode) {
        this.eegSimulator.setSimulationMode(mode);
    }

    publishGameState() {
        const fullState = {
            ...this.gameState,
            tanglerCount: this.tanglers.getTanglerCount(),
            abilities: this.abilities.getAllAbilitiesInfo(),
            emotionalState: this.emotionalDirector.currentEmotionalState,
            performance: this.neuroAdaptiveEngine.getPerformanceReport()
        };
        eventBus.publish('gameStateUpdate', fullState);
    }

    destroy() {
        this.gameState.gameActive = false;
        if (this.eegSimulator) this.eegSimulator.disconnect();
    }
}

export { Game };
