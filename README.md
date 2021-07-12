# Apola.js
## Why apola.js
Apola.js is a simple framework that simplifies MySQL and Express.js frameworks and increases performance. Learning this framework is easy and fast. All you need to know is the Node.js and JS programming languages.
## Features
- Easy framework
- Can work easily and efficiently with databases and tables
- Easy creating HTTP servers in Apola.js
- In a simplified format of MySQL and Express.js
- Can easily integrate with other frameworks and libraries
## "Hello, world!" application in Apola.js
```js
const apola = require('./apola');
var app = apola;

app.route(['/'], {
  echo: ["Hello, world!", {
    status: false
  }]
});
```
