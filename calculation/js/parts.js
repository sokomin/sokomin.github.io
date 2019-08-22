function appendScript(URL) {
	var el = document.createElement('script');
	el.src = URL;
	document.body.appendChild(el);
};