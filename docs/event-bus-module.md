# Event Bus Module Documentation

## Overview
The Event Bus module provides a centralized event system that allows different components to communicate without direct dependencies. This promotes loose coupling between modules and enables a clean architecture.

## Class: EventBus

### Constructor()
Initializes the event bus with an empty events object.

**Properties:**
- `events`: Object to store event listeners by event name

### Methods

#### subscribe(event, callback)
Subscribes a callback function to an event.

**Parameters:**
- `event`: String name of the event to subscribe to
- `callback`: Function to be called when the event is published

**Side Effects:**
- Adds the callback to the list of listeners for the specified event

#### publish(event, data)
Publishes an event with optional data to all subscribers.

**Parameters:**
- `event`: String name of the event to publish
- `data`: Optional data to pass to the event subscribers

**Side Effects:**
- Calls all callback functions subscribed to the event with the provided data

## Global Instance

A global instance of EventBus is exported as `eventBus` and used throughout the application.

## Usage Examples

### Subscribe to an event:
```javascript
eventBus.subscribe('gameStateUpdate', (state) => {
    // Handle game state update
    updateUI(state);
});
```

### Publish an event:
```javascript
eventBus.publish('startGame', {});
```

## Dependencies

- None (standalone event system)

## Best Practices

- Use descriptive event names
- Keep event data minimal and focused
- Unsubscribe from events when components are destroyed (not implemented in current version)
- Follow consistent event naming conventions