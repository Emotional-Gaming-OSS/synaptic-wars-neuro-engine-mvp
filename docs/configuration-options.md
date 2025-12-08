# Configuration Options

## Overview

The Synaptic Wars application uses a centralized configuration system through the `config.js` file. This file defines all the configurable game parameters that affect player experience, gameplay mechanics, and difficulty settings.

## Configuration File Location

The main configuration file is located at:
```
synaptic-wars-mvp/config.js
```

This is a JavaScript module that exports a `config` object with various game parameters.

## Configuration Structure

The configuration object has the following structure:

```javascript
export const config = {
    player: { ... },
    game: { ... },
    abilities: { ... },
    tangler: { ... }
};
```

### Player Configuration (`config.player`)

Controls player-related settings:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `moveSpeed` | Number | 2.5 | Speed at which the player moves |
| `initialEnergy` | Number | 100 | Player's starting energy value |
| `maxEnergy` | Number | 100 | Maximum energy the player can have |
| `energyRecoveryRate` | Number | 10 | Amount of energy recovered per second |

**Example:**
```javascript
player: {
    moveSpeed: 3.0,              // Faster movement speed
    initialEnergy: 100,          // Starting energy
    maxEnergy: 150,              // Higher maximum energy
    energyRecoveryRate: 15       // Faster energy recovery
}
```

### Game Configuration (`config.game`)

Controls general game parameters:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `baseSpawnInterval` | Number | 5 | Base interval in seconds between tangler spawns |
| `minTanglerCount` | Number | 2 | Minimum number of tanglers to maintain in the game |

**Example:**
```javascript
game: {
    baseSpawnInterval: 3,        // Spawn more frequently
    minTanglerCount: 5          // Maintain more tanglers
}
```

### Abilities Configuration (`config.abilities`)

Defines properties for each player ability. Each ability has its own configuration object:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | String | varies | Display name of the ability |
| `baseCooldown` | Number | varies | Base cooldown time in seconds |
| `baseCost` | Number | varies | Base energy cost |
| `baseDamage` | Number | varies | Base damage value (for damage abilities) |
| `baseHealing` | Number | varies | Base healing value (for healing abilities) |
| `baseDuration` | Number | varies | Base duration in seconds (for timed abilities) |
| `description` | String | varies | Description text for the ability |

**Currently defined abilities:**

#### Dendritic Lightning (`config.abilities.dendritic_lightning`)
| Property | Default | Description |
|----------|---------|-------------|
| `name` | 'Dendritic Lightning' | Display name |
| `baseCooldown` | 3.0 | Cooldown time in seconds |
| `baseCost` | 20 | Energy cost |
| `baseDamage` | 50 | Damage dealt |
| `description` | 'Electrifies Tau Tanglers with neural impulses' | Ability description |

#### Serotonin Tsunami (`config.abilities.serotonin_tsunami`)
| Property | Default | Description |
|----------|---------|-------------|
| `name` | 'Serotonin Tsunami' | Display name |
| `baseCooldown` | 5.0 | Cooldown time in seconds |
| `baseCost` | 30 | Energy cost |
| `baseHealing` | 25 | Healing amount |
| `description` | 'Releases healing energy that calms neural environment' | Ability description |

#### Quantum Entanglement (`config.abilities.quantum_entanglement`)
| Property | Default | Description |
|----------|---------|-------------|
| `name` | 'Quantum Entanglement' | Display name |
| `baseCooldown` | 8.0 | Cooldown time in seconds |
| `baseCost` | 40 | Energy cost |
| `baseDuration` | 4.0 | Duration of effect in seconds |
| `description` | 'Creates quantum links between Tau Tanglers' | Ability description |

**Example:**
```javascript
abilities: {
    dendritic_lightning: {
        name: 'Dendritic Lightning',
        baseCooldown: 2.5,      // Shorter cooldown
        baseCost: 15,           // Lower energy cost
        baseDamage: 60,         // Higher damage
        description: 'Electrifies Tau Tanglers with neural impulses'
    },
    serotonin_tsunami: {
        name: 'Serotonin Tsunami',
        baseCooldown: 4.0,      // Shorter cooldown
        baseCost: 25,           // Lower energy cost
        baseHealing: 35,        // More healing
        description: 'Releases healing energy that calms neural environment'
    },
    quantum_entanglement: {
        name: 'Quantum Entanglement',
        baseCooldown: 7.0,      // Shorter cooldown
        baseCost: 35,           // Lower energy cost
        baseDuration: 5.0,      // Longer duration
        description: 'Creates quantum links between Tau Tanglers'
    }
}
```

### Tangler Configuration (`config.tangler`)

Controls properties of enemy tanglers:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `baseHealth` | Number | 100 | Base health of tanglers |
| `scoreValue` | Number | 10 | Points awarded for eliminating a tangler |
| `baseMoveSpeed` | Number | 0.01 | Base movement speed of tanglers |
| `erraticThreshold` | Number | 0.3 | Health percentage below which behavior becomes erratic |
| `erraticSpeedMultiplier` | Number | 1.5 | Speed multiplier when tangler is in erratic state |

#### Tangler Entanglement Configuration (`config.tangler.entanglement`)

