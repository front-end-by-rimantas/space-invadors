import { SpaceInvadors } from '../game/SpaceInvadors.js';
import { HomeScreen } from '../home/HomeScreen.js';

class GameEngine {
    constructor(params) {
        this.HOME = new HomeScreen();
        this.GAME = new SpaceInvadors();

        this.init();
    }

    init() {
        this.HOME.render();
    }
}

export { GameEngine }