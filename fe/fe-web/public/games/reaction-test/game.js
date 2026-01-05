// Reaction Time Test Game
class ReactionTimeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'waiting'; // waiting, ready, go, result
        this.startTime = 0;
        this.reactionTime = 0;
        this.attempts = [];
        this.waitTimeout = null;
        this.backgroundColor = '#1a1a2e';
        this.targetColor = '#00ff41';

        this.setupCanvas();
        this.setupEventListeners();
        this.showInstructions();
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
    }

    handleClick() {
        if (this.state === 'waiting') {
            this.startWaiting();
        } else if (this.state === 'go') {
            this.recordReaction();
        } else if (this.state === 'early') {
            // Do nothing, wait for the timer
        } else if (this.state === 'result') {
            this.reset();
        }
    }

    showInstructions() {
        this.state = 'waiting';
        this.render();
    }

    startWaiting() {
        this.state = 'ready';
        this.render();

        // Random delay between 2-5 seconds
        const delay = 2000 + Math.random() * 3000;

        this.waitTimeout = setTimeout(() => {
            this.showTarget();
        }, delay);

        // Check for early clicks
        this.canvas.addEventListener('click', this.earlyClickHandler = () => {
            if (this.state === 'ready') {
                clearTimeout(this.waitTimeout);
                this.state = 'early';
                this.render();
                setTimeout(() => {
                    this.reset();
                }, 2000);
            }
        }, { once: false });
    }

    showTarget() {
        this.state = 'go';
        this.startTime = Date.now();
        this.render();
    }

    recordReaction() {
        this.reactionTime = Date.now() - this.startTime;
        this.attempts.push(this.reactionTime);
        this.state = 'result';
        this.render();
    }

    reset() {
        if (this.waitTimeout) {
            clearTimeout(this.waitTimeout);
        }
        this.state = 'waiting';
        this.render();
    }

    getAverageTime() {
        if (this.attempts.length === 0) return 0;
        const sum = this.attempts.reduce((a, b) => a + b, 0);
        return Math.round(sum / this.attempts.length);
    }

    getRating(time) {
        if (time < 200) return { text: 'Excellent!', color: '#00ff41' };
        if (time < 250) return { text: 'Great!', color: '#4CAF50' };
        if (time < 300) return { text: 'Good', color: '#FFC107' };
        if (time < 400) return { text: 'Average', color: '#FF9800' };
        return { text: 'Slow', color: '#f44336' };
    }

    render() {
        const { width, height } = this.canvas;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, width, height);

        if (this.state === 'waiting') {
            this.drawText('Reaction Time Test', width / 2, height / 3, '32px Arial', '#ffffff', 'center');
            this.drawText('Click anywhere to start', width / 2, height / 2, '24px Arial', '#aaaaaa', 'center');

            if (this.attempts.length > 0) {
                this.drawText(`Average: ${this.getAverageTime()}ms`, width / 2, height * 0.65, '20px Arial', '#4CAF50', 'center');
                this.drawText(`Attempts: ${this.attempts.length}`, width / 2, height * 0.75, '18px Arial', '#888888', 'center');
            }
        } else if (this.state === 'ready') {
            this.ctx.fillStyle = '#ff3333';
            this.ctx.fillRect(0, 0, width, height);
            this.drawText('Wait for GREEN...', width / 2, height / 2, '36px Arial', '#ffffff', 'center');
            this.drawText("Don't click yet!", width / 2, height * 0.6, '20px Arial', '#ffcccc', 'center');
        } else if (this.state === 'go') {
            this.ctx.fillStyle = this.targetColor;
            this.ctx.fillRect(0, 0, width, height);
            this.drawText('CLICK NOW!', width / 2, height / 2, '48px Arial', '#000000', 'center');
        } else if (this.state === 'early') {
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.fillRect(0, 0, width, height);
            this.drawText('Too Early!', width / 2, height / 2, '42px Arial', '#ffffff', 'center');
            this.drawText('Wait for the green screen', width / 2, height * 0.6, '20px Arial', '#ffcccc', 'center');
        } else if (this.state === 'result') {
            const rating = this.getRating(this.reactionTime);
            this.drawText('Your Reaction Time', width / 2, height * 0.25, '24px Arial', '#ffffff', 'center');
            this.drawText(`${this.reactionTime}ms`, width / 2, height * 0.45, '56px Arial', rating.color, 'center');
            this.drawText(rating.text, width / 2, height * 0.6, '32px Arial', rating.color, 'center');

            if (this.attempts.length > 1) {
                this.drawText(`Average: ${this.getAverageTime()}ms`, width / 2, height * 0.75, '20px Arial', '#aaaaaa', 'center');
            }

            this.drawText('Click to try again', width / 2, height * 0.88, '18px Arial', '#666666', 'center');
        }
    }

    drawText(text, x, y, font, color, align = 'left') {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }
}

// Initialize game when DOM is loaded
window.initGame = function (canvas) {
    return new ReactionTimeGame(canvas);
};
