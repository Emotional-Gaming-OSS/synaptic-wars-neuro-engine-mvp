# Synaptic Wars Architecture

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Synaptic Wars Application                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────┐    ┌──────────────────────┐    ┌─────────────────────┐ │
│ │   UI Layer      │    │  Core Game Engine    │    │  Neuro-Adaptive     │ │
│ │                 │    │                      │    │     Engine          │ │
│ │ • Neuro Dashboard│    │ • Game Loop          │    │                     │ │
│ │ • Controls      │←──→│ • State Management   │←──→│ • EEG Simulator     │ │
│ │ • Status Bar    │    │ • Rendering          │    │ • Emotional Director│ │
│ │ • Loading Screen│    │ • Input Handling     │    │ • Adaptive Engine   │ │
│ └─────────────────┘    │ • Event System       │    │ • Neuro Bridge      │ │
│                        └──────────────────────┘    └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Interaction Diagram

```
        [Browser/Player]
              ↓ (WASD, QWE keys)
        ┌─────────────┐
        │Input Handler│
        └──────┬──────┘
               │ (Key Events)
        ┌──────▼──────┐
        │  Event Bus  │ ←──────────────────────────────┐
        └──────┬──────┘                                │
               │ (Game State Updates)                   │
        ┌──────▼──────┐                                │
        │   UI Layer  │                                │
        │ (Dashboard) │                                │
        └─────────────┘                                │
                                                       │
        ┌──────────────────────────────────────────────▼─────────────────────┐
        │                         Main Game Loop                             │
        │  ┌─────────────────┐     ┌──────────────────────────────────────┐  │
        │  │   Game Logic    │     │     Neuro-Adaptive Processing        │  │
        │  │                 │     │                                      │  │
        │  │ • Player Move   │     │ ┌─────────────────┐  ┌─────────────┐ │  │
        │  │ • Ability Use   │     │ │  EEG Simulator│  │Emotional    │ │  │
        │  │ • Spawn Tanglers│     │ │                 │  │Director     │ │  │
        │  │ • Update State  │     │ │ • Simulate EEG  │  │             │ │  │
        │  │ • Collision     │     │ │ • Mode Switching│  │ • Emotional │ │  │
        │  └─────────────────┘     │ │ • Data Stream   │  │   Analysis  │ │  │
        │                          │ └─────────────────┘  └─────────────┘ │  │
        │                                 ↓                      ↓         │  │
        │                          ┌─────────────────┐  ┌─────────────┐   │  │
        │                          │Neuro Adaptive   │  │Adaptive     │   │  │
        │                          │Engine           │  │Abilities    │   │  │
        │                          │                 │  │             │   │  │
        │                          │ • Apply         │  │ • Adjust    │   │  │
        │                          │   Adaptations   │  │   Cooldowns │   │  │
        │                          │ • Update        │  │ • Change    │   │  │
        │                          │   GameState     │  │   Effect.   │   │  │
        │                          └─────────────────┘  └─────────────┘   │  │
        └───────────────────────────────────────────────────────────────────┘
                                    ↓
                        ┌─────────────────────────┐
                        │ Neuro-Enhanced Tanglers │
                        │                         │
                        │ • Adapt Behavior        │
                        │ • Adjust Aggression     │
                        │ • Modify Speed          │
                        └─────────────────────────┘
                                    ↓
                           ┌─────────────────┐
                           │   Renderer      │
                           │                 │
                           │ • Draw Player   │
                           │ • Draw Tanglers │
                           │ • Draw UI       │
                           └─────────────────┘
```

## Data Flow Diagram

```
  Player EEG Data
        ↓
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  EEG Simulator  │───→│Emotional Director│───→│Neuro Adaptive   │
│                 │    │                 │    │Engine           │
│ • Simulates     │    │ • Analyzes      │    │                 │
│   brain waves   │    │   emotional     │    │ • Adapts game   │
│ • Mode switching│    │   state         │    │   parameters    │
└─────────────────┘    │ • Generates     │    │ • Modifies      │
                       │   adaptations   │    │   difficulty    │
                       └─────────────────┘    └─────────────────┘
                              ↓                        ↓
                    ┌─────────────────┐    ┌─────────────────┐
                    │   Game Logic    │←───│Adaptive Abilities│
                    │                 │    │                 │
                    │ • Updates game  │    │ • Changes       │
                    │   state based   │    │   effectiveness │
                    │   on adaptations│    │ • Adjusts       │
                    └─────────────────┘    │   cooldowns     │
                           ↓               └─────────────────┘
                    ┌─────────────────┐
                    │Neuro-Enhanced   │
                    │Tanglers         │
                    │                 │
                    │ • Changes       │
                    │   behavior      │
                    │ • Adjusts       │
                    │   aggression    │
                    └─────────────────┘
```

