(function(){
    function forEach(htmlCollection, callback) {
	for (var index = 0, length = htmlCollection.length; index < length; index++) {
	    var item = htmlCollection[index];
	    callback.call(htmlCollection, item, index);
	}
    }

    var Config = function(htmlElement, callback) {
	this.htmlElement = htmlElement;
	this.callback = callback;
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
	container.appendChild(this.button());

	this.htmlElement.appendChild(container);
    }
    Config.prototype.input = function(){
	if (!this._input) {
	    var input = this._input = document.createElement('input');
	    input.setAttribute('type', 'test');
	}
	return this._input;
    }
    Config.prototype.button = function(){
	if (!this._button) {
	    var button = this._button = document.createElement('button');
	    button.textContent = 'Load';
	    button.addEventListener('click', this.callback.bind(this));
	}
	return this._button;
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

    function createConfig(htmlElement){
	new Config(htmlElement, function(){
	    var input = this.input();
	    console.log(input.value);
	});
    }

    function createPort(htmlElement){
	new Port(htmlElement);
    }

    forEach(document.getElementsByClassName('config'), createConfig);
    forEach(document.getElementsByClassName('port'), createPort);
})();
