import * as Phaser from "phaser";
import Preload from "./scenes/Preload";
import Game from "./scenes/Game";
import UI from "./scenes/UI";
import Menu from "./scenes/Menu";
import { PhaserNavMeshPlugin } from "phaser-navmesh";
import './assets/sass/main.scss';

// Game configuration
const Config: Phaser.Types.Core.GameConfig = {
	parent: "game",
	type: Phaser.WEBGL,
	disableContextMenu: true,
	dom: {
		createContainer: true,
	},
	version: "Alpha 3.9.0",
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
    scale: {
		width: 1280,
		height: 720,
		mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		resizeInterval: 100,
    },
	banner: true,
	antialiasGL: true,
	pixelArt: true,
	roundPixels: true,
}

// Check for WebGLRenderingContext
try {
	var canvas = document.createElement('canvas'); 
	canvas.setAttribute("id", "webgltest");
	if (!window.WebGLRenderingContext || (canvas.getContext('webgl') === null && canvas.getContext('experimental-webgl') === null)){
		console.log("WebGL not supported, falling back to 2D context.");
		throw new Error("No WebGLRenderingContext");
	}
	console.log("WebGL is supported, initializing game.");
	new Phaser.Game(Config);
} catch (e) {
	console.error(e);
}