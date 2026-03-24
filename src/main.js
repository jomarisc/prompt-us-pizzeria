import { Start } from './scenes/Start.js';

const config = {
    type: Phaser.AUTO,
    title: 'Prompt Us Pizzeria',
    description: 'A educational prompt-engineering microgame.',
    parent: 'game-container',
    width: 1920,
    height: 1080,
    backgroundColor: '#e63232',
    pixelArt: true,
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            