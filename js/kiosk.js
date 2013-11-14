(function(){
    function forEach(htmlCollection, callback) {
	for (var index = 0, length = htmlCollection.length; index < length; index++) {
	    var item = htmlCollection[index];
	    callback.call(htmlCollection, item, index);
	}
    }

    var Config = function(htmlElement) {
	this.htmlElement = htmlElement;
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
    Config.prototype.populate =  function(){
	var container = this.container();
	container.appendChild(this.input());
	container.appendChild(this.button());

	this.htmlElement.appendChild(container);
    }
    Config.prototype.input = function(){
	var input = document.createElement('input');
	input.setAttribute('type', 'test');
	return input;
    }
    Config.prototype.button = function(){
	var button = document.createElement('button');
	button.textContent = 'Load';
	return button;
    }
    Config.prototype.container = function(){
	var container = document.createElement('div');
	return container;
    }

    var configs = document.getElementsByClassName('config');
    forEach(configs, function createConfig(htmlElement){
	new Config(htmlElement);
    });
})();
