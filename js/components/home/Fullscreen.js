class Fullscreen {
    constructor() {
        this.selector = '.fullscreen';
        this.DOM = null;
    }

    render() {
        this.DOM = document.querySelector(this.selector);
        this.DOM.innerHTML = '[ Fullscreen ]';
        this.DOM.addEventListener('click', this.openFullscreen);
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