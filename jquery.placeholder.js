/*
The MIT License (MIT)

Copyright (c) 2013 Mateusz Stankiewicz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
	var originalVal = $.fn.val;
  $.fn.val = function(value) {
    var input = this;
    if((input.is('input:text') || input.is('input:password'))) {
      var placeholder = input.next();
      if(placeholder.hasClass('placeholderLabel')) {
        if (value !== null && value !== '') {
        	placeholder.hide();
        }
        else {
        	placeholder.show();
        }
      }
    }
    
    if (typeof(value) == 'undefined') { 
  		return originalVal.call(this); 
  	} 
  	else { 
  		return originalVal.call(this, value); 
  	} 
  };
  
  $.support.placeholder = (function(){
    var i = document.createElement('input');
    return 'placeholder' in i;
  })();

  $.fn.extend({
    placeholderNumber: 0,

    addPlaceholder: function() {
      return this.each(function() {
        var input = $(this);

        if($.support.placeholder) {
          return;
        }
        
        if((!input.is('input:text') && !input.is('input:password'))) {
          return;
        }
        var placeholder = input.attr('placeholder');
        if(placeholder === null || typeof(placeholder) === 'undefined' || placeholder === '') {
          return;
        }

        var inputID = input.attr('id');

        if(inputID === null || typeof(inputID) === 'undefined') {
          inputID = 'input_' + $.placeholderNumber;
          input.attr('id', inputID);
          $.placeholderNumber++;
        }

        var placeholderLabel = $('<label for="' + inputID + '" class="placeholderLabel">' + placeholder +  '</label>');

        placeholderLabel.css({
          'position': 'absolute',
          'left': '4px',
          'top': '5px',
          'display': 'block',
          'line-height': 'normal',
          'cursor': 'text'
        });

        input
        .blur(function() {
          var input = $(this);
          var placeholder = input.next();

          if(!placeholder.hasClass('placeholderLabel')) {
            return;
          }

          if(input.val() === null || typeof(input.val()) === 'undefined' || input.val() === '') {
            placeholder.show();
          }
        })
        .focus(function () {
        	var input = $(this);
        	var placeholder = input.next();

          if(!placeholder.hasClass('placeholderLabel')) {
            return;
          }
          
          placeholder.hide();
        });
        
        var container = $('<div></div>');

        container.css({
          'position': 'relative'
        });

        container.insertAfter(input);
        input.appendTo(container);
        placeholderLabel.appendTo(container);
      });
    }
  });
     
})(jQuery);
