const apola = require('./apola');
var app = apola;

app.route(['/api/test/method/route'], {
  echo: ["Hello, world!", {
    status: false
  }]
});

app.port(3000, "HTTP server created!!!");