Controls special quantum entanglement effects:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `splashDamageMultiplier` | Number | 0.5 | Multiplier for splash damage from entanglement |
| `splashSpeedMultiplier` | Number | 1.2 | Speed multiplier applied to tanglers hit by splash |

**Example:**
```javascript
tangler: {
    baseHealth: 120,                    // Tougher tanglers
    scoreValue: 15,                     // More points per elimination
    baseMoveSpeed: 0.015,               // Faster tanglers
    erraticThreshold: 0.4,              // Become erratic at higher health
    erraticSpeedMultiplier: 1.8,        // Much faster when erratic
    entanglement: {
        splashDamageMultiplier: 0.7,    // More splash damage
        splashSpeedMultiplier: 1.5      // Higher speed boost from splash
    }
}
```

## Modifying Configuration

### Direct File Modification
1. Open `config.js` in a text editor
2. Modify the values as needed
3. Save the file
4. Reload the game in your browser

### Example Configuration Changes

#### Making the Game Easier
```javascript
export const config = {
    player: {
        moveSpeed: 3.0,
        initialEnergy: 150,            // More starting energy
        maxEnergy: 150,                // Higher max energy
        energyRecoveryRate: 20         // Faster energy recovery
    },
    game: {
        baseSpawnInterval: 8,          // Spawn less frequently
        minTanglerCount: 1             // Fewer tanglers at minimum
    },
    abilities: {
        // All abilities have reduced cost and cooldown
        dendritic_lightning: {
            name: 'Dendritic Lightning',
            baseCooldown: 2.0,         // Shorter cooldown
            baseCost: 10,              // Lower cost
            baseDamage: 50,
            description: 'Electrifies Tau Tanglers with neural impulses'
        },
        // ... other abilities with similar adjustments
    },
    tangler: {
        baseHealth: 70,                // Weaker tanglers
        scoreValue: 10,
        baseMoveSpeed: 0.005,          // Slower tanglers
        erraticThreshold: 0.2,         // Erratic at lower health
        erraticSpeedMultiplier: 1.2,   // Less speed boost when erratic
        entanglement: {
            splashDamageMultiplier: 0.3,  // Less splash damage
            splashSpeedMultiplier: 1.0    // No speed boost from splash
        }
    }
};
```

#### Making the Game Harder
```javascript
export const config = {
    player: {
        moveSpeed: 2.0,               // Slower movement
        initialEnergy: 75,            // Less starting energy
        maxEnergy: 75,                // Lower max energy
        energyRecoveryRate: 5         // Slower energy recovery
    },
    game: {
        baseSpawnInterval: 3,         // Spawn more frequently
        minTanglerCount: 4            // Maintain more tanglers
    },
    abilities: {
        // All abilities have increased cost and cooldown
        dendritic_lightning: {
            name: 'Dendritic Lightning',
            baseCooldown: 4.0,        // Longer cooldown
            baseCost: 30,             // Higher cost
            baseDamage: 50,
            description: 'Electrifies Tau Tanglers with neural impulses'
        },
        // ... other abilities with similar adjustments
    },
    tangler: {
        baseHealth: 150,              // Tougher tanglers
        scoreValue: 10,
        baseMoveSpeed: 0.02,          // Faster tanglers
        erraticThreshold: 0.5,        // Erratic at higher health
        erraticSpeedMultiplier: 2.0,  // Much faster when erratic
        entanglement: {
            splashDamageMultiplier: 0.8,  // More splash damage
            splashSpeedMultiplier: 1.5    // Higher speed boost from splash
        }
    }
};
```

## Impact of Configuration on Neuro-Adaptive System

The configuration values interact with the neuro-adaptive system:

1. **Base Values**: Configuration provides base values that are then modified by the neuro-adaptive engine based on emotional state
2. **Adaptation Multipliers**: The neuro-adaptive engine applies multipliers to these base values based on the player's emotional state
3. **Difficulty Scaling**: Changes to these values will affect the baseline difficulty, which the adaptation system then modifies based on emotional state

## Best Practices for Configuration

### Balancing Game Elements
- Consider the relationship between player abilities and tangler strength
- Balance energy costs with energy recovery rate
- Ensure spawn rates match player ability to handle tanglers

### Testing Configuration Changes
1. Test changes with different EEG simulation modes
2. Verify that the neuro-adaptive system still functions properly
3. Ensure the game remains playable and enjoyable

### Performance Considerations
- Very high tangler counts may impact performance
- Very short spawn intervals may create many tanglers quickly
- Aggressive tanglers with high speed may be harder to manage computationally

## Configuration Validation

The game does not include built-in validation for configuration values, so ensure:

1. Energy costs are not negative
2. Cooldown times are not negative
3. Health values are not negative
4. Move speeds are reasonable (too high may cause tanglers to zip across the screen)
5. Spawn intervals are not extremely low (could flood the game with tanglers)

## Advanced Configuration Scenarios

### Custom Difficulty Modes
You can create different configuration files for different difficulty levels and swap them as needed:

1. Create `config-easy.js`, `config-normal.js`, `config-hard.js`
2. Add logic to your main application to import the appropriate configuration based on selected difficulty
3. Update the import in `main.js` to load the correct configuration

### A/B Testing Configurations
For testing different game balance changes:
1. Create multiple configuration variants
2. Implement a system to switch between configurations
3. Monitor player engagement and performance metrics with each configuration