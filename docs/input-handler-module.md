# Input Handler Module Documentation

## Overview
The Input Handler module manages keyboard input for the game. It captures keyboard events and provides an interface for checking the current state of keys.

## Class: InputHandler

### Constructor()
Initializes the input handler and sets up event listeners for keyboard events.

**Properties:**
- `keys`: Set containing the currently pressed key codes

**Side Effects:**
- Adds event listeners for 'keydown' and 'keyup' events on the window

### Methods

#### onKeyDown(e)
Handles key down events.

**Parameters:**
- `e`: KeyboardEvent object

**Side Effects:**
- Adds the key code to the keys set
- Publishes 'keydown' event with the key code

#### onKeyUp(e)
Handles key up events.

**Parameters:**
- `e`: KeyboardEvent object

**Side Effects:**
- Removes the key code from the keys set
- Publishes 'keyup' event with the key code

#### isKeyPressed(keyCode)
Checks if a specific key is currently pressed.

**Parameters:**
- `keyCode`: String representing the key code to check (e.g., 'KeyW', 'KeyA')

**Returns:**
- Boolean indicating if the key is currently pressed

## Global Instance

A global instance of InputHandler is exported as `inputHandler` and used throughout the application, particularly in the Game module for player movement.

## Dependencies

- `event-bus.js`: For publishing key events

## Key Code Reference

The input handler uses the KeyboardEvent.code property for identifying keys, which provides a stable, non-localized value. Common codes used in the game:
- Movement: 'KeyW', 'KeyA', 'KeyS', 'KeyD'
- Abilities: 'KeyQ', 'KeyW', 'KeyE' (Note: W is used for both movement and ability)

## Event System

The input handler also publishes 'keydown' and 'keyup' events to the event bus, allowing other components to listen for input events if needed.