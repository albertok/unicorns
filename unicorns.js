var cornify_count = 0;
var cornify_timer;
cornify_ie6_add = function() {
	cornify_count += 1;
	var cornify_url = 'http://www.cornify.com/';
	var div = document.createElement('div');
	var style = div.style;
	style.position = 'absolute';
	style.clear = 'both';

	var heightRandom = Math.random()*.75;
	var windowHeight = 768;
	var windowWidth = 1024;
	var height = 0;
	var width = 0;
	var de = document.documentElement;
	var bd = document.body;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth;
	} else if(de && de.clientHeight) {
		windowHeight = de.clientHeight;
		windowWidth = de.clientWidth;
	} else {
		height = Math.round( height*100 )+'%';
	}

	div.onclick = cornify_ie6_remove;
	style.zIndex = 10;
	style.outline = 0;

	if( cornify_count==1 ) {
		style.top = Math.max( 0, Math.round( (windowHeight-600)/2 ) )  + 'px';
		style.left = Math.round( (windowWidth-800)/2 ) + 'px';
		style.zIndex = 1000;
	} else {
		style.top = (e=de.scrollTop?e:bd.scrollTop) + Math.round( Math.random()*(windowHeight-200) )  + 'px';
		style.left = (e=de.scrollLeft?e:bd.scrollLeft) + Math.round( Math.random()*(windowWidth-200) )  + 'px';
	}

	if (cornify_count == 15) {
		clearInterval(cornify_timer);
	}

	var img = document.createElement('img');
	var currentTime = new Date();
	var submitTime = currentTime.getTime();
	if( cornify_count==1 ) submitTime = 1;
	img.setAttribute('src',cornify_url+'getacorn.php?r=' + submitTime + '&url='+document.location.href);
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(div);
	div.appendChild(img);

	// Add stylesheet.
	if (cornify_count == 5) {
		cornify_addcss('cornify');
		cornify_replace();
	}
}

cornify_ie6_remove = function() {
	this.style.display = 'none';
}

cornify_replace = function() {
	// Replace text.
	var hc = 6;
	var hs;
	var h;
	var k;
	var words = ['Happy','Sparkly','Glittery','Fun','Magical','Lovely','Cute','Charming','Amazing','Wonderful'];
	while(hc >= 1) {
		hs = document.getElementsByTagName('h' + hc);
		for (k = 0; k < hs.length; k++) {
			h = hs[k];
			h.innerHTML = words[Math.floor(Math.random()*words.length)] + ' ' + h.innerHTML;
		}
		hc-=1;
	}
}

cornify_addcss = function( file ) {
	var cssExisting = document.getElementById('__cornify_css_'+file);
	if (!cssExisting) {
		var head = document.getElementsByTagName("head")[0];
		var css = document.createElement('link');
		css.id = '__cornify_css_'+file;
		css.type = 'text/css';
		css.rel = 'stylesheet';
		css.href = 'http://www.cornify.com/css/'+file+'.css';
		css.media = 'screen';
		head.appendChild(css);
	}
}

cornify_init = function() {
	cornify_timer = setInterval('cornify_ie6_add()', 1000);
}

cornify_init();
