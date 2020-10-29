class Lives {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '.lives';
        this.DOM = null;
        this.livesDOM = null;

        this.maxLives = 3;
        this.lives = 3;
    }

    hearts() {
        const empty = '<span class="dead">❤</span>'.repeat(this.maxLives - this.lives);
        const full = '<span class="alive">❤</span>'.repeat(this.lives);
        return empty + full;
    }

    render() {
        this.DOM = document.querySelector(this.selector);
        const HTML = `<div class="label">Lives:</div>
                    <div class="value">${this.hearts()}</div>`;
        this.DOM.innerHTML = HTML;
        this.livesDOM = this.DOM.querySelector('.value');
    }

    update() {
        this.lives--;
        this.livesDOM.innerText = this.hearts();

        if (this.lives === 0) {
            console.log('GAME OVER');
            setTimeout(() => {
                this.GAME.switchPage('home');
            }, 2000)
        }
    }
}

export { Lives }