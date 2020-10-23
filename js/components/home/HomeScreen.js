import { GameSetupForm } from './GameSetupForm.js';
import { ScoreTable } from './ScoreTable.js';
import { Fullscreen } from './Fullscreen.js';

class HomeScreen {
    constructor(params) {
        this.selector = '#game';
        this.DOM = document.querySelector(this.selector);

        this.TABLE = new ScoreTable();
        this.FORM = new GameSetupForm();
        this.FULLSCREEN = new Fullscreen();

        this.init();
    }

    init() {

    }

    /**
     * Metodas Home screen turiniui generuoti
     */
    render() {
        const HTML = `<div class="table">TABLE</div>
                    <div class="form">FORM</div>
                    <div class="fullscreen">FULLSCREEN</div>`;
        this.DOM.innerHTML = HTML;

        this.TABLE.render();
        this.FORM.render();
        this.FULLSCREEN.render();
    }
}

export { HomeScreen }