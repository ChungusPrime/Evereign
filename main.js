const { app, BrowserWindow } = require('electron');
const { console } = require('inspector');
const path = require('path');
const fs = require('fs');

// Override the default userData path
const portableUserDataPath = path.join(process.cwd(), 'userdata');

// Ensure the folder exists
if (!fs.existsSync(portableUserDataPath)) {
  fs.mkdirSync(portableUserDataPath);
}

app.setPath('userData', portableUserDataPath);

let mainWindow;

function createWindow() {
	
	const WindowConfig = {
		width: 1280,
		height: 720,
		resizable: true,
		maximizable: true,
		minimizable: true,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: false,
		},
	};
	
	mainWindow = new BrowserWindow(WindowConfig);
	
	mainWindow.setMenu(null);
	
	mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
	
	mainWindow.on('closed', function () {
		mainWindow = null;
		app.quit();
	});
	
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin')
		app.quit();
});

app.on('quit-app', function () {
	if (process.platform !== 'darwin')
		app.quit();
});

app.on('activate', function () {
	if (mainWindow === null)
		createWindow();
});