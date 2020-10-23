class Fullscreen {
    constructor() {
        this.selector = '.fullscreen';
        this.DOM = null;
    }

    render() {
        this.DOM = document.querySelector(this.selector);

        const HTML = '<div class="btn">[ Fullscreen ]</div>';
        this.DOM.innerHTML = HTML;

        const btn = this.DOM.querySelector('.btn');
        btn.addEventListener('click', this.openFullscreen)

    }

    openFullscreen() {
        const elem = document.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }
}

export { Fullscreen }