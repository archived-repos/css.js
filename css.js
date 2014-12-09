/*
 * css.js
 *
 * The MIT License (MIT)
 * 
 * Copyright (c) 2014 Jesús Manuel Germade Castiñeiras <jesus@germade.es>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */


(function (inject) {
	'use strict';
	
	if ( typeof window === 'undefined' ) {
		if ( typeof module !== 'undefined' ) {
			module.exports = inject();
		}
	} else {
		if ( window.fn ) {
			fn.define('css', inject);
		} else if( !window.css ) {
			window.css = inject();
		}
	}

})(function () {
	'use strict';

	function CSS (selector, context) {
		var css = context || this, queue;

		if( selector instanceof Array ) {
	        queue = selector;
	        selector = queue.shift();
	    } else if( /\s/.test(selector) ) {
	        queue = selector.split(' ');
	        selector = queue.shift();
	    } else {
	        queue = [];
	    }

		css.className = [];
		css.attribute = [];

		selector = selector.replace(/^([^\.\[\#]*)/, function(match, nodeName) {
	       css.nodeName = nodeName || 'div';
	    });

	    selector = selector.replace(/#([^\.\[\#]*)/, function(match, id) {
	       css.id = id;
	    });

	    selector = selector.replace(/\.([^\.\[\#]+)/g, function(match, className) {
	       css.className.push(className);
	    });

	    selector = selector.replace(/\[([^\]]+)/g, function(match, attribute) {
	       css.attribute.push(attribute);
	    });

	    if( queue.length ) {
	    	css.child = new CSS( queue );
	    }

	    return css;
	}

	CSS.prototype.toHTML = function() {
		var html = '<' + this.nodeName + '';

	    if( this.id ) {
	        html += ' id="' + this.id + '"';
	    }

	    if( this.className.length ) {
	        html += ' class="';
	        for( var i = 0, len = this.className.length; i < len; i++ ) {
	            html += ( i ? ' ' : '' ) + this.className[i];
	        }
	        html += '"';
	    }

	    for( var i = 0, len = this.attribute.length; i < len; i++ ) {
	        html += ( ' ' + this.attribute[i] );
	    }

	    html += '>';

	    if( this.child ) {
	        html += this.child.toHTML();
	    }

	    html += '</' + this.nodeName + '>';

	    return html;
	};

	return function (selector) {
		return new CSS(selector);
	}
});
