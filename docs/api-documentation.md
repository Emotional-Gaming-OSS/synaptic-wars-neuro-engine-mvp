# Synaptic Wars API Documentation

## Overview
The Synaptic Wars application uses a modular architecture with well-defined interfaces between components. This document details the public APIs of each module, event system, and configuration options.

## Module APIs

### Game Module API (`core/game.js`)
The Game module serves as the main orchestrator of the application.

#### Class: Game

**Constructor**
Initializes the game state and sets up basic parameters.

**Properties:**
- `gameState`: Object containing the current game state
- `tanglers`: Reference to NeuroEnhancedTanglers instance
- `abilities`: Reference to AdaptiveAbilities instance
- `neuroAdaptiveEngine`: Reference to NeuroAdaptiveEngine instance
- `emotionalDirector`: Reference to EmotionalDirector instance

**Methods:**
- `initializeNeuroEngine()`: Promise - Sets up all neuro-engine components
- `start()`: void - Starts the game
- `update(deltaTime: number)`: void - Updates game state each frame
- `useAbility(abilityName: string)`: void - Activates a player ability
- `getTanglerData()`: Array - Returns tangler data for rendering
- `setEEGMode(mode: string)`: void - Changes EEG simulation mode
- `destroy()`: void - Cleans up the game instance

### Renderer Module API (`core/renderer.js`)
Handles visual rendering of the game state.

#### Class: Renderer

**Constructor(canvas)**
- `canvas`: HTMLCanvasElement - The canvas to render to

**Methods:**
- `draw(gameState: Object, tanglers: Array)`: void - Renders the current game state

### Event Bus Module API (`core/event-bus.js`)
Centralized event system for component communication.

#### Class: EventBus

**Methods:**
- `subscribe(event: string, callback: Function)`: void - Subscribe to an event
- `publish(event: string, data: any)`: void - Publish an event with data

### Input Handler Module API (`core/input-handler.js`)
Manages keyboard input.

#### Class: InputHandler

**Methods:**
- `isKeyPressed(keyCode: string)`: boolean - Check if a key is currently pressed

### EEG Simulator Module API (`neuro-engine/eeg-simulator.js`)
Simulates EEG data streams.

#### Class: EEGSimulator

**Methods:**
- `connect()`: boolean - Connects the simulator
- `disconnect()`: void - Disconnects the simulator
- `setSimulationMode(mode: string)`: boolean - Sets the simulation mode
- `getCurrentData()`: Object - Returns current EEG data
- `setDataUpdateHandler(callback: Function)`: void - Sets the data update callback

### Emotional Director Module API (`neuro-engine/emotional-director.js`)
Processes emotional states and generates adaptations.

#### Class: EmotionalDirector

**Constructor(neuroBridge)**
- `neuroBridge`: NeuroBridge instance for emotional analysis

**Methods:**
- `processPlayerState(eegData: Object, gameState: Object)`: Promise<Object> - Process emotional state
- `getEmotionalTrend()`: string - Returns emotional trend

### Neuro Adaptive Engine Module API (`neuro-engine/neuro-adaptive-engine.js`)
Applies gameplay adaptations based on emotional analysis.

#### Class: NeuroAdaptiveEngine

**Constructor(emotionalDirector)**
- `emotionalDirector`: EmotionalDirector instance

**Methods:**
- `applyAdaptations(gameState: Object, eegData: Object)`: Promise<Object> - Apply adaptations to game state
- `getPerformanceReport()`: Object - Get adaptation performance metrics
- `reset()`: void - Reset adaptation history

### Neuro-Enhanced Tanglers Module API (`gameplay/neuro-enhanced-tanglers.js`)
Manages enemy entities with adaptive behavior.

#### Class: NeuroEnhancedTanglers

**Constructor(neuroAdaptiveEngine)**
- `neuroAdaptiveEngine`: NeuroAdaptiveEngine instance

**Methods:**
- `spawnTangler(position: Object)`: string - Spawn a new tangler
- `updateTanglers(deltaTime: number, playerPosition: Object)`: number - Update all tanglers
- `applyDamage(tanglerId: string, damage: number)`: boolean - Apply damage to a tangler
- `getTanglerCount()`: number - Get the number of active tanglers
- `getTanglerData()`: Array - Get data for all tanglers
- `activateEntanglement(duration: number)`: void - Activate quantum entanglement effect
- `applyCalm(seconds: number)`: void - Apply calming effect to tanglers
- `updateAdaptationSettings(adaptations: Object)`: void - Update adaptation settings

### Adaptive Abilities Module API (`gameplay/adaptive-abilities.js`)
Manages player abilities with adaptive properties.

#### Class: AdaptiveAbilities

**Constructor(neuroAdaptiveEngine)**
- `neuroAdaptiveEngine`: NeuroAdaptiveEngine instance

**Methods:**
- `updateAbilities(deltaTime: number)`: void - Update ability states
- `activateAbility(abilityName: string, playerEnergy: number)`: Object - Activate an ability
- `getAbilityInfo(abilityName: string)`: Object - Get information about an ability
- `getAllAbilitiesInfo()`: Object - Get information about all abilities
- `resetCooldowns()`: void - Reset all ability cooldowns
- `getCooldownMultiplier()`: number - Get current cooldown multiplier
- `getEffectivenessMultiplier()`: number - Get current effectiveness multiplier

