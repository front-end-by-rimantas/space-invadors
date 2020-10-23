class Lives {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '.lives';
        this.DOM = null;
        this.livesDOM = null;

        this.lives = 3;
    }

    render() {
        this.DOM = document.querySelector(this.selector);
        const HTML = `<div class="label">Lives:</div>
                    <div class="value">3</div>`;
        this.DOM.innerHTML = HTML;
        this.livesDOM = this.DOM.querySelector('.value');
    }

    update() {
        this.lives--;
        this.livesDOM.innerText = this.lives;

        if (this.lives === 0) {
            console.log('GAME OVER');
            setTimeout(() => {
                this.GAME.switchPage('home');
            }, 2000)
        }
    }
}

export { Lives }