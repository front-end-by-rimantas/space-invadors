class Player {
    constructor(params) {
        this.PARENT = params.PARENT;

        this.DOM = null;
        this.size = null;
        this.positionX = 0;

        this.imageIndex = Math.ceil(Math.random() * 3);
        this.playerImage = `playerShip${this.imageIndex}_green.png`;
    }

    render() {
        this.size = this.PARENT.calculateUnitSize();

        const HTML = `<img class="player"
                            src="./img/units/${this.playerImage}"
                            style="width: ${this.size}px; height: ${this.size}px;">`;
        this.PARENT.groundDOM.insertAdjacentHTML('beforeend', HTML);

        this.DOM = this.PARENT.groundDOM.querySelector('.player');
    }
}

export { Player }