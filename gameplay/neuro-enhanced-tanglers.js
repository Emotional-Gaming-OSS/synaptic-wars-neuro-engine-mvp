import { config } from '../config.js';

export class NeuroEnhancedTanglers {
    constructor(neuroAdaptiveEngine) {
        this.neuroAdaptiveEngine = neuroAdaptiveEngine;
        this.tanglers = new Map();
        this.adaptationSettings = { aggression: 1.0, speed: 1.0, spawnRate: 1.0, health: 1.0 };
        this.entanglementActiveUntil = 0;
        this.calmUntil = 0;
    }

    spawnTangler(position = null) {
        const tanglerId = `neuro-tangler-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const baseHealth = config.tangler.baseHealth;
        const tangler = { 
            id: tanglerId, 
            position: position || this.generateSpawnPosition(), 
            health: baseHealth * this.adaptationSettings.health, 
            maxHealth: baseHealth * this.adaptationSettings.health, 
            aggression: this.adaptationSettings.aggression, 
            speed: this.adaptationSettings.speed, 
            behavior: this.getAdaptedBehavior(), 
            lastAdaptation: Date.now() 
        };
        this.tanglers.set(tanglerId, tangler);
        console.log(`🦠 Neuro-Enhanced Tangler Spawned: ${tanglerId}`);
        return tanglerId;
    }

    getAdaptedBehavior() {
        const adaptations = this.neuroAdaptiveEngine.currentAdaptations;
        if (adaptations.has('tauTanglerBehavior')) {
            const behavior = adaptations.get('tauTanglerBehavior');
            switch (behavior) {
                case 'more_aggressive':
                    return 'aggressive';
                case 'less_aggressive':
                    return 'defensive';
                case 'strategic':
                    return 'strategic';
                case 'unpredictable':
                    return 'erratic';
            }
        }
        return 'normal';
    }

    updateTanglers(deltaTime, playerPosition) {
        this.tanglers.forEach((tangler, id) => {
            if (tangler.health <= 0) {
                this.removeTangler(id);
                return;
            }
            this.updateTanglerBehavior(tangler);
            this.updateTanglerMovement(tangler, deltaTime, playerPosition);
        });
        return this.tanglers.size;
    }

    updateTanglerBehavior(tangler) {
        if (Date.now() - tangler.lastAdaptation > 5000) {
            tangler.behavior = this.getAdaptedBehavior();
            tangler.lastAdaptation = Date.now();
        }
        const calmActive = Date.now() < this.calmUntil;
        switch (tangler.behavior) {
            case 'aggressive':
                tangler.aggression = this.adaptationSettings.aggression * (calmActive ? 1.0 : 1.3);
                tangler.speed = this.adaptationSettings.speed * (calmActive ? 1.0 : 1.2);
                break;
            case 'defensive':
                tangler.aggression = this.adaptationSettings.aggression * (calmActive ? 0.6 : 0.7);
                tangler.speed = this.adaptationSettings.speed * (calmActive ? 0.7 : 0.8);
                break;
            case 'strategic':
                tangler.aggression = this.adaptationSettings.aggression;
                tangler.speed = this.adaptationSettings.speed;
                break;
            case 'erratic':
                tangler.aggression = this.adaptationSettings.aggression * (calmActive ? 0.6 : (0.5 + Math.random()));
                tangler.speed = this.adaptationSettings.speed * (calmActive ? 0.9 : (0.8 + Math.random() * 0.4));
                break;
        }
    }

    updateTanglerMovement(tangler, deltaTime, playerPosition) {
        const direction = { x: playerPosition.x - tangler.position.x, y: playerPosition.y - tangler.position.y, z: playerPosition.z - tangler.position.z };
        const length = Math.sqrt(direction.x ** 2 + direction.y ** 2 + direction.z ** 2);
        if (length > 0) {
            direction.x /= length;
            direction.y /= length;
            direction.z /= length;
        }
        let moveSpeed = config.tangler.baseMoveSpeed * tangler.speed;
        switch (tangler.behavior) {
            case 'erratic':
                direction.x += (Math.random() - 0.5) * 0.3;
                direction.y += (Math.random() - 0.5) * 0.3;
                direction.z += (Math.random() - 0.5) * 0.3;
                break;
            case 'defensive':
                if (Math.random() < 0.3) {
                    direction.x *= -1;
                    direction.y *= -1;
                    direction.z *= -1;
                }
                break;
        }
        tangler.position.x += direction.x * moveSpeed * deltaTime * 60;
        tangler.position.y += direction.y * moveSpeed * deltaTime * 60;
        tangler.position.z += direction.z * moveSpeed * deltaTime * 60;
    }

    applyDamage(tanglerId, damage) {
        const tangler = this.tanglers.get(tanglerId);
        if (tangler) {
            tangler.health -= damage;
            if (tangler.health < tangler.maxHealth * config.tangler.erraticThreshold) {
                tangler.behavior = 'erratic';
                tangler.speed *= config.tangler.erraticSpeedMultiplier;
            }
            if (Date.now() < this.entanglementActiveUntil) {
                const others = Array.from(this.tanglers.keys()).filter(id => id !== tanglerId);
                if (others.length) {
                    const targetId = others[Math.floor(Math.random() * others.length)];
                    const splash = Math.round(damage * config.tangler.entanglement.splashDamageMultiplier);
                    const other = this.tanglers.get(targetId);
                    if (other) {
                        other.health -= splash;
                        if (other.health < other.maxHealth * config.tangler.erraticThreshold) {
                            other.behavior = 'erratic';
                            other.speed *= config.tangler.entanglement.splashSpeedMultiplier;
                        }
                        if (other.health <= 0) {
                            this.removeTangler(targetId);
                        }
                    }
                }
            }
            return tangler.health <= 0;
        }
        return false;
    }

    removeTangler(tanglerId) {
        this.tanglers.delete(tanglerId);
        console.log(`💀 Neuro-Tangler Eliminated: ${tanglerId}`);
    }


    generateSpawnPosition() {
        return { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8, z: (Math.random() - 0.5) * 8 };
    }

    updateAdaptationSettings(adaptations) {
        if (adaptations.gameplay.difficultyIncrease) {
            this.adaptationSettings.aggression = 1.0 + adaptations.gameplay.difficultyIncrease;
            this.adaptationSettings.health = 1.0 + adaptations.gameplay.difficultyIncrease * 0.5;
        }
        if (adaptations.gameplay.difficultyReduction) {
            this.adaptationSettings.aggression = Math.max(0.3, 1.0 - adaptations.gameplay.difficultyReduction);
            this.adaptationSettings.health = Math.max(0.5, 1.0 - adaptations.gameplay.difficultyReduction * 0.5);
        }
        if (adaptations.gameplay.pacingIncrease) {
            this.adaptationSettings.spawnRate = 1.0 + adaptations.gameplay.pacingIncrease;
        }
        console.log('🔄 Tangler Adaptations Updated:', this.adaptationSettings);
    }

    getTanglerCount() {
        return this.tanglers.size;
    }

    getTanglerData() {
        return Array.from(this.tanglers.values());
    }

    activateEntanglement(duration) {
        this.entanglementActiveUntil = Date.now() + Math.max(1000, duration * 1000);
    }

    applyCalm(seconds) {
        this.calmUntil = Date.now() + Math.max(1000, seconds * 1000);
    }
}