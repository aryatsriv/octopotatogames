// Click Speed Test Game - Multiple Duration Options
class ClickSpeedGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'menu'; // menu, running, finished
        this.clicks = 0;
        this.selectedDuration = 10;
        this.timeLeft = this.selectedDuration;
        this.countdownTimer = null;
        this.clickEffects = [];
        this.clicksPerSecond = []; // Track clicks for each second
        this.currentSecondClicks = 0;
        this.currentSecond = 0;
        this.bestScores = JSON.parse(localStorage.getItem('clickSpeedBests') || '{}');
        this.durations = [5, 10, 30, 60];
        this.startTime = 0;

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
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    handleMouseMove(e) {
        if (this.state === 'running' || this.state === 'menu') {
            this.canvas.style.cursor = 'pointer';
        } else if (this.state === 'finished') {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const { width, height } = this.canvas;

            const buttonWidth = 150;
            const buttonHeight = 50;
            const spacing = 20;
            const totalWidth = (buttonWidth * 2) + spacing;
            const startX = (width - totalWidth) / 2;
            const buttonY = height * 0.92;

            // Check if mouse is over any button
            const overButton = (
                (x >= startX && x <= startX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) ||
                (x >= startX + buttonWidth + spacing && x <= startX + totalWidth && y >= buttonY && y <= buttonY + buttonHeight)
            );

            this.canvas.style.cursor = overButton ? 'pointer' : 'default';
        } else {
            this.canvas.style.cursor = 'default';
        }
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.state === 'menu') {
            this.handleMenuClick(x, y);
        } else if (this.state === 'running') {
            this.registerClick(x, y);
        } else if (this.state === 'finished') {
            this.handleFinishedClick(x, y);
        }
    }

    handleFinishedClick(x, y) {
        const { width, height } = this.canvas;
        const buttonWidth = 150;
        const buttonHeight = 50;
        const spacing = 20;
        const totalWidth = (buttonWidth * 2) + spacing;
        const startX = (width - totalWidth) / 2;
        const buttonY = height * 0.92;

        // Try Again button
        const tryAgainX = startX;
        if (x >= tryAgainX && x <= tryAgainX + buttonWidth &&
            y >= buttonY && y <= buttonY + buttonHeight) {
            this.resetGame();
            return;
        }

        // Home/Menu button
        const menuX = startX + buttonWidth + spacing;
        if (x >= menuX && x <= menuX + buttonWidth &&
            y >= buttonY && y <= buttonY + buttonHeight) {
            this.resetGame();
            return;
        }
    }

    handleMenuClick(x, y) {
        const { width, height } = this.canvas;
        const buttonWidth = 100;
        const buttonHeight = 60;
        const spacing = 20;
        const totalWidth = (buttonWidth * 4) + (spacing * 3);
        const startX = (width - totalWidth) / 2;
        const buttonY = height * 0.5;

        this.durations.forEach((duration, index) => {
            const buttonX = startX + (index * (buttonWidth + spacing));
            if (x >= buttonX && x <= buttonX + buttonWidth &&
                y >= buttonY && y <= buttonY + buttonHeight) {
                this.selectedDuration = duration;
                this.startGame();
            }
        });
    }

    startGame() {
        this.state = 'running';
        this.clicks = 0;
        this.timeLeft = this.selectedDuration;
        this.clickEffects = [];
        this.clicksPerSecond = new Array(this.selectedDuration).fill(0);
        this.currentSecondClicks = 0;
        this.currentSecond = 0;
        this.startTime = Date.now();

        // Update countdown every 10ms for smooth display
        this.countdownTimer = setInterval(() => {
            this.timeLeft = Math.max(0, this.timeLeft - 0.01);

            // Track which second we're in
            const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
            if (elapsedSeconds !== this.currentSecond && elapsedSeconds < this.selectedDuration) {
                this.clicksPerSecond[this.currentSecond] = this.currentSecondClicks;
                this.currentSecond = elapsedSeconds;
                this.currentSecondClicks = 0;
            }

            if (this.timeLeft <= 0) {
                this.endGame();
            }
            this.render();
        }, 10);

        this.render();
    }

    registerClick(x, y) {
        this.clicks++;
        this.currentSecondClicks++;

        // Add click effect
        this.clickEffects.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 40,
            opacity: 1,
            createdAt: Date.now()
        });

        this.render();
    }

    endGame() {
        clearInterval(this.countdownTimer);
        this.state = 'finished';

        // Record last second's clicks
        if (this.currentSecond < this.selectedDuration) {
            this.clicksPerSecond[this.currentSecond] = this.currentSecondClicks;
        }

        // Save best score for this duration
        const key = `${this.selectedDuration}s`;
        if (!this.bestScores[key] || this.clicks > this.bestScores[key]) {
            this.bestScores[key] = this.clicks;
            localStorage.setItem('clickSpeedBests', JSON.stringify(this.bestScores));
        }

        this.render();
    }

    resetGame() {
        this.state = 'menu';
        this.clicks = 0;
        this.timeLeft = this.selectedDuration;
        this.clickEffects = [];
        this.clicksPerSecond = [];
        this.render();
    }

    getCPS() {
        return (this.clicks / this.selectedDuration).toFixed(2);
    }

    getRating(cps) {
        if (cps >= 10) return { text: 'INSANE!', color: '#ff00ff' };
        if (cps >= 8) return { text: 'Excellent!', color: '#00ff41' };
        if (cps >= 6) return { text: 'Great!', color: '#4CAF50' };
        if (cps >= 4) return { text: 'Good', color: '#FFC107' };
        if (cps >= 2) return { text: 'Average', color: '#FF9800' };
        return { text: 'Keep Trying!', color: '#f44336' };
    }

    updateClickEffects() {
        const now = Date.now();
        this.clickEffects = this.clickEffects.filter(effect => {
            const age = now - effect.createdAt;
            if (age > 400) return false;

            effect.radius = (age / 400) * effect.maxRadius;
            effect.opacity = 1 - (age / 400);
            return true;
        });
    }

    drawGraph() {
        const { width, height } = this.canvas;
        const graphWidth = Math.min(600, width * 0.8);
        const graphHeight = 180;
        const graphX = (width - graphWidth) / 2;
        const graphY = height * 0.48;
        const padding = 10;

        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.roundRect(graphX, graphY, graphWidth, graphHeight, 8);
        this.ctx.fill();

        // Title
        this.drawText('Clicks Per Second', width / 2, graphY - 10, 'bold 16px Arial', '#ffffff', 'center');

        const innerWidth = graphWidth - padding * 2;
        const innerHeight = graphHeight - padding * 2;
        const innerX = graphX + padding;
        const innerY = graphY + padding;

        // Find max value for scaling
        const maxClicks = Math.max(...this.clicksPerSecond, 1);
        const barWidth = innerWidth / this.clicksPerSecond.length;

        // Draw bars
        this.clicksPerSecond.forEach((clicks, index) => {
            const barHeight = (clicks / maxClicks) * innerHeight;
            const x = innerX + (index * barWidth);
            const y = innerY + innerHeight - barHeight;

            // Bar
            const gradient = this.ctx.createLinearGradient(x, y, x, innerY + innerHeight);
            gradient.addColorStop(0, '#00ff41');
            gradient.addColorStop(1, '#00aa2a');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x + 1, y, barWidth - 2, barHeight);

            // Value on top of bar if there's space
            if (clicks > 0 && barWidth > 20) {
                this.ctx.save();
                this.ctx.font = '10px Arial';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(clicks.toString(), x + barWidth / 2, y - 4);
                this.ctx.restore();
            }
        });

        // Grid lines
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = innerY + (innerHeight / 4) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(innerX, y);
            this.ctx.lineTo(innerX + innerWidth, y);
            this.ctx.stroke();
        }

        // X-axis labels (seconds)
        this.ctx.font = '10px Arial';
        this.ctx.fillStyle = '#aaaaaa';
        this.ctx.textAlign = 'center';
        const labelInterval = Math.ceil(this.clicksPerSecond.length / 10);
        this.clicksPerSecond.forEach((_, index) => {
            if (index % labelInterval === 0 || index === this.clicksPerSecond.length - 1) {
                const x = innerX + (index * barWidth) + barWidth / 2;
                this.ctx.fillText((index + 1).toString(), x, graphY + graphHeight + 14);
            }
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

        if (this.state === 'menu') {
            this.drawText('Click Speed Test', width / 2, height * 0.25, 'bold 42px Arial', '#ffffff', 'center');
            this.drawText('Select Duration:', width / 2, height * 0.38, '20px Arial', '#aaaaaa', 'center');

            // Draw duration buttons
            const buttonWidth = 100;
            const buttonHeight = 60;
            const spacing = 20;
            const totalWidth = (buttonWidth * 4) + (spacing * 3);
            const startX = (width - totalWidth) / 2;
            const buttonY = height * 0.5;

            this.durations.forEach((duration, index) => {
                const buttonX = startX + (index * (buttonWidth + spacing));

                this.ctx.fillStyle = '#00ff41';
                this.roundRect(buttonX, buttonY, buttonWidth, buttonHeight, 8);
                this.ctx.fill();

                this.drawText(`${duration}s`, buttonX + buttonWidth / 2, buttonY + 40, 'bold 24px Arial', '#000000', 'center');

                // Show best score for this duration
                const key = `${duration}s`;
                if (this.bestScores[key]) {
                    this.drawText(`Best: ${this.bestScores[key]}`, buttonX + buttonWidth / 2, buttonY + buttonHeight + 20, '12px Arial', '#4CAF50', 'center');
                }
            });

            this.drawText('Click a button to start!', width / 2, height * 0.8, '16px Arial', '#888888', 'center');
        } else if (this.state === 'running') {
            // Timer display
            this.drawText(this.timeLeft.toFixed(2) + 's', width / 2, height * 0.15, 'bold 48px Arial', '#00ff41', 'center');

            // Click counter - large and centered
            this.drawText(this.clicks.toString(), width / 2, height * 0.4, 'bold 120px Arial', '#ffffff', 'center');
            this.drawText('CLICKS', width / 2, height * 0.52, '24px Arial', '#aaaaaa', 'center');

            // Current CPS
            const elapsed = Math.max((Date.now() - this.startTime) / 1000, 0.1);
            const currentCPS = (this.clicks / elapsed).toFixed(2);
            this.drawText(`${currentCPS} clicks/sec`, width / 2, height * 0.62, '20px Arial', '#00ff41', 'center');

            // Instruction
            this.drawText('Keep Clicking!', width / 2, height * 0.75, '20px Arial', '#ffffff', 'center');
        } else if (this.state === 'finished') {
            const cps = parseFloat(this.getCPS());
            const rating = this.getRating(cps);
            const key = `${this.selectedDuration}s`;

            this.drawText('Test Complete!', width / 2, height * 0.08, '32px Arial', '#ffffff', 'center');

            // Final score
            this.drawText(this.clicks.toString(), width / 2, height * 0.18, 'bold 72px Arial', rating.color, 'center');
            this.drawText('TOTAL CLICKS', width / 2, height * 0.26, '18px Arial', '#aaaaaa', 'center');

            // Stats
            this.drawText(`Average: ${this.getCPS()} clicks per second`, width / 2, height * 0.34, '20px Arial', '#ffffff', 'center');
            this.drawText(rating.text, width / 2, height * 0.40, 'bold 24px Arial', rating.color, 'center');

            // Draw graph
            this.drawGraph();

            // Best score info
            if (this.clicks >= this.bestScores[key] && this.clicks > 0) {
                this.drawText('🏆 NEW RECORD! 🏆', width / 2, height * 0.88, 'bold 20px Arial', '#FFD700', 'center');
            } else if (this.bestScores[key]) {
                this.drawText(`Best: ${this.bestScores[key]} clicks (${(this.bestScores[key] / this.selectedDuration).toFixed(2)} CPS)`,
                    width / 2, height * 0.88, '16px Arial', '#888888', 'center');
            }

            // Draw buttons
            const buttonWidth = 150;
            const buttonHeight = 50;
            const spacing = 20;
            const totalWidth = (buttonWidth * 2) + spacing;
            const startX = (width - totalWidth) / 2;
            const buttonY = height * 0.92;

            // Try Again button
            this.ctx.fillStyle = '#00ff41';
            this.roundRect(startX, buttonY, buttonWidth, buttonHeight, 8);
            this.ctx.fill();
            this.drawText('Try Again', startX + buttonWidth / 2, buttonY + 32, 'bold 18px Arial', '#000000', 'center');

            // Menu button
            this.ctx.fillStyle = '#4CAF50';
            this.roundRect(startX + buttonWidth + spacing, buttonY, buttonWidth, buttonHeight, 8);
            this.ctx.fill();
            this.drawText('Menu', startX + buttonWidth + spacing + buttonWidth / 2, buttonY + 32, 'bold 18px Arial', '#000000', 'center');
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
