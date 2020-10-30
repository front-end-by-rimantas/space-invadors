import { enemiesData } from '../../data/enemies.js';

class Enemy {
    constructor(params) {
        this.PARENT = params.PARENT;
        this.type = params.type;
        this.id = params.id;
        this.lives = enemiesData[this.type].lives;
        this.shootingInterval = enemiesData[this.type].shootingInterval;
        this.shootingProbability = enemiesData[this.type].shootingProbability;
        this.position = {
            x: params.x,
            y: params.y
        }
        this.size = params.size;

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

    move(diff) {

    }
}

export { Enemy }