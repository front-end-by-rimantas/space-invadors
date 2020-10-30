import { Score } from './Score.js';
import { Lives } from './Lives.js';
import { Player } from './Player.js';

class SpaceInvadors {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '#game';
        this.DOM = null;
        this.groundDOM = null;
        this.now = Date.now();

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

    start() {
        console.log(this);
        requestAnimationFrame(() => {
            this.gameStep();
        });
    }

    gameStep() {
        const now = Date.now();
        const diff = (now - this.now) / 1000;
        this.now = now;

        // jeigu zaidejas spaudzia i kaire/desine - reikia ji pajudinti
        this.PLAYER.move(diff);

        // jeigu zaidejas spaudzia space ir praejo reikiamas laiko tarpas - sauname
        // pajudiname priesus
        // leidziame priesams nuspresti ar jie nori sauti
        requestAnimationFrame(() => {
            this.gameStep();
        });
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