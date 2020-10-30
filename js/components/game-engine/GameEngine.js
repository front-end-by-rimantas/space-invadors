import { levelsData } from '../../data/levels.js';
import { SpaceInvadors } from '../game/SpaceInvadors.js';
import { HomeScreen } from '../home/HomeScreen.js';

class GameEngine {
    constructor(params) {
        this.levels = levelsData;
        this.currentLevel = 1;

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
                this.GAME.start();
                break;
            default:
                console.error(`ERROR: toks (${page}) psl nenumatytas`);
                break;
        }
    }
}

export { GameEngine }