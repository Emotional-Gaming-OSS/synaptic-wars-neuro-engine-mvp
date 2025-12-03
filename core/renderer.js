// src/core/renderer.js
class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw(gameState, tanglers) {
        if (!this.ctx || !this.canvas) return;

        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        if (this.canvas.width !== w) this.canvas.width = w;
        if (this.canvas.height !== h) this.canvas.height = h;

        this.ctx.clearRect(0, 0, w, h);

        const toScreen = (p) => ({
            x: (p.x + 8) / 16 * w,
            y: (p.y + 8) / 16 * h,
        });

        // Draw player
        const playerPos = toScreen(gameState.playerPosition);
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(playerPos.x, playerPos.y, 8, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw tanglers
        tanglers.forEach(t => {
            const pos = toScreen(t.position);
            const ratio = Math.max(0.1, t.health / t.maxHealth);
            let color = '#00BFFF';
            if (t.behavior === 'aggressive') color = '#FF4D4D';
            if (t.behavior === 'defensive') color = '#7FBF7F';
            if (t.behavior === 'erratic') color = '#8A2BE2';
            
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, 10 + 5 * ratio, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Health bar
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(pos.x - 12, pos.y - 16, 24, 4);
            this.ctx.fillStyle = '#00FF7F';
            this.ctx.fillRect(pos.x - 12, pos.y - 16, 24 * ratio, 4);
        });
    }
}

export { Renderer };
