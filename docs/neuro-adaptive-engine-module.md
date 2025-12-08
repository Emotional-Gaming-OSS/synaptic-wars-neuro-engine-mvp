# Neuro Adaptive Engine Module Documentation

## Overview
The Neuro Adaptive Engine applies gameplay adaptations based on emotional analysis from the Emotional Director. It modifies game parameters in real-time to create a personalized experience based on the player's emotional state.

## Class: NeuroAdaptiveEngine

### Constructor(emotionalDirector)
Initializes the neuro-adaptive engine with an emotional director instance.

**Parameters:**
- `emotionalDirector`: Instance of EmotionalDirector for emotional state processing

**Properties:**
- `emotionalDirector`: EmotionalDirector instance for processing emotional states
- `adaptationHistory`: Array of past adaptations (limited to 50 entries)
- `currentAdaptations`: Map of current gameplay adaptations
- `performanceMetrics`: Object containing performance metrics

### Methods

#### applyAdaptations(gameState, eegData)
Main method to apply adaptations to the game state based on EEG data.

**Parameters:**
- `gameState`: Current game state object
- `eegData`: Object containing EEG data from simulator

**Returns:**
- Object containing adapted game state, emotional analysis, and success status

**Side Effects:**
- Updates adaptationHistory with the new adaptation
- Updates currentAdaptations map
- Tracks adaptation performance metrics

#### adaptGameState(gameState, adaptations)
Applies specific adaptations to the game state.

**Parameters:**
- `gameState`: Current game state object
- `adaptations`: Object containing adaptations to apply

**Returns:**
- New game state object with adaptations applied

**Adaptations Applied:**
- Difficulty multiplier adjustments (increase/reduction)
- Ability cooldown multipliers
- Reward multipliers
- Spawn rate modifications
- Health spawning triggers

#### trackAdaptationPerformance(emotionalAnalysis, gameState)
Tracks performance metrics for adaptation effectiveness.

**Parameters:**
- `emotionalAnalysis`: Object containing emotional state analysis
- `gameState`: Current game state for context

**Side Effects:**
- Updates performanceMetrics object

#### getPerformanceReport()
Returns a comprehensive report of adaptation performance.

**Returns:**
- Object containing performance metrics, current adaptations, and emotional trends

#### getFallbackAnalysis()
Provides fallback analysis in case of processing errors.

**Returns:**
- Object with default emotional state and basic analysis

#### reset()
Resets the adaptation history and performance metrics.

**Side Effects:**
- Clears adaptationHistory
- Clears currentAdaptations map
- Resets performanceMetrics to initial values

## Performance Metrics

The engine tracks the following performance metrics:
- `adaptationSuccess`: Number of successful adaptations
- `adaptationTotal`: Total number of adaptation attempts
- `successRate`: Success rate of adaptations (calculated)
- `engagementScore`: Score based on emotional intensity and variety
- `currentAdaptations`: Current active adaptations
- `adaptationHistoryCount`: Count of entries in adaptation history
- `emotionalTrend`: Overall trend of emotional states

## Dependencies

- `emotional-director.js`: For emotional state processing

## Adaptation Object Structure

The adaptations object contains:
- `gameplay`: Object with gameplay modifications
  - `difficultyIncrease`: Number to increase difficulty by
  - `difficultyReduction`: Number to decrease difficulty by
  - `abilityCooldowns`: String ('reduced', 'increased', or other)
  - `rewardMultiplier`: Number to multiply rewards by
  - `spawnHealth`: Boolean indicating to spawn health
  - `pacingIncrease`: Number to increase spawn rate by
  - Additional gameplay parameters
- `narrative`: String for narrative elements
- `intensity`: Number representing emotional intensity
- `timestamp`: Time when adaptations were generated