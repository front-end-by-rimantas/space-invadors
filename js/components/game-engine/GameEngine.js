import { SpaceInvadors } from '../game/SpaceInvadors.js';
import { HomeScreen } from '../home/HomeScreen.js';

class GameEngine {
    constructor(params) {
        this.HOME = new HomeScreen({
            GAME: this
        });
        this.GAME = new SpaceInvadors({
            GAME: this
        });

        this.init();
    }

    init() {
        this.HOME.render();
    }

    switchPage(page) {
        switch (page) {
            case 'home':
                this.HOME.render();
                break;
            case 'game':
                this.GAME.render();
                break;
            default:
                console.error(`ERROR: toks (${page}) psl nenumatytas`);
                break;
        }
    }
}

export { GameEngine }