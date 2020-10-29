import { GameSetupForm } from './GameSetupForm.js';
import { ScoreTable } from './ScoreTable.js';
import { Fullscreen } from './Fullscreen.js';

class HomeScreen {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '#game';
        this.DOM = document.querySelector(this.selector);

        this.TABLE = new ScoreTable();
        this.FORM = new GameSetupForm({
            GAME: this.GAME
        });
        this.FULLSCREEN = new Fullscreen();

        this.init();
    }

    init() {

    }

    /**
     * Metodas Home screen turiniui generuoti
     */
    render() {
        const HTML = `<div class="fullscreen">FULLSCREEN</div>
                    <div class="half table">TABLE</div>
                    <div class="half form">FORM</div>`;
        this.DOM.innerHTML = HTML;
        this.DOM.dataset.page = 'home';

        this.TABLE.render();
        this.FORM.render();
        this.FULLSCREEN.render();
    }
}

export { HomeScreen }