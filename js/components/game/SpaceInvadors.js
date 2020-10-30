import { Score } from './Score.js';
import { Lives } from './Lives.js';
import { Player } from './Player.js';
import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';

class SpaceInvadors {
    constructor(params) {
        this.GAME = params.GAME;

        this.selector = '#game';
        this.DOM = null;
        this.groundDOM = null;
        this.now = Date.now();
        this.totalBulletsShot = 0;
        this.initialBulletTopPosition = 0;
        this.spaceRatioBetweenPlanes = 2 / 3;
        this.unitRows = 8;
        this.unitsPerRow = 14;

        this.levelInfo = this.GAME.levels[this.GAME.currentLevel - 1];

        this.SCORE = new Score();
        this.LIVES = new Lives({
            GAME: this.GAME
        });
        this.PLAYER = new Player({
            PARENT: this
        });
        this.playerBullets = [];
        this.enemies = [];

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
        if (this.PLAYER.canPlayerShoot()) {
            this.PLAYER.lastShotTime = 0;
            this.playerBullets.push(new Bullet({
                PARENT: this,
                distance: 500,
                id: ++this.totalBulletsShot,
                x: this.PLAYER.positionX + this.PLAYER.size / 2,
                y: this.initialBulletTopPosition
            }));
        }

        // pajudiname zaidejo kulkas
        for (let bullet of this.playerBullets) {
            bullet.move(diff);
        }
        //pasaliname kulkas is atminties, jei jos iskrido uz ekrano
        this.playerBullets = this.playerBullets.filter(b => b.position.y >= 0);

        // pajudiname priesus
        // leidziame priesams nuspresti ar jie nori sauti
        requestAnimationFrame(() => {
            this.gameStep();
        });
    }

    generateEnemies() {
        const size = this.calculateUnitSize();
        const rowCount = this.levelInfo.enemies.length;
        let id = 0;
        for (let row of this.levelInfo.enemies) {
            const positionY = (rowCount - row.rowIndex + 1) * size / this.spaceRatioBetweenPlanes;

            for (let i = 0; i < row.count; i++) {
                const positionShift = (this.unitsPerRow - row.count) / 2;
                const x = (i + positionShift) * size / this.spaceRatioBetweenPlanes;

                this.enemies.push(new Enemy({
                    PARENT: this,
                    id: ++id,
                    type: row.type,
                    x: x,
                    y: positionY,
                    size: size
                }));
            }
        }
    }

    generatePlayer() {
        this.PLAYER.render();
    }

    calculateUnitSize() {
        if (!this.groundDOM) {
            return;
        }

        let size = 0;
        const groundWidth = this.groundDOM.offsetWidth;         // 1400
        const groundHeight = this.groundDOM.offsetHeight;       // 800

        const maxUnitWidth = groundWidth / this.unitsPerRow;          // 140px
        const maxUnitHeight = groundHeight / this.unitRows;          // 100px

        if (maxUnitWidth > maxUnitHeight) {
            size = maxUnitHeight;
        } else {
            size = maxUnitWidth;
        }


        this.groundDOM.style.height = this.unitRows * size + 'px';
        this.groundDOM.style.width = this.unitsPerRow * size + 'px';
        this.groundDOM.classList.add('center');

        // lektuvo dydis santykiu 1:2, jog butu vietos tarpams tart prieso lektuvu
        size *= this.spaceRatioBetweenPlanes;

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

        this.initialBulletTopPosition = parseInt(this.groundDOM.style.height) - this.PLAYER.size;
    }
}

export { SpaceInvadors }