class EnemyBullet {
    constructor(params) {
        const bulletWidth = 6;
        this.bulletHeight = 28;
        this.PARENT = params.PARENT;
        this.maxDistance = params.distance;
        this.id = params.id;
        this.position = {
            x: params.x - bulletWidth / 2,
            y: params.y
        };
        this.speed = 200;

        this.DOM = null;

        this.render();
    }

    render() {
        const id = 'bullet_' + this.id;
        const HTML = `<div id="${id}" class="bullet enemy"
                        style="top: ${this.position.y}px; left: ${this.position.x}px;"></div>`;
        this.PARENT.groundDOM.insertAdjacentHTML('afterbegin', HTML);
        this.DOM = this.PARENT.groundDOM.querySelector('#' + id);
    }

    move(dt) {
        this.position.y += dt * this.speed;
        // TODO: paskaiciuoti tikraji auksti
        if (this.position.y > this.maxDistance - this.bulletHeight) {
            this.DOM.remove();
        }
        this.DOM.style.top = this.position.y + 'px';
    }
}

export { EnemyBullet }