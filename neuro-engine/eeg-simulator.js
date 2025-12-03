export class EEGSimulator {
    constructor() {
        this.isConnected = true;
        this.dataStream = null;
        this.currentData = { alpha: 0.3, beta: 0.4, theta: 0.2, delta: 0.1, gamma: 0.5, focus: 0.5, meditation: 0.5 };
        this.simulationMode = 'dynamic';
        this.onDataUpdate = null;
    }

    connect() {
        console.log('🧠 EEG Simulator Connected');
        this.isConnected = true;
        this.startDataStream();
        return true;
    }

    startDataStream() {
        if (this.dataStream) {
            clearInterval(this.dataStream);
        }
        this.dataStream = setInterval(() => {
            this.updateEEGData();
        }, 1000);
        return this.currentData;
    }

    updateEEGData() {
        const baseVariation = 0.1;
        switch (this.simulationMode) {
            case 'focused':
                this.currentData = { alpha: 0.2 + Math.random() * 0.1, beta: 0.6 + Math.random() * 0.2, theta: 0.1 + Math.random() * 0.1, delta: 0.05 + Math.random() * 0.05, gamma: 0.5 + Math.random() * 0.2, focus: 0.8 + Math.random() * 0.15, meditation: 0.3 + Math.random() * 0.2 };
                break;
            case 'stressed':
                this.currentData = { alpha: 0.1 + Math.random() * 0.1, beta: 0.7 + Math.random() * 0.2, theta: 0.3 + Math.random() * 0.2, delta: 0.1 + Math.random() * 0.1, gamma: 0.6 + Math.random() * 0.2, focus: 0.9 + Math.random() * 0.1, meditation: 0.1 + Math.random() * 0.1 };
                break;
            case 'relaxed':
                this.currentData = { alpha: 0.6 + Math.random() * 0.2, beta: 0.2 + Math.random() * 0.1, theta: 0.3 + Math.random() * 0.2, delta: 0.2 + Math.random() * 0.1, gamma: 0.3 + Math.random() * 0.1, focus: 0.4 + Math.random() * 0.2, meditation: 0.7 + Math.random() * 0.2 };
                break;
            default:
                const time = Date.now() / 1000;
                const cycle = Math.sin(time * 0.5) * 0.5 + 0.5;
                this.currentData = { alpha: 0.3 + cycle * 0.3, beta: 0.4 + (1 - cycle) * 0.3, theta: 0.2 + Math.random() * 0.2, delta: 0.1 + Math.random() * 0.1, gamma: 0.4 + cycle * 0.2, focus: 0.5 + (1 - cycle) * 0.3, meditation: 0.3 + cycle * 0.4 };
        }
        Object.keys(this.currentData).forEach(key => {
            this.currentData[key] += (Math.random() - 0.5) * baseVariation;
            this.currentData[key] = Math.max(0.05, Math.min(0.95, this.currentData[key]));
        });
        if (typeof this.onDataUpdate === 'function') {
            this.onDataUpdate({ ...this.currentData });
        }
    }

    setSimulationMode(mode) {
        const validModes = ['dynamic', 'focused', 'stressed', 'relaxed'];
        if (validModes.includes(mode)) {
            this.simulationMode = mode;
            console.log(`🧠 EEG Mode: ${mode}`);
            return true;
        }
        return false;
    }

    getCurrentData() {
        return { ...this.currentData };
    }

    disconnect() {
        if (this.dataStream) {
            clearInterval(this.dataStream);
            this.dataStream = null;
        }
        this.isConnected = false;
        console.log('🧠 EEG Simulator Disconnected');
    }

    setDataUpdateHandler(callback) {
        this.onDataUpdate = callback;
    }
}