class GameSetupForm {
    constructor(params) {
        this.selector = '.form';
        this.DOM = null;
    }

    /**
     * Metodas Game setup formos turiniui generuoti
     */
    render() {
        this.DOM = document.querySelector(this.selector);

        const HTML = `<input type="text" value="">
                    <div class="btn">Play!</div>`;

        this.DOM.innerHTML = HTML;
    }
}

export { GameSetupForm }