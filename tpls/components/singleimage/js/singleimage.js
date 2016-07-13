var Singleimage = ExClass(H5ComponentBase, {
    initialize: function($super, name, cfg) {
        $super(name, cfg);
        var defaultContainerCss = {
        	"width": "100%", 
	    	"height": "100%", 
	    	"overflow": "hidden", 
	    	"border-color": "rgb(204, 204, 204)", 
	    	"border-radius": "0px", 
	    	"transform": "rotate(0deg)", 
	    	"opacity": 1, 
	    	"border-width": "0px", 
	    	"background-color": "rgba(225, 225, 225, 0)"
        };

        var defaultCss = {
        	'width': cfg.width + 'px', 
        	'height': cfg.height + 'px',
        	'margin-left': cfg.left + 'px', 
        	'margin-top': cfg.top +  'px', 
        	'transform': 'scale(' + cfg.scale + ')',
        	'display': 'block'
        }

        this.type = name;

        var tpl_com_container = [
			'<div class="f-abs c-c-container">',
			    '<div class="tl-c"></div><div class="tr-c"></div><div class="bl-c"></div><div class="br-c"></div>',
			'</div>'
		].join('');

		var tpl_component = [
			'<div class="c-singleimage preview-container" inside-styles="" data-id=' + this.id + '>',
				'<img class="jcrop-preview newImg" src="" />',
			'</div>'
		].join('');

		var $container = $(tpl_com_container);
		var $component = $(tpl_component);
		var $image = $component.find("img");
		for(var key in defaultContainerCss){
        	var value = defaultContainerCss[key];
        	cfg.containerCss[key] = value; 
        	$component.css(key, value);
        }

        for(var key in defaultCss){
        	var value = defaultCss[key];
        	cfg.css[key] = value;
        	$image.css(key, value);
        }
		
		$image.prop("src", cfg.imgUrl);
		console.log($component.prop("outerHTML"));
		return $component;
    },
    getName: function($super) {
        return $super("Employee name: ");
    }
});