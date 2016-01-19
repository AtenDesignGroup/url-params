# url-params [![Build Status](https://travis-ci.org/AtenDesignGroup/url-params.svg?branch=master)](https://travis-ci.org/AtenDesignGroup/url-params)

Utility functions for adding, removing and setting values in url query strings. This is particularly suited to dealing with multi-value, '+' separated query strings.

## Installation

If you don't have Yeoman installed yet, run the following.

```bash
npm install url-params
```

## Usage

```javascript
// Require url-params
var urlParams = require('urlParams');

var oldUrl = 'http://www.example.com/?foo=2+3+6&baz=6';

//
// Add parameters
//

// Add 4 to foo
newUrl = urlParams.add(oldUrl, 'foo', 4);
// newUrl === 'http://www.example.com/?foo=2+3+6+4&baz=6'

// Add 4 and 5 to foo
newUrl = urlParams.add(oldUrl, 'foo', [4, 5]);
// newUrl === 'http://www.example.com/?foo=2+3+6+4+5&baz=6'

// Add a boolean value
newUrl = urlParams.add(oldUrl, 'foo');
// newUrl === 'http://www.example.com/?foo=2+3+6&baz=6'
newUrl = urlParams.add(http://www.example.com/?baz=6, 'foo');
// newUrl === 'http://www.example.com/?baz=6&foo=true'


//
// Remove parameters
//

// Remove 3 from foo
newUrl = urlParams.remove(oldUrl, 'foo', 3)
// newUrl === 'http://www.example.com/?foo=2+6&baz=6'

// Remove 3 and 6 from foo
newUrl = urlParams.remove(oldUrl, 'foo', [3, 6])
// newUrl === 'http://www.example.com/?foo=2&baz=6'

// Remove a value
newUrl = urlParams.remove(oldUrl, 'foo')
// newUrl === 'http://www.example.com/?baz=6'


//
// Set parameters
//

// Set foo to 3
newUrl = urlParams.set(oldUrl, 'foo', 3)
// newUrl === 'http://www.example.com/?foo=3&baz=6'

// Set foo to 3+6
newUrl = urlParams.set(oldUrl, 'foo', [3, 6])
// newUrl === 'http://www.example.com/?foo=3+6&baz=6'

// Set foo to true
newUrl = urlParams.set(oldUrl, 'foo')
// newUrl === 'http://www.example.com/?foo=true&baz=6'

```

## License

MIT
