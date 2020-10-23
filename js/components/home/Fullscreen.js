class Fullscreen {
    constructor() {
        this.selector = '.fullscreen';
        this.DOM = null;
    }

    render() {
        this.DOM = document.querySelector(this.selector);

        const HTML = '<div class="btn">[ Fullscreen ]</div>';
        this.DOM.innerHTML = HTML;

        this.addEvents();
    }

    addEvents() {

    }
}

export { Fullscreen }