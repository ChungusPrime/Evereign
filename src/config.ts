// Scenes
import Preload from "./scenes/Preload";
import Game from "./scenes/Game";
import UI from "./scenes/UI";
import Menu from "./scenes/Menu";

// Plugins
import PhaserNavMeshPlugin from "phaser-navmesh";
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';

export const Config: Phaser.Types.Core.GameConfig = {
	parent: "game",
	type: Phaser.WEBGL,
	disableContextMenu: true,
	dom: {
		createContainer: true,
	},
	version: `Alpha ${PACKAGE_VERSION}`,
	fps: {
		limit: 60,
		target: 60
	},
	maxLights: 50,
	scene: [
		Preload,
		Menu,
		Game,
		UI
	],
	input: {
		keyboard: true,
		mouse: true,
		gamepad: false,
		touch: false
	},
	plugins: {
		scene: [
			{
				key: "PhaserNavMeshPlugin",
				plugin: PhaserNavMeshPlugin,
				mapping: "navMeshPlugin",
				start: true
			}
		],
		global: [
			{
				key: 'rexBBCodeTextPlugin',
				plugin: BBCodeTextPlugin,
				start: true
			}
		]
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
			gravity: {
				x: 0,
				y: 0,
			},
		},
	},
    scale: {
		width: 1280,
		height: 720,
		mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	banner: true,
	antialiasGL: true,
	pixelArt: true,
	roundPixels: true,
}