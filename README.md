[demo-url]: https://rafaelrinaldi.github.io/data-components
[dist-url]: https://raw.githubusercontent.com/rafaelrinaldi/data-components/master/dist/index.min.js
[spa]: https://en.wikipedia.org/wiki/Single-page_application
[url]: http://rinaldi.io

# data-components [![Experimental](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)](/FAQ.md#what-does-unstable-mean-)

> Tiny component structure for web applications

## Install

```sh
$ npm install data-components --save
```

<sup>Or you can simply copy and paste the [minified standalone version that lives under `dist/`][dist-url]</sup>

## Motivation

There are plenty of options to architect a web application out there but most options often assume that you're working on a [SPA][spa]. That alone will add a lot of stuff that you might not want at all. Data binding, custom messaging system and virtual DOM to name a few.

Sometimes you just need something simple to kick things off without having to worry about naming conventions and programming paradigms. That's how this library was born.

## Usage

Let's implement the simplest todo list app.

```html
<!-- Create our todo list element passing some initial values -->
<ul data-component="todo" data-values="foo,bar"></ul>

<!-- Let's use a input field to read the user input -->
<input data-component="input" placeholder="What to do?">
```

Ok, now that we have our markup in place, let's implement the application.

```js
// Todo component
function Todo(el, options) {
  this.el = el;
  // Read from initial values
  this.todos = options.values.split(',');
  this.render();
}

// Add items to the todos list
Todo.prototype.add = function (todo) {
  this.todos.push(todo);
  this.render();
};

// Render the todos list to the DOM
Todo.prototype.render = function () {
  this.el.innerHTML = this.todos.map(function (todo) {
    return '<li>' + todo + '</li>';
  }).join('');
};

// User input component
function Input(el, options, sandbox) {
  var todo = sandbox.get('todo');

  el.focus();
  el.addEventListener('keydown', function(e) {
    // Submit value to "todo" component when hitting the enter key
    if (e.keyCode === 13) {
      todo.add(this.value);
      this.value = '';
      this.focus();
    }
  });
}

// Bootstrap components
components({
  todo: Todo,
  input: Input
});
```

![demo](./demo.gif)

It works with just a few lines of code :tada:

[Check out the demo page][demo-url] for a slightly more complex example.

## More

For more detailed instructions on how the project works and how to use it, please [check the user guide](/GUIDE.md).

## License

MIT © [Rafael Rinaldi][url]
