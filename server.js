// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => {
  res.redirect(`/api/${Date.now()}`)
})

// unix time based api endpoint 
app.get('/api/:date', (req, res) => {
  const inputTime = req.params['date'];
  const unixT = Date.parse(inputTime)

  const unixTime = isNaN(unixT)
                    ? inputTime
                    : unixT;

  const utcTime = new Date(Number(unixTime)).toUTCString();

  if (utcTime == 'Invalid Date') {
    res.status(404).json({
      error: 'Invalid Date'
    });
    return;
  };

  console.log(inputTime, unixTime, utcTime);
  res.json({
    unix: unixTime,
    utc: utcTime
  });
})
return;

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
