import { config } from '../config.js';

export class AdaptiveAbilities {
    constructor(neuroAdaptiveEngine) {
        this.neuroAdaptiveEngine = neuroAdaptiveEngine;
        this.abilities = new Map();
        this.cooldownMultiplier = 1.0;
        this.effectivenessMultiplier = 1.0;
        this.initializeAbilities();
    }

    initializeAbilities() {
        for (const [key, abilityConfig] of Object.entries(config.abilities)) {
            this.abilities.set(key, {
                ...abilityConfig,
                currentCooldown: 0,
                isReady: true,
            });
        }
    }

    updateAbilities(deltaTime) {
        this.abilities.forEach(ability => {
            if (ability.currentCooldown > 0) {
                ability.currentCooldown -= deltaTime * this.cooldownMultiplier;
                if (ability.currentCooldown <= 0) {
                    ability.currentCooldown = 0;
                    ability.isReady = true;
                }
            }
        });
        this.applyNeuroAdaptations();
    }

    applyNeuroAdaptations() {
        const adaptations = this.neuroAdaptiveEngine.currentAdaptations;
        if (adaptations.has('abilityCooldowns')) {
            const cooldownSetting = adaptations.get('abilityCooldowns');
            switch (cooldownSetting) {
                case 'reduced':
                    this.cooldownMultiplier = 1.3;
                    break;
                case 'increased':
                    this.cooldownMultiplier = 0.7;
                    break;
                default:
                    this.cooldownMultiplier = 1.0;
            }
        }
        const emotionalState = this.neuroAdaptiveEngine.emotionalDirector?.currentEmotionalState;
        if (emotionalState) {
            this.effectivenessMultiplier = 0.8 + (emotionalState.intensity * 0.4);
        }
    }

    activateAbility(abilityName, playerEnergy) {
        const ability = this.abilities.get(abilityName);
        if (!ability) {
            return { success: false, error: 'Ability not found' };
        }
        if (!ability.isReady) {
            return { success: false, error: 'Ability on cooldown' };
        }
        const actualCost = ability.baseCost * (1.0 / this.effectivenessMultiplier);
        if (playerEnergy < actualCost) {
            return { success: false, error: 'Insufficient energy' };
        }
        const cooldown = ability.baseCooldown * (1.0 / this.cooldownMultiplier);
        const damage = ability.baseDamage * this.effectivenessMultiplier;
        const healing = (ability.baseHealing || 0) * this.effectivenessMultiplier;
        const duration = (ability.baseDuration || 0) * this.effectivenessMultiplier;
        ability.currentCooldown = cooldown;
        ability.isReady = false;
        console.log(`⚡ ${ability.name} Activated!`, { cost: actualCost, cooldown, effectiveness: this.effectivenessMultiplier });
        return { success: true, cost: actualCost, cooldown, damage, healing, duration, remainingEnergy: playerEnergy - actualCost };
    }

    getAbilityInfo(abilityName) {
        const ability = this.abilities.get(abilityName);
        if (!ability) return null;
        const cooldown = ability.baseCooldown * (1.0 / this.cooldownMultiplier);
        const cost = ability.baseCost * (1.0 / this.effectivenessMultiplier);
        return { ...ability, currentCooldown: ability.currentCooldown, adjustedCooldown: cooldown, adjustedCost: cost, effectivenessMultiplier: this.effectivenessMultiplier, isReady: ability.isReady };
    }

    getAllAbilitiesInfo() {
        const abilitiesInfo = {};
        this.abilities.forEach((ability, name) => {
            abilitiesInfo[name] = this.getAbilityInfo(name);
        });
        return abilitiesInfo;
    }

    resetCooldowns() {
        this.abilities.forEach(ability => {
            ability.currentCooldown = 0;
            ability.isReady = true;
        });
    }

    getCooldownMultiplier() {
        return this.cooldownMultiplier;
    }

    getEffectivenessMultiplier() {
        return this.effectivenessMultiplier;
    }
}