import { Score } from './Score.js';
import { Lives } from './Lives.js';
import { Player } from './Player.js';

class SpaceInvadors {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '#game';
        this.DOM = null;
        this.groundDOM = null;

        this.SCORE = new Score();
        this.LIVES = new Lives({
            GAME: this.GAME
        });
        this.PLAYER = new Player({
            PARENT: this
        });

        this.init();
    }

    init() {

    }

    generateEnemies() {
        console.log('generuoju priesus...');
    }

    generatePlayer() {
        console.log('generuoju zaideja...');
        this.PLAYER.render();
    }

    calculateUnitSize() {
        if (!this.groundDOM) {
            return;
        }

        let size = 0;
        const groundWidth = this.groundDOM.offsetWidth;         // 1400
        const groundHeight = this.groundDOM.offsetHeight;       // 800
        const unitRows = 8;
        const unitColumn = 10;
        const unitsPerRow = 14;

        const maxUnitWidth = groundWidth / unitsPerRow;          // 140px
        const maxUnitHeight = groundHeight / unitRows;          // 100px

        if (maxUnitWidth > maxUnitHeight) {
            size = maxUnitHeight;
        } else {
            size = maxUnitWidth;
        }

        this.groundDOM.style.height = unitRows * size + 'px';
        this.groundDOM.style.width = unitsPerRow * size + 'px';
        this.groundDOM.classList.add('center');

        return size;
    }

    render() {
        this.DOM = document.querySelector(this.selector);

        const HTML = `<div class="score">Score: 0</div>
                    <div class="lives">Lives: 3</div>
                    <div class="ground"></div>`;
        this.DOM.innerHTML = HTML;
        this.groundDOM = this.DOM.querySelector('.ground');

        this.SCORE.render();
        this.LIVES.render();

        this.generateEnemies();
        this.generatePlayer();
    }
}

export { SpaceInvadors }