## Event System API

The application uses a centralized event bus for communication between modules.

### Events Published by Game Module:
- `startGame`: Triggered when the game starts
- `useAbility`: Triggered when an ability is used (data: ability name)
- `setEEGMode`: Triggered when EEG mode is changed (data: mode)
- `gameStarted`: Triggered after the game starts successfully
- `gameStateUpdate`: Triggered with updated game state (data: full game state)

### Events Published by Input Handler:
- `keydown`: Triggered when a key is pressed down (data: key code)
- `keyup`: Triggered when a key is released (data: key code)

### Events Used by UI Components:
- `gameStateUpdate`: To update UI elements based on game state
- `useAbility`: To trigger ability use via UI
- `setEEGMode`: To change EEG mode via UI

## Configuration API (`config.js`)

The application uses a centralized configuration file with the following structure:

```javascript
export const config = {
    player: {
        moveSpeed: Number,        // Player movement speed
        initialEnergy: Number,    // Starting energy value
        maxEnergy: Number,        // Maximum energy value
        energyRecoveryRate: Number // Energy recovery per second
    },
    game: {
        baseSpawnInterval: Number, // Base interval between tangler spawns (seconds)
        minTanglerCount: Number   // Minimum number of tanglers to maintain
    },
    abilities: {
        // Each ability has these properties:
        [abilityName]: {
            name: String,            // Display name
            baseCooldown: Number,    // Base cooldown in seconds
            baseCost: Number,        // Base energy cost
            baseDamage?: Number,     // Base damage (if applicable)
            baseHealing?: Number,    // Base healing (if applicable)
            baseDuration?: Number,   // Base duration (if applicable)
            description: String      // Ability description
        }
    },
    tangler: {
        baseHealth: Number,                    // Base health for tanglers
        scoreValue: Number,                    // Points awarded for elimination
        baseMoveSpeed: Number,                 // Base movement speed
        erraticThreshold: Number,              // Health % below which behavior becomes erratic
        erraticSpeedMultiplier: Number,        // Speed multiplier when erratic
        entanglement: {
            splashDamageMultiplier: Number,    // Damage multiplier for entanglement splash
            splashSpeedMultiplier: Number      // Speed multiplier for splashed tanglers
        }
    }
};
```

## UI Integration API

The UI layer communicates with the game through the global event bus and DOM elements:

### DOM Elements Expected:
- `#game-canvas`: HTMLCanvasElement for game rendering
- `#loadingScreen`: Loading screen container
- `#beginBtn`: Button to start the game
- `#statusBar`: Container for status information
- `#playerEnergy`: Element displaying player energy
- `#gameScore`: Element displaying game score
- `#btn-q`, `#btn-w`, `#btn-e`: Ability buttons

### UI Update Process:
The UI listens for `gameStateUpdate` events and updates the relevant DOM elements accordingly:
- Player energy display
- Game score display
- Ability button states (enabled/disabled, cooldown timers)
- Ability button text (with cooldown information)

## Neuro-Dashboard Enhanced API

While not fully detailed in the provided code, the Neuro-Dashboard Enhanced component is referenced in the main application and connects to the neuro-adaptive engine to display:
- Emotional state information
- Active adaptations
- Performance metrics
- EEG mode controls
- Data export functionality

## Error Handling API

### Error Handling Approach
- Each module implements internal error handling with fallback mechanisms
- Asynchronous operations include try/catch blocks
- Error messages are logged to the console
- Fallback states are provided when primary processing fails

### Fallback Mechanisms
- Game module: Provides fallback analysis when neuro-adaptation fails
- Emotional Director: Returns default emotional state on processing errors
- Neuro Adaptive Engine: Provides fallback adaptations on errors
- Renderer: Checks for valid canvas/context before drawing

## Module Dependencies

Each module explicitly imports its dependencies using ES6 import statements:
- Core modules: Import configuration and other core modules
- Neuro-engine: Import configuration and neuro-bridge
- Gameplay: Import configuration and neuro-adaptive engine
- UI: Import neuro-dashboard components

## Performance Considerations

### Rendering Performance
- Rendering occurs on each animation frame
- Efficient canvas drawing operations
- Health bars are drawn for each tangler

### Game Loop Performance
- Game update occurs on each animation frame
- Efficient processing of tangler updates
- Cooldown management for player abilities
- Emotional state processing every second

### Memory Management
- Limited history storage for emotional and adaptation states
- Proper cleanup when components are destroyed
- Efficient data structure usage (Maps and Sets)

## Extensibility Points

### Adding New Abilities
1. Add ability configuration to `config.js`
2. Implement ability logic in `AdaptiveAbilities` module if needed
3. Update UI to include new ability controls

### Adding New Enemy Types
1. Extend or create new class based on tangler structure
2. Implement new behavior patterns
3. Integrate with neuro-adaptation system

### Adding New Adaptation Strategies
1. Extend `EmotionalDirector` with new strategies
2. Update `NeuroAdaptiveEngine` to handle new adaptations
3. Implement effects in relevant gameplay modules