## Class Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Core Classes                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                               Game                                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • gameState: Object                                             │  │
│  │ • spawnTimer: Number                                            │  │
│  │ • neuroBridge: NeuroBridge                                      │  │
│  │ • emotionalDirector: EmotionalDirector                        │  │
│  │ • neuroAdaptiveEngine: NeuroAdaptiveEngine                    │  │
│  │ • eegSimulator: EEGSimulator                                  │  │
│  │ • tanglers: NeuroEnhancedTanglers                              │  │
│  │ • abilities: AdaptiveAbilities                                 │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • initializeNeuroEngine(): Promise                              │  │
│  │ • start(): void                                                 │  │
│  │ • update(deltaTime: number): void                               │  │
│  │ • handlePlayerMovement(deltaTime: number): void                │  │
│  │ • handleTanglerSpawning(...): void                             │  │
│  │ • recoverEnergy(deltaTime: number): void                       │  │
│  │ • handleEEGUpdate(eegData: Object): void                       │  │
│  │ • useAbility(abilityName: string): Object                      │  │
│  │ • getTanglerData(): Array                                      │  │
│  │ • setEEGMode(mode: string): void                               │  │
│  │ • publishGameState(): void                                     │  │
│  │ • destroy(): void                                              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                             Renderer                                   │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • canvas: HTMLCanvasElement                                     │  │
│  │ • ctx: CanvasRenderingContext2D                                 │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • draw(gameState: Object, tanglers: Array): void               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                             EventBus                                     │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • events: Object                                                │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • subscribe(event: string, callback: Function): void            │  │
│  │ • publish(event: string, data: any): void                      │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         Neuro-Engine Classes                            │
├─────────────────────────────────────────────────────────────────────────┤
│                           EEGSimulator                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • isConnected: boolean                                          │  │
│  │ • dataStream: Interval                                          │  │
│  │ • currentData: Object                                           │  │
│  │ • simulationMode: string                                        │  │
│  │ • onDataUpdate: Function                                        │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • connect(): boolean                                            │  │
│  │ • disconnect(): void                                            │  │
│  │ • setSimulationMode(mode: string): boolean                     │  │
│  │ • getCurrentData(): Object                                      │  │
│  │ • setDataUpdateHandler(callback: Function): void               │  │
│  │ • startDataStream(): Object                                     │  │
│  │ • updateEEGData(): void                                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                        EmotionalDirector                                │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • neuroBridge: NeuroBridge                                      │  │
│  │ • playerEmotionalHistory: Array                                 │  │
│  │ • adaptationStrategies: Map                                     │  │
│  │ • currentEmotionalState: Object                                 │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • initializeStrategies(): void                                  │  │
│  │ • processPlayerState(...): Object                               │  │
│  │ • generateAdaptations(state: Object): Object                    │  │
│  │ • generateRecommendations(state: Object): Array                 │  │
│  │ • getEmotionalTrend(): string                                  │  │
│  │ • getFallbackAdaptations(): Object                              │  │
│  │ • getDefaultEmotionalState(): Object                            │  │
│  └───────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                       NeuroAdaptiveEngine                               │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • emotionalDirector: EmotionalDirector                        │  │
│  │ • adaptationHistory: Array                                      │  │
│  │ • currentAdaptations: Map                                       │  │
│  │ • performanceMetrics: Object                                    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • applyAdaptations(...): Object                                 │  │
│  │ • adaptGameState(...): Object                                   │  │
│  │ • trackAdaptationPerformance(...): void                         │  │
│  │ • getPerformanceReport(): Object                                │  │
│  │ • getFallbackAnalysis(): Object                                 │  │
│  │ • reset(): void                                                 │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                          Gameplay Classes                               │
├─────────────────────────────────────────────────────────────────────────┤
│                       NeuroEnhancedTanglers                             │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • neuroAdaptiveEngine: NeuroAdaptiveEngine                    │  │
│  │ • tanglers: Map                                                 │  │
│  │ • adaptationSettings: Object                                    │  │
│  │ • entanglementActiveUntil: number                               │  │
│  │ • calmUntil: number                                             │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • spawnTangler(position: Object): string                        │  │
│  │ • getAdaptedBehavior(): string                                  │  │
│  │ • updateTanglers(...): number                                   │  │
│  │ • updateTanglerBehavior(tangler: Object): void                  │  │
│  │ • updateTanglerMovement(...): void                              │  │
│  │ • applyDamage(...): boolean                                     │  │
│  │ • removeTangler(tanglerId: string): void                        │  │
│  │ • generateSpawnPosition(): Object                               │  │
│  │ • updateAdaptationSettings(adaptations: Object): void           │  │
│  │ • getTanglerCount(): number                                     │  │
│  │ • getTanglerData(): Array                                       │  │
│  │ • activateEntanglement(duration: number): void                  │  │
│  │ • applyCalm(seconds: number): void                              │  │
│  └───────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                          AdaptiveAbilities                              │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Properties:                                                     │  │
│  │ • neuroAdaptiveEngine: NeuroAdaptiveEngine                    │  │
│  │ • abilities: Map                                                │  │
│  │ • cooldownMultiplier: number                                    │  │
│  │ • effectivenessMultiplier: number                               │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Methods:                                                        │  │
│  │ • initializeAbilities(): void                                   │  │
│  │ • updateAbilities(deltaTime: number): void                      │  │
│  │ • applyNeuroAdaptations(): void                                 │  │
│  │ • activateAbility(...): Object                                  │  │
│  │ • getAbilityInfo(name: string): Object                          │  │
│  │ • getAllAbilitiesInfo(): Object                                 │  │
│  │ • resetCooldowns(): void                                        │  │
│  │ • getCooldownMultiplier(): number                               │  │
│  │ • getEffectivenessMultiplier(): number                          │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```