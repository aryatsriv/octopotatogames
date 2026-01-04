// Typing Speed Test Game
class TypingSpeedGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'idle'; // idle, countdown, running, finished
        this.currentText = '';
        this.userInput = '';
        this.timeLeft = 60;
        this.gameTimer = null;
        this.countdownTimer = null;
        this.startTime = 0;
        this.errors = 0;
        this.bestWPM = localStorage.getItem('typingSpeedBest') || 0;
        this.countdown = 3;

        this.sampleTexts = [
            "The quick brown fox jumps over the lazy dog near the riverbank.",
            "Programming is not about typing, it's about thinking and problem solving.",
            "Practice makes perfect, but perfect practice makes permanent improvement.",
            "Technology is best when it brings people together and solves real problems.",
            "The only way to do great work is to love what you do every single day.",
            "Success is not final, failure is not fatal, it is the courage to continue.",
            "Innovation distinguishes between a leader and a follower in any field.",
            "Life is what happens when you're busy making other plans for tomorrow.",
            "The future belongs to those who believe in the beauty of their dreams.",
            "Code is like humor. When you have to explain it, it's bad programming."
        ];

        this.setupCanvas();
        this.setupKeyboardListeners();
        this.selectRandomText();
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

    setupKeyboardListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.canvas.addEventListener('click', () => this.handleCanvasClick());
    }

    handleCanvasClick() {
        if (this.state === 'idle') {
            this.startCountdown();
        } else if (this.state === 'finished') {
            this.resetGame();
        }
    }

    handleKeyPress(e) {
        if (this.state === 'idle' && e.key === 'Enter') {
            this.startCountdown();
            e.preventDefault();
        } else if (this.state === 'countdown') {
            // Ignore keyboard during countdown
            e.preventDefault();
        } else if (this.state === 'running') {
            e.preventDefault();

            if (e.key === 'Backspace') {
                this.userInput = this.userInput.slice(0, -1);
            } else if (e.key.length === 1) {
                this.userInput += e.key;

                // Check if character is wrong
                const currentIndex = this.userInput.length - 1;
                if (this.userInput[currentIndex] !== this.currentText[currentIndex]) {
                    this.errors++;
                }

                // Check if text is complete
                if (this.userInput === this.currentText) {
                    this.selectRandomText();
                    this.userInput = '';
                }
            }

            this.render();
        } else if (this.state === 'finished' && e.key === 'Enter') {
            this.resetGame();
        }
    }

    selectRandomText() {
        this.currentText = this.sampleTexts[Math.floor(Math.random() * this.sampleTexts.length)];
    }

    startCountdown() {
        this.state = 'countdown';
        this.countdown = 3;

        const countdownInterval = setInterval(() => {
            this.countdown--;
            this.render();

            if (this.countdown === 0) {
                clearInterval(countdownInterval);
                this.startGame();
            }
        }, 1000);
    }

    startGame() {
        this.state = 'running';
        this.userInput = '';
        this.errors = 0;
        this.timeLeft = 60;
        this.startTime = Date.now();
        this.selectRandomText();

        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.endGame();
            }
            this.render();
        }, 1000);

        this.render();
    }

    endGame() {
        clearInterval(this.gameTimer);
        this.state = 'finished';

        const wpm = this.calculateWPM();
        if (wpm > this.bestWPM) {
            this.bestWPM = Math.round(wpm);
            localStorage.setItem('typingSpeedBest', this.bestWPM);
        }

        this.render();
    }

    resetGame() {
        this.state = 'idle';
        this.userInput = '';
        this.errors = 0;
        this.timeLeft = 60;
        this.selectRandomText();
        this.render();
    }

    calculateWPM() {
        const timeElapsed = (60 - this.timeLeft) / 60; // in minutes
        const wordsTyped = this.userInput.length / 5; // standard: 5 chars = 1 word
        return timeElapsed > 0 ? wordsTyped / timeElapsed : 0;
    }

    calculateAccuracy() {
        if (this.userInput.length === 0) return 100;
        return Math.max(0, ((this.userInput.length - this.errors) / this.userInput.length) * 100);
    }

    getRating(wpm) {
        if (wpm >= 80) return { text: 'Professional!', color: '#00ff41' };
        if (wpm >= 60) return { text: 'Excellent!', color: '#4CAF50' };
        if (wpm >= 40) return { text: 'Great!', color: '#FFC107' };
        if (wpm >= 25) return { text: 'Good', color: '#FF9800' };
        return { text: 'Keep Practicing!', color: '#f44336' };
    }

    wrapText(text, maxWidth) {
        const words = text.split(' ');
        let line = '';
        let lines = [];

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = this.ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        return lines;
    }

    render() {
        const { width, height } = this.canvas;

        // Background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#0f0e17');
        gradient.addColorStop(1, '#1a1a2e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);

        if (this.state === 'idle') {
            this.drawText('Typing Speed Test', width / 2, height * 0.25, 'bold 42px Arial', '#ffffff', 'center');
            this.drawText('Test your typing speed and accuracy', width / 2, height * 0.35, '20px Arial', '#aaaaaa', 'center');

            // Instructions
            this.drawText('Click or press ENTER to start', width / 2, height * 0.5, '18px Arial', '#00ff41', 'center');
            this.drawText('Type the text that appears as fast as you can', width / 2, height * 0.58, '16px Arial', '#888888', 'center');
            this.drawText('You have 60 seconds', width / 2, height * 0.64, '16px Arial', '#888888', 'center');

            if (this.bestWPM > 0) {
                this.drawText(`Best Speed: ${this.bestWPM} WPM`, width / 2, height * 0.8, '20px Arial', '#4CAF50', 'center');
            }
        } else if (this.state === 'countdown') {
            this.drawText('Get Ready...', width / 2, height * 0.4, 'bold 36px Arial', '#ffffff', 'center');
            this.drawText(this.countdown.toString(), width / 2, height * 0.55, 'bold 120px Arial', '#00ff41', 'center');
        } else if (this.state === 'running') {
            // Timer and stats bar
            this.drawText(`Time: ${this.timeLeft}s`, width * 0.1, 40, 'bold 24px Arial', '#00ff41', 'left');

            const wpm = Math.round(this.calculateWPM());
            const accuracy = Math.round(this.calculateAccuracy());

            this.drawText(`WPM: ${wpm}`, width * 0.5, 40, 'bold 24px Arial', '#ffffff', 'center');
            this.drawText(`Accuracy: ${accuracy}%`, width * 0.9, 40, 'bold 24px Arial', accuracy >= 95 ? '#4CAF50' : '#FFC107', 'right');

            // Text to type
            const textY = height * 0.35;
            this.ctx.font = '24px monospace';

            // Draw the text with proper coloring
            let x = width * 0.075;
            let y = textY;

            for (let i = 0; i < this.currentText.length; i++) {
                const char = this.currentText[i];

                if (i < this.userInput.length) {
                    // Already typed
                    if (this.userInput[i] === char) {
                        this.ctx.fillStyle = '#4CAF50'; // Correct
                    } else {
                        this.ctx.fillStyle = '#ff3333'; // Wrong
                    }
                } else if (i === this.userInput.length) {
                    // Current character to type
                    this.ctx.fillStyle = '#00ff41';

                    // Draw cursor
                    this.ctx.fillRect(x, y - 20, 2, 26);
                } else {
                    // Not yet typed
                    this.ctx.fillStyle = '#666666';
                }

                this.ctx.fillText(char, x, y);
                x += this.ctx.measureText(char).width;

                // Wrap to next line if needed
                if (x > width * 0.925 && char === ' ') {
                    x = width * 0.075;
                    y += 35;
                }
            }

            // User input display (for reference)
            this.drawText('Keep typing...', width / 2, height * 0.75, '18px Arial', '#888888', 'center');

        } else if (this.state === 'finished') {
            const wpm = Math.round(this.calculateWPM());
            const accuracy = Math.round(this.calculateAccuracy());
            const rating = this.getRating(wpm);

            this.drawText('Test Complete!', width / 2, height * 0.2, 'bold 36px Arial', '#ffffff', 'center');

            // WPM Score
            this.drawText(wpm.toString(), width / 2, height * 0.4, 'bold 96px Arial', rating.color, 'center');
            this.drawText('WPM', width / 2, height * 0.5, '24px Arial', '#aaaaaa', 'center');

            // Rating
            this.drawText(rating.text, width / 2, height * 0.6, '28px Arial', rating.color, 'center');

            // Stats
            this.drawText(`Accuracy: ${accuracy}%`, width / 2, height * 0.7, '20px Arial', '#ffffff', 'center');
            this.drawText(`Errors: ${this.errors}`, width / 2, height * 0.76, '18px Arial', '#888888', 'center');

            if (wpm >= this.bestWPM && wpm > 0) {
                this.drawText('🏆 NEW RECORD! 🏆', width / 2, height * 0.84, 'bold 20px Arial', '#FFD700', 'center');
            } else if (this.bestWPM > 0) {
                this.drawText(`Best: ${this.bestWPM} WPM`, width / 2, height * 0.84, '18px Arial', '#4CAF50', 'center');
            }

            this.drawText('Click or press ENTER to try again', width / 2, height * 0.92, '16px Arial', '#666666', 'center');
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
    return new TypingSpeedGame(canvas);
};
