# Setup and Run Instructions

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- For local server option: Python 3.x installed (optional but recommended)
- Stable internet connection (for initial download of files)

## Installation

### Step 1: Download the Project
1. Download the project files from the repository
2. Extract the files to a local directory
3. Ensure all files are present in the `synaptic-wars-mvp` directory:
   ```
   synaptic-wars-mvp/
   ├── config.js
   ├── index.html
   ├── main.js
   ├── README.md
   ├── core/
   ├── gameplay/
   ├── neuro-engine/
   └── ui/
   ```

### Step 2: Verify File Integrity
1. Check that all .js files exist in their respective directories
2. Verify that index.html is in the root directory
3. Ensure the config.js file is present

## Running the Application

### Method 1: Direct Browser Method (Simpler)
1. Navigate to the extracted `synaptic-wars-mvp` directory
2. Double-click on `index.html` to open it directly in your default browser
3. The application will load with a loading screen
4. The game will begin automatically after 2 seconds or you can click "Begin Neural Journey"

### Method 2: Local Server Method (Recommended)
This method is recommended as it avoids potential Cross-Origin errors that some browsers may have with direct file access.

1. Open a terminal/command prompt
2. Navigate to the `synaptic-wars-mvp` directory:
   ```bash
   cd path/to/synaptic-wars-mvp
   ```
3. Start a local server:
   - For Python 3:
     ```bash
     python -m http.server 8000
     ```
   - For Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```
4. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```
5. Click on the `index.html` file or navigate to `http://localhost:8000/index.html`

## Initial Configuration

### EEG Simulation Modes
The game includes different EEG simulation modes that affect gameplay:
- **Focused**: High-intensity mode with aggressive tanglers and reduced ability cooldowns
- **Relaxed**: Calm mode with strategic gameplay and moderate difficulty
- **Stressed**: Chaotic mode with erratic behavior from both player and enemies
- **Dynamic**: Smoothly transitions between states over time

### Initial Settings
By default, the game starts in "dynamic" mode but can be changed:
1. Click on the EEG mode buttons in the control panel
2. Or use the neuro dashboard controls (if implemented)

## Controls

### Movement
- **W**: Move up
- **A**: Move left
- **S**: Move down
- **D**: Move right

### Abilities
- **Q**: Dendritic Lightning - Deals damage to a random tangler
- **W**: Serotonin Tsunami - Heals player and calms tanglers briefly
- **E**: Quantum Entanglement - Links tanglers so damage spreads to nearby targets

### UI Controls
- **EEG Mode Buttons**: Located at bottom-left, change the simulation mode
- **Neuro Dashboard**: Top-right, shows emotional state, adaptations, and performance
- **Begin Neural Journey Button**: Starts the game from the loading screen

## Troubleshooting

### Common Issues and Solutions

#### Issue: Blank Screen
**Possible Causes:**
- Browser blocking ES6 modules from file:// URLs
- Malfunctioning JavaScript

**Solutions:**
1. Use the local server method instead of direct file opening
2. Check browser console (F12) for error messages
3. Ensure JavaScript is enabled in your browser
4. Try a different browser

#### Issue: No Audio/Visual Response
**Possible Causes:**
- Rendering context not initialized
- Canvas element not accessible

**Solutions:**
1. Refresh the page
2. Check browser console for errors
3. Ensure the browser supports HTML5 Canvas

#### Issue: Controls Not Responding
**Possible Causes:**
- Game window not focused
- JavaScript error preventing input handling

**Solutions:**
1. Click on the game canvas to ensure it has focus
2. Check browser console for errors
3. Ensure keyboard input is not captured by other elements

#### Issue: Game Running Slow
**Possible Causes:**
- System resources are limited
- Too many tanglers active

**Solutions:**
1. Close other browser tabs and applications
2. Reduce browser extensions that might interfere
3. The game is optimized for fewer than 20 active tanglers

### Browser Compatibility
- **Supported**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Not Recommended**: Internet Explorer, older versions of supported browsers

### Debugging Tips
1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Look at the Network tab for failed resource loads
4. Monitor the Performance tab if experiencing lag
5. Check for any network requests to external APIs that might be failing

## Performance Optimization

### For Better Performance
1. Close unnecessary browser tabs
2. Ensure your system has adequate RAM and processing power
3. Update your browser to the latest version
4. Disable browser extensions that may interfere with performance
5. Ensure your system's graphics drivers are up to date

### Monitoring Game Performance
The neuro dashboard (if implemented) shows:
- Current emotional state and intensity
- Active adaptations
- Performance metrics
- Engagement scores

## Development Setup (For Contributors)

### For Development Work
If you plan to modify the code:

1. Ensure Node.js and npm are installed (optional for ES modules, but useful for development tools)
2. Install development dependencies:
   ```bash
   npm install  # This would be used if a package.json existed
   ```
3. Consider using a development server with hot-reloading:
   ```bash
   npx serve .  # Alternative to Python server
   ```

### Development Tools
- Browser developer tools for debugging JavaScript
- Linters for code quality (e.g., ESLint)
- Code formatter (e.g., Prettier)
- Testing framework (for future test implementation)

## Known Limitations

### Current Limitations
1. EEG data is simulated; real EEG hardware integration is not yet implemented
2. The game uses client-side storage only, so data does not persist between sessions
3. Some browsers may have issues with ES6 modules when loading directly from file system
4. Performance may degrade with more than 30-40 active tanglers
5. No multiplayer functionality implemented yet

### Future Improvements
1. Real EEG hardware integration
2. Data persistence and save functionality
3. Multiplayer support
4. More sophisticated adaptation algorithms
5. Enhanced visual effects

## Quick Start Sequence

1. **Download** the project files
2. **Choose** either direct browser method or local server method
3. **Open** index.html in your browser
4. **Wait** for loading screen (or click "Begin Neural Journey")
5. **Use WASD** to move your character
6. **Use QWE** keys to activate abilities
7. **Toggle EEG modes** using the buttons at the bottom left
8. **Monitor** your emotional state and adaptations in the neuro dashboard

## Support

### Getting Help
- Check the README.md for detailed information about features
- Review the documentation files in the docs/ directory
- Examine the source code comments for implementation details
- Open browser console (F12) to see real-time system messages

### Contributing
If you want to contribute to the project:
1. Fork the repository
2. Create a feature branch for your changes
3. Make your changes following the existing code style
4. Submit a pull request with a clear description of your changes