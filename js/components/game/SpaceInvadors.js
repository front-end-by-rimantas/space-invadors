import { Score } from './Score.js';
import { Lives } from './Lives.js';
import { Player } from './Player.js';
import { Bullet } from './Bullet.js';
import { EnemyBullet } from './EnemyBullet.js';
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
        this.unitRows = 9;
        this.unitsPerRow = 14;
        this.enemyMovingSpace = {
            total: 0,
            position: 0
        }
        this.screenHeight = 0;

        this.levelInfo = this.GAME.levels[this.GAME.currentLevel - 1];

        this.SCORE = new Score();
        this.LIVES = new Lives({
            GAME: this.GAME
        });
        this.PLAYER = new Player({
            PARENT: this
        });
        this.enemies = [];
        this.playerBullets = [];
        this.enemiesBullets = [];

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
        let dt = (now - this.now) / 1000;
        if (dt > 0.2) dt = 0.017;
        this.now = now;

        // jeigu zaidejas spaudzia i kaire/desine - reikia ji pajudinti
        this.PLAYER.move(dt);

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
            bullet.move(dt);
        }

        //pasaliname zaidejo kulkas is atminties, jei jos iskrido uz ekrano
        this.playerBullets = this.playerBullets.filter(b => b.position.y >= 0);

        // pajudiname priesus
        // leidziame priesams nuspresti ar jie nori sauti
        for (let enemy of this.enemies) {
            enemy.move(dt);
            if (enemy.canShoot) {
                enemy.canShoot = false;
                const enemyTop = enemy.position.y;
                const totalRows = this.levelInfo.enemies.length;
                const rowHeight = this.PLAYER.size / this.spaceRatioBetweenPlanes * (totalRows - enemy.rowIndex + 1);
                const distance = this.screenHeight - enemyTop + rowHeight;
                this.enemiesBullets.push(new EnemyBullet({
                    PARENT: this,
                    distance: distance,
                    // distance: this.screenHeight - enemy.position.y,
                    id: ++this.totalBulletsShot,
                    x: enemy.position.x + this.PLAYER.size / 2,
                    y: enemy.position.y
                }));
            }
        }

        // pajudiname prieso kulkas
        for (let bullet of this.enemiesBullets) {
            bullet.move(dt);
        }

        //pasaliname zaidejo kulkas is atminties, jei jos iskrido uz ekrano
        this.enemiesBullets = this.enemiesBullets.filter(b => b.position.y <= this.screenHeight);

        // kartojame zaidimo peisimo cikla
        requestAnimationFrame(() => {
            this.gameStep();
        });
    }

    generateEnemies() {
        const size = this.calculateUnitSize();
        const rowCount = this.levelInfo.enemies.length;
        const planeShift = size * (1 - this.spaceRatioBetweenPlanes);

        const positionShift = (this.unitsPerRow - this.levelInfo.enemies[0].count) / 2;
        const firstOnLeftDistance = positionShift * size / this.spaceRatioBetweenPlanes + planeShift;

        this.enemyMovingSpace.total = firstOnLeftDistance * 2;
        this.enemyMovingSpace.position = firstOnLeftDistance;

        let id = 0;
        const initialEnemyDirection = Math.random() < 0.5 ? -1 : 1;

        for (let row of this.levelInfo.enemies) {
            const positionY = (rowCount - row.rowIndex + 1) * size / this.spaceRatioBetweenPlanes;

            for (let i = 0; i < row.count; i++) {
                const x = (i + positionShift) * size / this.spaceRatioBetweenPlanes + planeShift;

                this.enemies.push(new Enemy({
                    PARENT: this,
                    id: ++id,
                    rowIndex: row.rowIndex,
                    type: row.type,
                    direction: initialEnemyDirection,
                    y: positionY,
                    x,
                    size
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

        this.screenHeight = parseInt(this.groundDOM.style.height);
        this.initialBulletTopPosition = this.screenHeight - this.PLAYER.size * 2;
    }
}

export { SpaceInvadors }