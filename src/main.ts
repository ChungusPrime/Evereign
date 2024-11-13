import * as Phaser from "phaser";
import Preload from "./scenes/Preload";
import Game from "./scenes/Game";
import UI from "./scenes/UI";
import Menu from "./scenes/Menu";
import { PhaserNavMeshPlugin } from "phaser-navmesh";
import './sass/main.scss';

const Config: Phaser.Types.Core.GameConfig = {
	parent: "game",
	type: Phaser.WEBGL,
	width: window.innerWidth,
	height: window.innerHeight,
	disableContextMenu: true,
	version: "Alpha 1",
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
		mouse: true
	},
	plugins: {
		scene: [{
			key: "PhaserNavMeshPlugin",
			plugin: PhaserNavMeshPlugin,
			mapping: "navMeshPlugin",
			start: true
		}]
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
	antialiasGL: true,
	pixelArt: true,
	roundPixels: true
}

new Phaser.Game(Config);