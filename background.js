function handleRequest(request, sender, sendResponse) {
	if (request === "options") {
		var response = JSON.parse(localStorage.getItem('__fullscreen-element-options')) || {};
		sendResponse(response);
	}
}
chrome.extension.onMessage.addListener(handleRequest);
