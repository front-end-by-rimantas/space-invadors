import { enemiesData } from '../../data/enemies.js';

class Enemy {
    constructor(params) {
        this.PARENT = params.PARENT;
        this.type = params.type;
        this.id = params.id;
        this.rowIndex = params.rowIndex;
        this.lives = enemiesData[this.type].lives;
        this.shootingInterval = enemiesData[this.type].shootingInterval;
        this.shootingProbability = enemiesData[this.type].shootingProbability;
        this.timeToShoot = this.newTimeToShoot();
        this.canShoot = false;
        this.position = {
            x: params.x,
            y: params.y
        }
        this.availableSpace = {
            total: this.PARENT.enemyMovingSpace.total,
            position: this.PARENT.enemyMovingSpace.position
        }
        this.size = params.size;
        this.direction = params.direction;
        this.speed = 25;

        this.render();
    }

    render() {
        const HTML = `<img id="enemy_${this.id}" class="enemy"
                            src="./img/units/playerShip1_${this.type}.png"
                            style="width: ${this.size}px;
                                height: ${this.size}px;
                                left: ${this.position.x}px;
                                top: ${this.position.y}px;">`;
        this.PARENT.groundDOM.insertAdjacentHTML('afterbegin', HTML);

        this.DOM = this.PARENT.groundDOM.querySelector('#enemy_' + this.id);
    }

    move(dt) {
        this.timeToShoot -= dt;
        if (this.timeToShoot <= 0) {
            this.timeToShoot = this.newTimeToShoot();
            if (Math.random() < this.shootingProbability) {
                this.canShoot = true;
            }
        }

        const ds = this.direction * this.speed * dt
        this.position.x += ds;
        this.availableSpace.position += ds;

        if (this.availableSpace.position < 0 ||
            this.availableSpace.position > this.availableSpace.total) {
            this.direction *= -1;
        }

        if (this.availableSpace.position < 0) {
            this.availableSpace.position = 0;
        }
        if (this.availableSpace.position > this.availableSpace.total) {
            this.availableSpace.position = this.availableSpace.total;
        }

        this.DOM.style.left = this.position.x + 'px';
    }

    newTimeToShoot() {
        const [min, max] = this.shootingInterval;
        return min + Math.random() * (max - min);
    }
}

export { Enemy }