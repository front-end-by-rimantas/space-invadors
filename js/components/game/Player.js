class Player {
    constructor(params) {
        this.PARENT = params.PARENT;

        this.DOM = null;
        this.size = null;
        this.positionX = 0;
        this.mostLeftPosition = 0;
        this.direction = 0;
        this.speed = 250;

        this.playerWantsToShoot = false;
        this.shootingRate = 1;                  // sekundemis
        this.lastShotTime = 1;

        this.imageIndex = Math.ceil(Math.random() * 3);
        this.playerImage = `playerShip${this.imageIndex}_green.png`;
    }

    render() {
        this.size = this.PARENT.calculateUnitSize();
        const groundWidth = parseInt(this.PARENT.groundDOM.style.width);
        this.mostLeftPosition = groundWidth - this.size;
        this.positionX = this.mostLeftPosition / 2;

        console.log(this);

        const HTML = `<img class="player"
                            src="./img/units/${this.playerImage}"
                            style="width: ${this.size}px;
                                height: ${this.size}px;
                                left: ${this.positionX}px;">`;
        this.PARENT.groundDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.PARENT.groundDOM.querySelector('.player');

        this.addEvent();
    }

    addEvent() {
        // stebim klavietura (left, right, space)
        addEventListener('keydown', ({ code }) => {
            switch (code) {
                case "ArrowLeft":
                    this.direction = -1;
                    break;
                case "ArrowRight":
                    this.direction = 1;
                    break;
                case "Space":
                    this.playerWantsToShoot = true;
                    break;
                default:
                    break;
            }
        })
        addEventListener('keyup', ({ code }) => {
            switch (code) {
                case "ArrowLeft":
                case "ArrowRight":
                    this.direction = 0;
                    break;
                case "Space":
                    this.playerWantsToShoot = false;
                    break;
                default:
                    break;
            }
        })
    }

    // TODO: gal verta pervadinti i "update"?
    move(diff) {
        this.lastShotTime += diff;
        this.positionX += this.direction * diff * this.speed;
        if (this.positionX < 0) {
            this.positionX = 0;
        }
        if (this.positionX > this.mostLeftPosition) {
            this.positionX = this.mostLeftPosition;
        }
        this.DOM.style.left = this.positionX + 'px';
    }

    canPlayerShoot() {
        return this.shootingRate <= this.lastShotTime && this.playerWantsToShoot;
    }
}

export { Player }