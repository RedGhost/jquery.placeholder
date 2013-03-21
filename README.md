jquery.placeholder
==================

The jQuery Placeholder plugin provides legacy placeholder support to non-placeholder conforming browsers.

To use:

1. Include jquery.placeholder.js in your source code.

2. For any field that you want to add placeholder support call .addPlaceholder. Note: The field must be an input:text or input:password and it must have a placeholder attribute associated with it.
i.e.:
HTML:
```html
<input type="text" id="input_field" placeholder="input" />
```
Javascript:
```javascript
$('#input_field').addPlaceholder();
```

You can style the placeholder by adding rules for the placeholderLabel class.
i.e.:
```css
.placeholderLabel {
  font-size: 20px;
  color: grey;
}
```

To add placeholder support to all fields call this after everything has been loaded:
```javascript
$('input[placeholder]').addPlaceholder();
```

In modern browsers that support the placeholder attribute nothing will happen.

This plugin also adds $.support.placeholder which returns true if the browser supports placeholders and false otherwise.
