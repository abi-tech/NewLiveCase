var ComponentContainer = function(component){
	var that = this;
	that.template = [
		'<div class="f-abs c-c-container">',
			'<div class="tl-c"></div><div class="tr-c"></div><div class="bl-c"></div><div class="br-c"></div>',
		'</div>'
	].join('');
	that.component = component;
	this._init();
	return this;
}

ComponentContainer.prototype = {
	unbind: function(){
		//TODO
	},
	css: function(css){
		var that = this;
		that.$html.removeAttr("style");
		for(var key in css){
			that.$html.css(key, css[key]);
		}
	},
	_init: function(){
		var that = this;
		//构建结构
		that.$html = $(that.template);
		that.$wrapper = $('<div>').append(that.component.$html);
		that.$html.prepend(that.$wrapper);
		console.log('that.component.containerCss', that.component.containerCss);
		that.css(that.component.containerCss);
	    //绑定事件
    	that.interact = interact(that.$html[0], { styleCursor: false });
    	that._bind();
	},
	_bind: function (){
		var that = this;
		that._drag();
    	that._resize();
    	that._resizeend();
    	that._actionChecker();

    	that.$html.on('click', function (event) {
            event.stopPropagation()
            $(".c-c-container").removeClass("u-comChoose");
            that.$html.addClass("u-comChoose");
        });

        $(".tr-c,.bl-c", that.$html).on('mouseenter', function () {
            that.$html.css("cursor", "ne-resize");
        }).on('mouseleave', function (e) {
            that.$html.css("cursor", "move");
        });

        $(".tl-c,.br-c", that.$html).on('mouseenter', function () {
            that.$html.css("cursor", "nw-resize");
        }).on('mouseleave', function (e) {
            that.$html.css("cursor", "move");
        });
	},
	_drag: function(){
		var that = this;
		that.interact.draggable({
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 1.05, left: 1.05, bottom: -0.05, right: -0.05 }
            },
            onmove: function (event) {
                var target = event.target,
                    x = (parseFloat($(event.target).css('left')) || 0),
                    y = (parseFloat($(event.target).css('top')) || 0);

                x = x + event.dx;
                y = y + event.dy;

                $(event.target).css('left', x);
                $(event.target).css('top', y);
                console.log('1');
                //TODO 移动时修改 top left
                if(typeof that.component.onDragEnd === 'function')
                	that.component.onDragEnd(that.component.$html, x, y);
            }
        });
	},
	_resize: function(){
		var that = this;
		that.interact.resizable({
			preserveAspectRatio: that.component.ratio,
            edges: { left: true, right: true, bottom: true, top: true }
        })
        .on('resizemove', function (event) {
            var target = event.target,
                   x = (parseFloat($(event.target).css('left')) || 0),
                   y = (parseFloat($(event.target).css('top')) || 0);

            x += event.deltaRect.left;
            y += event.deltaRect.top;
            w = event.rect.width;
            h = event.rect.height;

            $(event.target).css('left', x);
            $(event.target).css('top', y);
            $(event.target).css('width', w);
            $(event.target).css('height', h);

            //TODO 移动时修改 top left width height
            if(typeof that.component.onResizeEnd === 'function')
            	that.component.onResizeEnd(that.component.$html, x, y, w, h);
        });
	},
	_resizeend: function(){
		var that = this;
		that.interact.on('resizeend', function (event) {
            $(that.$html).css("cursor", "move");
        });
	},
	_actionChecker: function(){
		var that = this;
		that.interact.actionChecker(function (pointer, event, action, interactable, $html, interaction) {
            if (action.name === 'resize' && $($html).hasClass("u-comChoose")) {
                var cursorKey = 'resize',
                    edgeNames = ['top', 'bottom', 'left', 'right'];

                for (var i = 0; i < 4; i++) {
                    if (action.edges[edgeNames[i]]) {
                        cursorKey += edgeNames[i];
                    }
                }
                cursor = interact.debug().actionCursors[cursorKey];

                $(that.$html).css("cursor", cursor);
            } else {
                action.name = 'drag';
            }

            if (action.name === 'drag') {
                $(that.$html).css("cursor", "move");
            }
            return action;
        });
	}
};

mainModule.directive("editorAreaComponent", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
        	element.replaceWith(scope.component.$html);
        }
    }
});