class Bullet {
    constructor(params) {
        const bulletWidth = 6;
        this.PARENT = params.PARENT;
        this.maxDistance = params.distance;
        this.id = params.id;
        this.position = {
            x: params.x - bulletWidth / 2,
            y: params.y
        };
        this.speed = 500;

        this.DOM = null;

        this.render();
    }

    render() {
        const id = 'bullet_' + this.id;
        const HTML = `<div id="${id}" class="bullet player"
                        style="top: ${this.position.y}px; left: ${this.position.x}px;"></div>`;
        this.PARENT.groundDOM.insertAdjacentHTML('afterbegin', HTML);
        this.DOM = this.PARENT.groundDOM.querySelector('#' + id);
    }

    move(diff) {
        this.position.y -= diff * this.speed;
        if (this.position.y < 0) {
            this.DOM.remove();
        }
        this.DOM.style.top = this.position.y + 'px';
    }
}

export { Bullet }