var H5 = function () {
	var that = this;
	this.id = ('h5_'+Math.random()).replace('.','_');
    this.el = $('<div class="pages" id="' + this.id + '">').hide();
    this.pages = [];
    $('body').append(this.el);

    this.addPage = function(options){
        var page = $('<div class="page section">');
        this.el.append(page);
        this.pages.push(page);
        return this;
    }

    this.addComponent = function(options){ console.log(options);
        var component; 
        var page = this.pages.slice(-1)[0];

        options.mode = "2";
        options.scale = 1;
        switch(options.type){
            case 'singleimage':
                component = new Singleimage(options);
            	break;
            case 'singletext':
                component = new Singletext(options);
            	break;
            case 'externallinks':
                component = new Externallinks(options);
            	break;
        }
        page.append(component.$html);
        return this;
    }

    this.moveUp = function () {
    	this.el.fullpage.moveSectionUp();
    }

    this.moveDown = function () {
    	this.el.fullpage.moveSectionDown();
    }

    this.moveTo = function (index) {
    	this.el.fullpage.moveTo(index);
    }

    this.animate = function (animation, animateBegin, animateEnd) {
    	var that = this;
    	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    	animateBegin && animateBegin();

    	that.el.css("animation", "a_slide_topIn 0.7s ease").one(animationEnd, function() {
    		that.el.css("animation", "none");
    		that.el.find('.h5_component').trigger('onLoad');

    		animateEnd && animateEnd();
    	});
    }

    this.loader = function(){
        this.el.fullpage({
        	sectionsColor: ['#C63D0F', '#1BBC9B'],
            onLeave: function(index, nextIndex, direction){ console.log("onLeave", index, nextIndex, direction);
            	that.pages[index - 1].removeClass("z-current");
            	that.pages[index - 1].addClass("z-move");
            	that.pages[nextIndex - 1].addClass("z-current");
            	that.pages[nextIndex - 1].addClass("z-move");
            	that.pages[nextIndex - 1].find('.h5_component').hide();

                //$(this).find('.h5_component').trigger('onLeave');
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                that.pages[nextIndex - 1].css("animation", "a_slide_topIn 0.7s ease").one(animationEnd, function() {
                	that.pages[nextIndex - 1].css("animation", "none");
                });
            },
            afterLoad: function(anchorLink, index){ console.log("afterLoad", anchorLink, index);
             	that.pages[index - 1].find('.h5_component').trigger('onLoad');
             	that.pages[index - 1].find('.h5_component').show();
             	$(this).siblings().removeClass("z-move");
             	$(this).removeClass("z-move");
            }               
        });

        this.pages[0].addClass("z-current");
        this.el.show();
    }
    return this;
}

mainModule.controller('mainController', [ '$http', '$scope', function ($http, $scope) {  
	
}]); 


function initView() {
	var h5 = new H5();
	for (var i = 0; i < liveApp.caseData.pages.length; i++) {
		var page = liveApp.caseData.pages[i];
		h5.addPage(page);
		for (var j = 0; j < page.components.length; j++) {
			var component = page.components[j];
			h5.addComponent(component.options);
		}
	}
	h5.loader();

	window.moveUp = function () {
		h5.moveUp();
	}

	window.moveDown = function () {
		h5.moveDown();
	}
}