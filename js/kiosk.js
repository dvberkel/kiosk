var kiosk = (function(){
    function forEach(htmlCollection, callback) {
	for (var index = 0, length = htmlCollection.length; index < length; index++) {
	    var item = htmlCollection[index];
	    callback.call(htmlCollection, item, index);
	}
    }

    doNothing = function(){ /* do nothing */ }
    var Config = function(htmlElement, callbacks) {
	this.htmlElement = htmlElement;
	this.loadCallback = callbacks.loadCallback || doNothing;
	this.pushCallback = callbacks.pushCallback || doNothing;
	this.loopCallback = callbacks.loopCallback || doNothing;
	this.create();
    }
    Config.prototype.create = function(){
	this.clear()
	this.populate();
    }
    Config.prototype.clear = function(){
	forEach(this.htmlElement.children, function(child){
	    this.removeChild(child);
	}.bind(this.htmlElement));
    }
    Config.prototype.populate = function(){
	var container = this.container();
	container.appendChild(this.input());
	container.appendChild(this.loadButton());
	container.appendChild(this.pushButton());
	container.appendChild(this.loopButton());

	this.htmlElement.appendChild(container);
    }
    Config.prototype.input = function(){
	if (!this._input) {
	    var input = this._input = document.createElement('input');
	    input.setAttribute('type', 'test');
	}
	return this._input;
    }
    Config.prototype.loadButton = function(){
	if (!this._loadButton) {
	    var button = this._loadButton = document.createElement('button');
	    button.textContent = 'Load';
	    button.addEventListener('click', this.loadCallback.bind(this));
	}
	return this._loadButton;
    }
    Config.prototype.pushButton = function(){
	if (!this._pushButton) {
	    var button = this._pushButton = document.createElement('button');
	    button.textContent = 'Push';
	    button.addEventListener('click', this.pushCallback.bind(this));
	}
	return this._pushButton;
    }
    Config.prototype.loopButton = function(){
	if (!this._loopButton) {
	    var button = this._loopButton = document.createElement('button');
	    button.textContent = 'Loop';
	    button.addEventListener('click', this.loopCallback.bind(this));
	}
	return this._loopButton;
    }
    Config.prototype.container = function(){
	var container = document.createElement('div');
	return container;
    }

    var Port = function(htmlElement) {
	this.htmlElement = htmlElement;
	this.create();
    }
    Port.prototype.create = function(){
	this.clear()
	this.populate();
    }
    Port.prototype.clear = function(){
	forEach(this.htmlElement.children, function(child){
	    this.removeChild(child);
	}.bind(this.htmlElement));
    }
    Port.prototype.populate = function(){
	var iframe = this.iframe();
	this.htmlElement.appendChild(iframe);
    }
    Port.prototype.iframe = function(){
	if (!this._iframe) {
	    var iframe = this._iframe = document.createElement('iframe');
	}
	return this._iframe;
    }
    Port.prototype.load = function(url){
	var iframe = this.iframe();
	iframe.setAttribute('src', url);
    }

    var Kiosk = function(){
	this.urls = [];
	this.ports = [];
    }
    Kiosk.prototype.createPort = function(htmlElement){
	var port = new Port(htmlElement);
	this.ports.push(port);
    }
    Kiosk.prototype.createConfig = function(htmlElement){
	var kiosk = this;
	var interval = undefined;
	new Config(htmlElement, {
	    loadCallback: function(){
		var input = this.input();
		kiosk.load(input.value);
	    },
	    pushCallback: function(){
		var input = this.input();
		kiosk.push(input.value);
	    },
	    loopCallback: function(){
		if (!interval) {
		    interval = setInterval(kiosk.loadNextInloop.bind(kiosk), 5 * 1000);
		} else {
		    clearInterval(interval);
		    interval = undefined;
		}
	    }
	});
    }
    Kiosk.prototype.load = function(url){
	this.ports.forEach(function(port){
	    port.load(url);
	});
    }
    Kiosk.prototype.push = function(url){
	this.urls.push(url);
    }
    Kiosk.prototype.loadNextInloop = function(){
	if (!this.current) { this.current = 0; }
	var n = this.urls.length;
	if (n > 0 && this.current < n) {
	    var url = this.urls[this.current];
	    this.load(url);
	}
	this.current = (this.current+1) % n;
    }

    var kiosk = new Kiosk();

    forEach(document.getElementsByClassName('config'), kiosk.createConfig.bind(kiosk));
    forEach(document.getElementsByClassName('port'), kiosk.createPort.bind(kiosk));

    return kiosk;
})();
