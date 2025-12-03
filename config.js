// src/config.js
export const config = {
    player: {
        moveSpeed: 2.5,
        initialEnergy: 100,
        maxEnergy: 100,
        energyRecoveryRate: 10, // per second
    },
    game: {
        baseSpawnInterval: 5, // seconds
        minTanglerCount: 2,
    },
    abilities: {
        dendritic_lightning: {
            name: 'Dendritic Lightning',
            baseCooldown: 3.0,
            baseCost: 20,
            baseDamage: 50,
            description: 'Electrifies Tau Tanglers with neural impulses',
        },
        serotonin_tsunami: {
            name: 'Serotonin Tsunami',
            baseCooldown: 5.0,
            baseCost: 30,
            baseHealing: 25,
            description: 'Releases healing energy that calms neural environment',
        },
        quantum_entanglement: {
            name: 'Quantum Entanglement',
            baseCooldown: 8.0,
            baseCost: 40,
            baseDuration: 4.0,
            description: 'Creates quantum links between Tau Tanglers',
        },
    },
    tangler: {
        baseHealth: 100,
        scoreValue: 10,
        baseMoveSpeed: 0.01,
        erraticThreshold: 0.3, // Health percentage below which behavior becomes erratic
        erraticSpeedMultiplier: 1.5,
        entanglement: {
            splashDamageMultiplier: 0.5,
            splashSpeedMultiplier: 1.2,
        }
    }
};
