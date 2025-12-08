# Game Module Documentation

## Overview
The Game module serves as the central orchestrator of the Synaptic Wars application. It manages the main game loop, coordinates with the neuro-engine, handles player input, processes game state updates, and manages tangler spawning.

## Class: Game

### Constructor
Initializes the game state and sets up the basic game parameters.

**Properties:**
- `gameState`: Object containing current game state
  - `score`: Current player score
  - `level`: Current game level (default: 1)
  - `playerEnergy`: Current player energy
  - `maxEnergy`: Maximum player energy
  - `playerPosition`: Object with x, y, z coordinates of player
  - `difficultyMultiplier`: Multiplier affecting enemy difficulty
  - `spawnRateMultiplier`: Multiplier affecting enemy spawn rate
  - `rewardMultiplier`: Multiplier affecting score rewards
  - `gameActive`: Boolean indicating if the game is active
- `spawnTimer`: Timer for enemy spawning
- `neuroBridge`: Instance of NeuroBridge for emotional analysis
- `emotionalDirector`: Instance of EmotionalDirector for emotional state processing
- `neuroAdaptiveEngine`: Instance of NeuroAdaptiveEngine for game adaptations
- `eegSimulator`: Instance of EEGSimulator for EEG data simulation
- `tanglers`: Instance of NeuroEnhancedTanglers for enemy management
- `abilities`: Instance of AdaptiveAbilities for player abilities

### Methods

#### initializeNeuroEngine()
Asynchronously initializes all neuro-engine components and sets up event subscriptions.

**Returns:** Promise

**Side Effects:**
- Creates instances of all neuro-engine components
- Connects EEG simulator
- Subscribes to game events (startGame, useAbility, setEEGMode)

#### start()
Starts the game if it's not already active. Spawns initial tanglers.

**Side Effects:**
- Sets gameActive flag to true
- Spawns initial tanglers
- Publishes 'gameStarted' event

#### update(deltaTime)
Updates the game state for each frame.

**Parameters:**
- `deltaTime`: Time elapsed since last update in seconds

**Side Effects:**
- Updates player position based on input
- Updates abilities cooldowns
- Updates tangler positions and states
- Handles tangler spawning
- Recovers player energy
- Publishes game state updates

#### handlePlayerMovement(deltaTime)
Processes player movement based on keyboard input (WASD keys).

**Parameters:**
- `deltaTime`: Time elapsed since last update in seconds

#### handleTanglerSpawning(deltaTime, currentTanglerCount)
Manages tangler spawning based on game parameters.

**Parameters:**
- `deltaTime`: Time elapsed since last update in seconds
- `currentTanglerCount`: Number of currently active tanglers

#### recoverEnergy(deltaTime)
Recovers player energy over time.

**Parameters:**
- `deltaTime`: Time elapsed since last update in seconds

#### handleEEGUpdate(eegData)
Processes EEG data from the simulator and applies neuro-adaptations.

**Parameters:**
- `eegData`: Object containing EEG data from simulator

**Side Effects:**
- Updates game state based on emotional analysis
- Updates tangler adaptation settings
- Logs high-intensity emotional states to console

#### useAbility(abilityName)
Activates a player ability if possible.

**Parameters:**
- `abilityName`: Name of the ability to use

**Returns:**
- Object with success status and additional information

**Side Effects:**
- Updates player energy
- Applies ability effects to tanglers
- Updates game score if tanglers are eliminated

#### getTanglerData()
Retrieves tangler data for rendering.

**Returns:**
- Array of tangler objects

#### setEEGMode(mode)
Changes the EEG simulation mode.

**Parameters:**
- `mode`: New EEG mode (e.g., 'focused', 'relaxed', 'stressed', 'dynamic')

#### publishGameState()
Publishes the current game state to the event bus.

**Side Effects:**
- Publishes 'gameStateUpdate' event with full game state

#### destroy()
Cleans up the game instance.

**Side Effects:**
- Sets gameActive flag to false
- Disconnects EEG simulator

## Event Subscriptions

The Game module subscribes to the following events:
- `startGame`: Triggers the start() method
- `useAbility`: Triggers the useAbility() method with the ability name
- `setEEGMode`: Triggers the setEEGMode() method with the mode

## Dependencies

- `config.js`: Game configuration values
- `event-bus.js`: Global event system
- `input-handler.js`: Player input management
- `neuro-engine/neuro-bridge.js`: Emotional analysis
- `neuro-engine/emotional-director.js`: Emotional state processing
- `neuro-engine/neuro-adaptive-engine.js`: Game adaptation engine
- `neuro-engine/eeg-simulator.js`: EEG data simulation
- `gameplay/neuro-enhanced-tanglers.js`: Enemy management
- `gameplay/adaptive-abilities.js`: Player abilities