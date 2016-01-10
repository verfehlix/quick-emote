var gui = require('nw.gui');
var win = gui.Window.get();

//create tray icon
var tray = new gui.Tray({
	title: 'huehuehue',
	icon: "/img/tray.png",
	alticon: '',
	tooltip: window.document.title,
	iconsAreTemplates: false
});

//add event listeners
tray.on('click', toggleTrayMenuAt.bind(this));

win.on('blur', function() {
	//during dev, keep these commented out
	// win.hide();
	// win.shown = false;
}.bind(this));

// called when user click on tray icon
function toggleTrayMenuAt(position) {
	if (win.shown) {
		win.hide();
		win.shown = false;
	} else {
		translate(position);
		win.moveTo(position.x, 30);
		win.show();
		win.focus();
		win.shown = true;
	}
}

function translate(pos) {
	pos.x -= Math.floor(win.width / 2);
	pos.y -= 0;
}

function loadEmojis() {
	return require('./emojis.json');
}

function createEmojiHtml(emoji){
	var html = "";

	html += '<div class="mdl-cell mdl-cell--2-col">\n';
	html += '    <div id="'+ emoji.text +'" class="emoji-container mdl-js-ripple-effect">\n';
	html += '        <span class="mdl-ripple"></span>\n';
	html += '		' + emoji.emoji + '\n';
	html += '	</div>\n';
	html += '	<div class="mdl-tooltip" for="'+ emoji.text +'">\n'
	html += '		' + emoji.text + '\n';
	html += '	</div>\n';
	html += '</div>';

	return html;
}

function appendHtmlToGrid(html){
	var grid = document.getElementById('contentGrid');
	grid.insertAdjacentHTML('beforeend', html);
}

function fillGridWithEmojis() {
	var emojis = loadEmojis();

	for (var i = 0; i < emojis.length; i++) {
		var emoji = emojis[i];

		var emojiHtml = createEmojiHtml(emoji);

		appendHtmlToGrid(emojiHtml);
	};
}

fillGridWithEmojis();