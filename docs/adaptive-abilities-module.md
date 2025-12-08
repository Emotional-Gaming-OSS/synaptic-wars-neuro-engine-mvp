# Adaptive Abilities Module Documentation

## Overview
The Adaptive Abilities module manages player abilities that adjust their effectiveness, cooldowns, and costs based on the player's emotional state. This creates a dynamic gameplay experience where the player's emotional state directly impacts their strategic options.

## Class: AdaptiveAbilities

### Constructor(neuroAdaptiveEngine)
Initializes the adaptive abilities system with a reference to the neuro-adaptive engine.

**Parameters:**
- `neuroAdaptiveEngine`: Instance of NeuroAdaptiveEngine for adaptation processing

**Properties:**
- `neuroAdaptiveEngine`: NeuroAdaptiveEngine instance for adaptation processing
- `abilities`: Map storing ability objects by name
- `cooldownMultiplier`: Multiplier affecting all ability cooldowns
- `effectivenessMultiplier`: Multiplier affecting all ability effectiveness

### Methods

#### initializeAbilities()
Initializes all abilities based on the configuration settings.

**Side Effects:**
- Populates the abilities map with configured abilities
- Sets initial cooldown and readiness state for each ability

#### updateAbilities(deltaTime)
Updates all abilities, primarily handling cooldown decrementation.

**Parameters:**
- `deltaTime`: Time elapsed since last update in seconds

**Side Effects:**
- Decrements cooldowns for all abilities
- Updates readiness status based on cooldowns
- Applies neuro-adaptations to adjust multipliers

#### applyNeuroAdaptations()
Applies adaptations from the neuro-adaptive engine to adjust ability parameters.

**Side Effects:**
- Updates cooldownMultiplier based on 'abilityCooldowns' adaptation
- Updates effectivenessMultiplier based on emotional state intensity

#### activateAbility(abilityName, playerEnergy)
Attempts to activate a specific ability if conditions are met.

**Parameters:**
- `abilityName`: String name of the ability to activate
- `playerEnergy`: Current player energy available

**Returns:**
- Object with activation result containing:
  - `success`: Boolean indicating if activation succeeded
  - `cost`: Energy cost of the ability (after multipliers)
  - `cooldown`: Cooldown time (after multipliers)
  - `damage`: Damage dealt by the ability (after multipliers)
  - `healing`: Healing amount (after multipliers)
  - `duration`: Effect duration (after multipliers)
  - `remainingEnergy`: Energy left after activation
  - `error`: Error message if activation failed

**Side Effects:**
- Reduces player energy by ability cost
- Sets ability cooldown
- Marks ability as not ready

#### getAbilityInfo(abilityName)
Retrieves detailed information about a specific ability.

**Parameters:**
- `abilityName`: String name of the ability

**Returns:**
- Object containing ability information with adjusted values

#### getAllAbilitiesInfo()
Retrieves information about all abilities.

**Returns:**
- Object mapping ability names to their information

#### resetCooldowns()
Resets all ability cooldowns to zero.

**Side Effects:**
- Sets all ability cooldowns to 0
- Marks all abilities as ready

#### getCooldownMultiplier()
Returns the current cooldown multiplier.

**Returns:**
- Number representing the current cooldown multiplier

#### getEffectivenessMultiplier()
Returns the current effectiveness multiplier.

**Returns:**
- Number representing the current effectiveness multiplier

## Ability Configuration

The module uses configuration from config.js for base ability properties:
- Base cooldown time
- Base energy cost
- Base damage (for damage abilities)
- Base healing (for healing abilities)
- Base duration (for timed abilities)
- Ability name and description

## Adaptation Effects

The module responds to the following neuro-adaptations:
- `abilityCooldowns`: Can be 'reduced' (1.3x faster cooldown), 'increased' (0.7x slower cooldown), or normal
- Emotional intensity affects the effectiveness multiplier (0.8 + intensity * 0.4)

## Dependencies

- `config.js`: Game configuration values

## Ability Object Structure

Each ability object contains:
- `name`: Display name of the ability
- `baseCooldown`: Base cooldown time in seconds
- `baseCost`: Base energy cost
- `baseDamage`: Base damage value (if applicable)
- `baseHealing`: Base healing value (if applicable)
- `baseDuration`: Base duration (if applicable)
- `description`: Ability description
- `currentCooldown`: Current cooldown time remaining
- `isReady`: Boolean indicating if the ability is ready to use