# Synaptic Wars MVP – Neuro Engine

## Overview
Synaptic Wars MVP is a ready-to-run, single-page demo showcasing a Neuro Engine that adapts gameplay to player emotional state. It uses simulated DeepSeek-powered analysis, an EEG data stream, and real-time adaptations visible on a live dashboard.

## Features
- NeuroBridge: AI emotional analysis with simulated DeepSeek responses
- EmotionalDirector: Tracks emotional state and generates adaptations
- NeuroAdaptiveEngine: Applies dynamic difficulty, pacing, rewards, cooldowns
- EEG Simulator: Realistic, mode-switchable brainwave data
- Neuro-Enhanced Tau Tanglers: Enemies adapt behavior based on emotions
- Adaptive Abilities: Emotion-powered cooldowns and effectiveness
- Live Neuro Dashboard: Emotional state, intensity, adaptations, performance
- Data Export: Download JSON of neuro metrics and history

## Project Structure
```
synaptic-wars-mvp/
├── neuro-engine/
│   ├── neuro-bridge.js
│   ├── emotional-director.js
│   ├── neuro-adaptive-engine.js
│   └── eeg-simulator.js
├── gameplay/
│   ├── neuro-enhanced-tanglers.js
│   └── adaptive-abilities.js
├── ui/
│   └── neuro-dashboard-enhanced.js
├── mvp-main.js
└── index-mvp.html
```

## Run
- Open `index-mvp.html` directly in a modern browser
- If your browser restricts ES module imports from `file://`, serve the folder:
  - `python -m http.server 8000` in the `synaptic-wars-mvp` directory
  - Open `http://localhost:8000/index-mvp.html`

## Use
- Click "Begin Neural Journey" or wait for auto-start
- Press `Q`, `W`, `E` or click the buttons to trigger abilities
- Switch EEG mode with Focused/Relaxed/Stressed/Dynamic buttons
- Watch the dashboard update emotional intensity, adaptations, and performance
- Click "Export Data" to download JSON metrics

## Controls
- `Q` – Dendritic Lightning (damage)
- `W` – Serotonin Tsunami (support)
- `E` – Quantum Entanglement (utility)

## Notes
- Emotional analysis is simulated for MVP; replace `NeuroBridge.callDeepSeekAPI` with real API calls for production
- Ability button status mapping is handled in `index-mvp.html` to match Q/W/E

## Troubleshooting
- Blank page or module errors: use the local server option
- Slow updates: dashboard refreshes every second; check console logs for activity

## New User Tutorial

### 1) Quick Start
- Make sure you have Python installed (`python --version`).
- In a terminal, go to `synaptic-wars-mvp`.
- Start a local server: `python -m http.server 8000`.
- Open `http://localhost:8000/index-mvp.html` in your browser.
- If you prefer, you can open `index-mvp.html` directly; some browsers require the server for ES modules.

### 2) What You See
- Canvas: the playfield where the player and tanglers are drawn.
- Controls overlay: three ability buttons (`Q/W/E`) and EEG mode buttons.
- Status bar: shows Tanglers, Energy, and Score.
- Neuro Dashboard: live emotional state, adaptations, performance, and controls (top-right).

### 3) Move and Look Around
- Use `W/A/S/D` to move the player.
- Watch the player circle move on the canvas; tanglers chase or wander based on their behavior.

### 4) Abilities (Q/W/E)
- `Q` — Dendritic Lightning: deals damage to a tangler. If it dies, your Score increases.
- `W` — Serotonin Tsunami: gives you energy back and calms tanglers briefly (they slow down, less aggressive).
- `E` — Quantum Entanglement: links tanglers so damage splashes to another target for a short time.
- Abilities cost Energy and have cooldowns. Buttons disable while cooling down and show remaining seconds.

### 5) EEG Modes
- Focused: higher intensity, generally pushes more challenge.
- Relaxed: calmer pacing and behaviors.
- Stressed: intense, faster behaviors.
- Dynamic: smoothly cycles activity and intensity.
- Switch modes using the overlay buttons or the dashboard EEG toggle.

### 6) Dashboard Guide
- Emotional State: name, intensity bar, and confidence.
- Active Adaptations: current gameplay tweaks (e.g., cooldowns, pacing, rewards).
- Performance: success rate and engagement score (derived from recent states).
- Recommendations: quick tips based on your current state.
- Controls:
  - Reset Adaptations: clears history and current adaptations.
  - EEG toggle: cycles through modes.
  - Export Data: downloads a JSON file with emotional/adaptation history.

### 7) Scoring and Spawning
- Score increases when a tangler is eliminated (reward multiplier may apply).
- Tanglers spawn on a schedule influenced by the current adaptations and mode.
- A minimum tangler count is maintained for continuous play.

### 8) Tips
- Use `W` when energy is low or enemies feel too aggressive.
- Try `E` before `Q` to spread damage across multiple targets.
- Watch the dashboard to understand why enemies feel faster or slower.

### 9) Troubleshooting
- Page doesn’t load modules: serve with `python -m http.server 8000` and open `/index-mvp.html`.
- No visuals: make sure you opened `index-mvp.html` (the canvas is drawn there).
- Slow or choppy updates: close other tabs, keep the browser focused; dashboard updates once per second.
- Still stuck: open DevTools (F12) and check the Console for errors.

### 10) FAQ
- Why do enemies feel different? The Neuro Engine adapts difficulty, pacing, and behaviors based on EEG mode and emotional analysis.
- Can I use a real EEG? This MVP uses a simulator; swap out `NeuroBridge.callDeepSeekAPI` and `EEGSimulator` for real sources.
- How do I reset progress? Click “Reset Adaptations” in the dashboard; this clears adaptation history and metrics.