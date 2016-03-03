[custom-elements]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
[first-draft]: https://gist.github.com/rafaelrinaldi/cf0c3851070cd935ef55
[module]: https://github.com/fnando/module
[piecemaker]: https://github.com/jcemer/piecemaker

# Guide

## How things work

There's nothing fancy nor complex about `data-components`. Here I'll guide you through the concepts behind it and how to kick things off.

### Bootstrap

One of the greatest advantages behind following a component structure is that you have zero context awareness. Having to manually bootstrap modules on different pages of a project is error-prone, not productive and can often cause trouble (e.g: renaming a component then having to change all the references to it all across the project).

On your application entry point, simply call the component bootstrap function and the library will take care of the rest.

```js
const components = require('data-components');

// Create a `UI` namespace and expose it globally for further usage
window.UI = components();
```

### Component structure

To identify a component and pass options around, you use data attributes:

```html
<ul data-component="list" data-toggle="click">
  <li>Do the laundry</li>
  <li>Finish homework</li>
  <li>Buy spaghetti and tomato sauce</li>
</ul>
```

Notice that you specify a component name via `data-component`. This will tell the library that this component must be mounted.

Now you need an implementation for your component:

```js
class List {
  constructor(node, options, sandbox) {
    console.log(`Bootstrapping list that toggle its visibility on "${options.toggle}" event`);
  }
};
```

It's that simple. On the constructor you'll receive a reference for the component markup, its options and the sandbox.

### Messaging

Since all components receive a reference for their own sandbox, you can use it to make components talk to each other:

```js
class Beep {
  constructor(node, options, sandbox) {
    sandbox.get('bop').greet('Hello from beep!');
  }

  greet(message) {
    console.log(message);
  }
}

class Bop {
  constructor(node, options, sandbox) {
    sandbox.get('beep').greet('Hello from bop!');
  }

  greet(message) {
    console.log(message);
  }
}

const UI = components({
  'beep': Beep,
  'bop': Bop
});

//=> Hello from beep!
//=> Hello from bop!
```

As you can see it's easy to access the public API of any component.

Maybe in the future we can think of adding a pub/sub mechanism but the current implementation is simple and works.

### Registering components

There are two ways of registering components:

```js
// Import all components
const List = require('./components/list');
const Dropdown = require('./components/dropdown');
const Table = require('./components/table');

// While bootstraping them
const UI = components({
  'list': List,
  'dropdown': Dropdown
});

// On the fly (useful for lazy loading)
UI.set('table', Table);
```

If you choose to register a component via `set()` it'll automatically perform a lookup on the current context and see if there's need to bootstrap the newly registered component.

### Accessing components

Every time a component is mounted, it'll save the instance to its own sandbox. In our case this sandbox is the value of `window.UI`.

To access a component, use the `get()` method exposed by the sandbox:

```js
UI.get('list'); //=> List {}
```

### Custom exports

Often you use the same component multiple times under the same context and that's when custom exports come in handy. Simple specify `data-exports` and it will use it to store the component instance into its unique reference.

Using our previous example, imagine that we have two different lists but both share the same component implementation:

```html
<ul data-component="list" data-exports="home">
  <li>Do the laundry</li>
  <li>Buy spaghetti and tomato sauce</li>
</ul>

<ul data-component="list" data-exports="school">
  <li>Finish homework</li>
</ul>
```

Now you have a unique identifier for both components:

```js
// Tasks under "home" list
UI.get('home'); //=> List {}

// Tasks under "school" list
UI.get('school'); //=> List {}
```

### Final thoughts

This is obviously no wildcard and really there are better options out there if you're working on a SPA, but it sure helps to keep an organized codebase while keeping things simple.

Ideally [Custom Elements][custom-elements] would solve this in a very elegant way but I haven't found any solution that don't rely either on a hacky implementation or a giant runtime (looking at you Polymer).

I started playing with this idea [a while ago][first-draft] and I'm already successfully using it in two production projects (with more than two developers besides myself).

## FAQ

Before creating an issue, please make sure you read the [FAQ](/FAQ.md) first.

## Related

Other options available that share some ideas with this project:

* [Module][module]
* [Piecemaker][piecemaker]
* [Custom Elements][custom-elements]
