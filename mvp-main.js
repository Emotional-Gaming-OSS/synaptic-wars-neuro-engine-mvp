import { Game } from './core/game.js';
import { Renderer } from './core/renderer.js';
import { eventBus } from './core/event-bus.js';
import { NeuroDashboardEnhanced } from './ui/neuro-dashboard-enhanced.js';
import { inputHandler } from './core/input-handler.js'; // Although not directly used here, its initialization is important.

class App {
    constructor() {
        console.log('🚀 Initializing Synaptic Wars MVP - Refactored Edition');
        this.canvas = document.getElementById('game-canvas');
        this.game = new Game();
        this.renderer = new Renderer(this.canvas);
        this.dashboard = null;
        this.setup();
    }

    async setup() {
        // The game class now handles its own async initialization
        await this.game.initializeNeuroEngine(); 
        
        // Dashboard needs the neuro-engine instances from the game
        this.dashboard = new NeuroDashboardEnhanced(this.game.neuroAdaptiveEngine, this.game.emotionalDirector);

        this.setupGameLoop();
    }

    setupGameLoop() {
        let lastTime = 0;
        const gameLoop = (currentTime) => {
            const deltaTime = (currentTime - lastTime) / 1000 || 0;
            lastTime = currentTime;
            
            this.game.update(deltaTime);
            this.renderer.draw(this.game.gameState, this.game.getTanglerData());
            
            requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
    }
}

// Start the application once the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const app = new App();

    // Make the event bus globally accessible for UI interactions
    window.eventBus = eventBus;
});
