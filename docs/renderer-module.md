# Renderer Module Documentation

## Overview
The Renderer module handles the visual rendering of the game state to the HTML canvas. It is responsible for drawing the player character, tanglers, health bars, and any other visual elements in the game world.

## Class: Renderer

### Constructor(canvas)
Initializes the renderer with a canvas element.

**Parameters:**
- `canvas`: HTML canvas element to render to

**Properties:**
- `canvas`: The HTML canvas element
- `ctx`: The 2D rendering context of the canvas

### Methods

#### draw(gameState, tanglers)
Renders the current game state to the canvas.

**Parameters:**
- `gameState`: Object containing the current game state
  - `playerPosition`: Object with x, y, z coordinates of player
- `tanglers`: Array of tangler objects to render

**Side Effects:**
- Clears the canvas
- Draws the player character at its position
- Draws all tanglers with appropriate colors based on behavior
- Draws health bars for each tangler

#### toScreen(p)
Converts world coordinates to screen coordinates.

**Parameters:**
- `p`: Object with x, y coordinates in world space

**Returns:**
- Object with x, y coordinates in screen space

**Note:** This method is used internally by the draw method and is not part of the public interface.

## Dependencies

- None (standalone rendering module)

## Coordinate System

The game uses a 3D coordinate system internally but is rendered as 2D. The Renderer converts the 3D world coordinates to 2D screen coordinates using a simple projection where:
- World coordinates range from -8 to +8 in both x and y directions
- These are mapped to the full width and height of the canvas
- The z-coordinate is ignored for rendering purposes