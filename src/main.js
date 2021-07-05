import Phaser from 'phaser'

import SmartRotationScene from './scenes/SmartRotationScene'

const config = {
	type: Phaser.AUTO,
	width: 700,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [SmartRotationScene]
}

export default new Phaser.Game(config)
