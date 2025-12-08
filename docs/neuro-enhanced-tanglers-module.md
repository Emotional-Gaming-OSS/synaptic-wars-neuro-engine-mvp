# Neuro-Enhanced Tanglers Module Documentation

## Overview
The Neuro-Enhanced Tanglers module manages enemy entities that adapt their behavior based on the player's emotional state. These enemies respond dynamically to changes in the player's emotional state as processed by the neuro-adaptive engine.

## Class: NeuroEnhancedTanglers

### Constructor(neuroAdaptiveEngine)
Initializes the tangler manager with a reference to the neuro-adaptive engine.

**Parameters:**
- `neuroAdaptiveEngine`: Instance of NeuroAdaptiveEngine for adaptation processing

**Properties:**
- `neuroAdaptiveEngine`: NeuroAdaptiveEngine instance for adaptation strategies
- `tanglers`: Map storing tangler entities by ID
- `adaptationSettings`: Object containing current adaptation multipliers
  - `aggression`: Multiplier for tangler aggression
  - `speed`: Multiplier for tangler movement speed
  - `spawnRate`: Multiplier for tangler spawn rate
  - `health`: Multiplier for tangler health
- `entanglementActiveUntil`: Timestamp when entanglement effects end
- `calmUntil`: Timestamp when calm effects end

### Methods

#### spawnTangler(position)
Spawns a new tangler at the specified position or a random position.

**Parameters:**
- `position`: Optional object with x, y, z coordinates for spawn position

**Returns:**
- String ID of the newly created tangler

**Side Effects:**
- Adds new tangler to the tanglers map
- Logs tangler spawn to console

#### getAdaptedBehavior()
Determines the appropriate behavior for tanglers based on current neuro-adaptations.

**Returns:**
- String representing tangler behavior ('aggressive', 'defensive', 'strategic', 'erratic', 'normal')

#### updateTanglers(deltaTime, playerPosition)
Updates all active tanglers, applying movement, behavior changes, and other logic.

**Parameters:**
- `deltaTime`: Time elapsed since last update in seconds
- `playerPosition`: Object with x, y, z coordinates of player

**Returns:**
- Number of currently active tanglers

**Side Effects:**
- Updates positions and states of all tanglers
- Removes tanglers with 0 or less health
- Applies behavior modifications based on emotional state

#### updateTanglerBehavior(tangler)
Updates the specific behavior of a tangler based on its type and current state.

**Parameters:**
- `tangler`: Tangler object to update

**Side Effects:**
- Modifies aggression, speed, and behavior properties of the tangler
- Applies effects based on calm state

#### updateTanglerMovement(tangler, deltaTime, playerPosition)
Updates the movement of a specific tangler toward the player.

**Parameters:**
- `tangler`: Tangler object to move
- `deltaTime`: Time elapsed since last update
- `playerPosition`: Object with player coordinates

**Side Effects:**
- Updates the tangler's position based on movement calculations
- Applies behavior-specific movement modifications

#### applyDamage(tanglerId, damage)
Applies damage to a specific tangler, potentially eliminating it.

**Parameters:**
- `tanglerId`: String ID of the tangler to damage
- `damage`: Number of damage points to apply

**Returns:**
- Boolean indicating if the tangler was eliminated

**Side Effects:**
- Reduces tangler health
- May trigger entanglement effects if quantum entanglement is active
- May remove tangler if health reaches 0
- Changes tangler behavior to 'erratic' if health falls below threshold

#### removeTangler(tanglerId)
Removes a tangler from the game.

**Parameters:**
- `tanglerId`: String ID of the tangler to remove

**Side Effects:**
- Removes tangler from the tanglers map
- Logs tangler elimination to console

#### generateSpawnPosition()
Generates a random position for tangler spawning.

**Returns:**
- Object with x, y, z coordinates for spawning

#### updateAdaptationSettings(adaptations)
Updates the adaptation settings based on current neuro-adaptations.

**Parameters:**
- `adaptations`: Object containing gameplay adaptations

**Side Effects:**
- Updates adaptationSettings with new multipliers
- Logs adaptation updates to console

#### getTanglerCount()
Returns the current number of active tanglers.

**Returns:**
- Number of active tanglers

#### getTanglerData()
Returns an array of all tangler data for rendering and other systems.

**Returns:**
- Array of tangler objects

#### activateEntanglement(duration)
Activates quantum entanglement effects for a specified duration.

**Parameters:**
- `duration`: Number of seconds to maintain entanglement effects

**Side Effects:**
- Sets entanglementActiveUntil timestamp

#### applyCalm(seconds)
Applies calming effects to all tanglers for a specified duration.

**Parameters:**
- `seconds`: Number of seconds to maintain calm effects

**Side Effects:**
- Sets calmUntil timestamp

## Tangler Behavior Types

Tanglers can exhibit the following behaviors that affect their aggression and movement:

- **Aggressive**: Higher aggression and speed, more direct pursuit of player
- **Defensive**: Lower aggression and speed, may move away from player occasionally
- **Strategic**: Normal aggression and speed, consistent behavior
- **Erratic**: Unpredictable movement and aggression, activated when health is low
- **Normal**: Default behavior with standard aggression and speed

## Dependencies

- `config.js`: Game configuration values

## Tangler Object Structure

Each tangler object contains:
- `id`: Unique string identifier
- `position`: Object with x, y, z coordinates
- `health`: Current health value
- `maxHealth`: Maximum health value
- `aggression`: Aggression level multiplier
- `speed`: Movement speed multiplier
- `behavior`: String representing current behavior type
- `lastAdaptation`: Timestamp of last behavior adaptation