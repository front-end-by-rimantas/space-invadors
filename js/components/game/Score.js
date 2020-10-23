class Score {
    constructor(params) {
        this.selector = '.score';
        this.DOM = null;
        this.pointsDOM = null;

        this.score = 0;
    }

    render() {
        this.DOM = document.querySelector(this.selector);
        const HTML = `<div class="label">Score:</div>
                    <div class="value">0</div>`;
        this.DOM.innerHTML = HTML;
        this.pointsDOM = this.DOM.querySelector('.value');
    }

    update(points) {
        this.score += points;
        this.pointsDOM.innerText = this.score;
    }
}

export { Score }