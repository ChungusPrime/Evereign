import * as Phaser from "phaser";
(window as any).Phaser = Phaser;

import './assets/sass/main.scss';
import { Config } from "./config";

try {
	var canvas = document.createElement('canvas'); 
	canvas.setAttribute("id", "webgltest");
	if (!window.WebGLRenderingContext || (canvas.getContext('webgl') === null && canvas.getContext('experimental-webgl') === null))
		throw new Error("No WebGLRenderingContext");
	new Phaser.Game(Config);
} catch (e) {
	console.warn(e);
}