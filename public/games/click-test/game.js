// Click Speed Test Game - 10 Seconds Challenge
class ClickSpeedGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'idle'; // idle, running, finished
        this.clicks = 0;
        this.timeLeft = 10;
        this.gameTimer = null;
        this.countdownTimer = null;
        this.lastClickTime = 0;
        this.clickEffects = [];
        this.bestScore = localStorage.getItem('clickSpeedBest') || 0;

        this.setupCanvas();
        this.setupEventListeners();
        this.render();
    }

    setupCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        window.addEventListener('resize', () => {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
            this.render();
        });
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', () => {
            if (this.state === 'running') {
                this.canvas.style.cursor = 'pointer';
            } else {
                this.canvas.style.cursor = 'default';
            }
        });
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.state === 'idle') {
            this.startGame();
        } else if (this.state === 'running') {
            this.registerClick(x, y);
        } else if (this.state === 'finished') {
            this.resetGame();
        }
    }

    startGame() {
        this.state = 'running';
        this.clicks = 0;
        this.timeLeft = 10;
        this.clickEffects = [];

        // Update countdown every 10ms for smooth display
        this.countdownTimer = setInterval(() => {
            this.timeLeft = Math.max(0, this.timeLeft - 0.01);
            if (this.timeLeft <= 0) {
                this.endGame();
            }
            this.render();
        }, 10);

        this.render();
    }

    registerClick(x, y) {
        this.clicks++;
        this.lastClickTime = Date.now();

        // Add click effect
        this.clickEffects.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 50,
            opacity: 1,
            createdAt: Date.now()
        });

        this.render();
    }

    endGame() {
        clearInterval(this.countdownTimer);
        this.state = 'finished';

        // Save best score
        if (this.clicks > this.bestScore) {
            this.bestScore = this.clicks;
            localStorage.setItem('clickSpeedBest', this.bestScore);
        }

        this.render();
    }

    resetGame() {
        this.state = 'idle';
        this.clicks = 0;
        this.timeLeft = 10;
        this.clickEffects = [];
        this.render();
    }

    getCPS() {
        return (this.clicks / 10).toFixed(1);
    }

    getRating(clicks) {
        if (clicks >= 100) return { text: 'INSANE!', color: '#ff00ff' };
        if (clicks >= 80) return { text: 'Excellent!', color: '#00ff41' };
        if (clicks >= 60) return { text: 'Great!', color: '#4CAF50' };
        if (clicks >= 40) return { text: 'Good', color: '#FFC107' };
        if (clicks >= 20) return { text: 'Average', color: '#FF9800' };
        return { text: 'Keep Trying!', color: '#f44336' };
    }

    updateClickEffects() {
        const now = Date.now();
        this.clickEffects = this.clickEffects.filter(effect => {
            const age = now - effect.createdAt;
            if (age > 500) return false;

            effect.radius = (age / 500) * effect.maxRadius;
            effect.opacity = 1 - (age / 500);
            return true;
        });
    }

    render() {
        const { width, height } = this.canvas;

        // Background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);

        // Update and draw click effects
        if (this.state === 'running') {
            this.updateClickEffects();
            this.clickEffects.forEach(effect => {
                this.ctx.beginPath();
                this.ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(0, 255, 65, ${effect.opacity * 0.6})`;
                this.ctx.lineWidth = 3;
                this.ctx.stroke();

                // Inner circle
                this.ctx.beginPath();
                this.ctx.arc(effect.x, effect.y, effect.radius * 0.5, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(0, 255, 65, ${effect.opacity * 0.3})`;
                this.ctx.fill();
            });
        }

        if (this.state === 'idle') {
            this.drawText('Click Speed Test', width / 2, height * 0.3, '42px Arial', '#ffffff', 'center');
            this.drawText('Click as many times as you can', width / 2, height * 0.45, '20px Arial', '#aaaaaa', 'center');
            this.drawText('in 10 seconds!', width / 2, height * 0.52, '20px Arial', '#aaaaaa', 'center');

            // Draw start button
            const buttonWidth = 200;
            const buttonHeight = 60;
            const buttonX = width / 2 - buttonWidth / 2;
            const buttonY = height * 0.6;

            this.ctx.fillStyle = '#00ff41';
            this.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
            this.ctx.fill();

            this.drawText('START', width / 2, buttonY + 40, 'bold 24px Arial', '#000000', 'center');

            if (this.bestScore > 0) {
                this.drawText(`Best Score: ${this.bestScore} clicks`, width / 2, height * 0.85, '18px Arial', '#4CAF50', 'center');
            }
        } else if (this.state === 'running') {
            // Timer display
            this.drawText(this.timeLeft.toFixed(2) + 's', width / 2, height * 0.2, 'bold 48px Arial', '#00ff41', 'center');

            // Click counter - large and centered
            this.drawText(this.clicks.toString(), width / 2, height * 0.5, 'bold 120px Arial', '#ffffff', 'center');
            this.drawText('CLICKS', width / 2, height * 0.62, '24px Arial', '#aaaaaa', 'center');

            // Instruction
            this.drawText('Keep Clicking!', width / 2, height * 0.8, '20px Arial', '#00ff41', 'center');
        } else if (this.state === 'finished') {
            const rating = this.getRating(this.clicks);

            this.drawText('Test Complete!', width / 2, height * 0.2, '32px Arial', '#ffffff', 'center');

            // Final score
            this.drawText(this.clicks.toString(), width / 2, height * 0.4, 'bold 96px Arial', rating.color, 'center');
            this.drawText('CLICKS', width / 2, height * 0.52, '24px Arial', '#aaaaaa', 'center');

            // Stats
            this.drawText(`${this.getCPS()} clicks per second`, width / 2, height * 0.62, '20px Arial', '#ffffff', 'center');
            this.drawText(rating.text, width / 2, height * 0.72, '28px Arial', rating.color, 'center');

            if (this.clicks >= this.bestScore && this.clicks > 0) {
                this.drawText('🏆 NEW RECORD! 🏆', width / 2, height * 0.82, 'bold 20px Arial', '#FFD700', 'center');
            } else if (this.bestScore > 0) {
                this.drawText(`Best: ${this.bestScore} clicks`, width / 2, height * 0.82, '18px Arial', '#888888', 'center');
            }

            this.drawText('Click to try again', width / 2, height * 0.92, '16px Arial', '#666666', 'center');
        }
    }

    drawText(text, x, y, font, color, align = 'left') {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }

    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
    }
}

// Initialize game when DOM is loaded
window.initGame = function (canvas) {
    return new ClickSpeedGame(canvas);
};
