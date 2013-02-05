
(function($){
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

        input.focus(function() {
          var input = $(this);
          var placeholder = input.next();

          if(!placeholder.hasClass('placeholderLabel')) {
            return;
          }

          placeholder.hide();
        }).blur(function() {
          var input = $(this);
          var placeholder = input.next();

          if(!placeholder.hasClass('placeholderLabel')) {
            return;
          }

          if(input.val() === '') {
            placeholder.show();
          }
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
