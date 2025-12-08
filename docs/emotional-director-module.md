# Emotional Director Module Documentation

## Overview
The Emotional Director analyzes EEG data to determine emotional states and generates appropriate adaptation strategies for the game. It acts as a bridge between raw emotional data and gameplay modifications.

## Class: EmotionalDirector

### Constructor(neuroBridge)
Initializes the emotional director with a neuro-bridge instance.

**Parameters:**
- `neuroBridge`: Instance of NeuroBridge for emotional analysis

**Properties:**
- `neuroBridge`: NeuroBridge instance for emotional state processing
- `playerEmotionalHistory`: Array of historical emotional states
- `adaptationStrategies`: Map of emotional states to adaptation strategies
- `currentEmotionalState`: Current emotional state object

### Methods

#### initializeStrategies()
Initializes the default adaptation strategies for different emotional states.

**Side Effects:**
- Sets up the adaptationStrategies map with predefined strategies for various emotional states

#### processPlayerState(eegData, gameState)
Processes EEG data and game state to determine emotional state and adaptations.

**Parameters:**
- `eegData`: Object containing EEG data from simulator
- `gameState`: Current game state object

**Returns:**
- Object containing emotional state, adaptations, recommendations, and confidence

**Side Effects:**
- Updates playerEmotionalHistory with new state
- Updates currentEmotionalState property
- Limits emotional history to 100 entries

#### generateAdaptations(emotionalState)
Generates gameplay adaptations based on the determined emotional state.

**Parameters:**
- `emotionalState`: Object containing emotional state information

**Returns:**
- Object containing adaptations for gameplay and narrative

#### generateRecommendations(emotionalState)
Creates recommendations for the player based on emotional state.

**Parameters:**
- `emotionalState`: Object containing emotional state information

**Returns:**
- Array of string recommendations

#### getEmotionalTrend()
Analyzes the recent emotional history to determine the trend.

**Returns:**
- String representing the emotional trend ('increasing', 'decreasing', 'stable')

#### getFallbackAdaptations()
Provides default adaptations in case of processing errors.

**Returns:**
- Object with fallback adaptations

#### getDefaultEmotionalState()
Provides a default neutral emotional state.

**Returns:**
- Object with default emotional state

## Adaptation Strategies

The Emotional Director defines adaptation strategies for different emotional states:

- **Focused**: More aggressive tanglers, reduced ability cooldowns, more challenging environment
- **Frustrated**: Less aggressive tanglers, reduced ability cooldowns, supportive environment, potential for spawning health
- **Calm**: Strategic tangler behavior, normal ability cooldowns, engaging environment
- **Excited**: Unpredictable tangler behavior, variable ability cooldowns, dynamic environment
- **Neutral**: Strategic tangler behavior, normal ability cooldowns, balanced environment (default)

## Dependencies

- `neuro-bridge.js`: For emotional analysis processing

## Emotional State Object

The emotional state object contains:
- `emotionalState`: String describing the emotional state (e.g., 'focused', 'frustrated')
- `intensity`: Number representing the intensity of the emotion (0-1)
- `confidence`: Number representing confidence in the analysis (0-1)
- `narrativePrompt`: String for narrative adaptations