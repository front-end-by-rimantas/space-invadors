class GameSetupForm {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '.form';
        this.DOM = null;
        this.inputDOM = null;
        this.btnDOM = null;
    }

    /**
     * Metodas Game setup formos turiniui generuoti
     */
    render() {
        this.DOM = document.querySelector(this.selector);

        const HTML = `<input type="text" value="">
                    <div class="btn">Play!</div>`;
        this.DOM.innerHTML = HTML;
        this.inputDOM = this.DOM.querySelector('input');
        this.btnDOM = this.DOM.querySelector('.btn');

        this.btnDOM.addEventListener('click', () => {
            this.GAME.switchPage('game');
        })
    }
}

export { GameSetupForm }