// src/core/input-handler.js
import { eventBus } from './event-bus.js';

class InputHandler {
    constructor() {
        this.keys = new Set();
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        this.keys.add(e.code);
        eventBus.publish('keydown', e.code);
    }

    onKeyUp(e) {
        this.keys.delete(e.code);
        eventBus.publish('keyup', e.code);
    }

    isKeyPressed(keyCode) {
        return this.keys.has(keyCode);
    }
}

export const inputHandler = new InputHandler();
