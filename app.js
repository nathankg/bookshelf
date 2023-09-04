// app.js
const dotenv = require('dotenv');
dotenv.config(); // Loads variables from .env into process.env

var request = require('request');
var FormData = require('form-data');
var fs = require('fs');

var baseUri = 'https://api.bing.microsoft.com/bing/v7.0/images/visualsearch';
var subscriptionKey = process.env.BING_VISUAL_SEARCH_KEY;
var imagePath = "data/IMG_7626_resized.jpeg";

function requestCallback(err, res, body) {
    console.log(JSON.stringify(JSON.parse(body), null, '  '))
}

/*
--boundary_1234-abcd
Content-Disposition: form-data; name="image"; filename="myimagefile.jpg"

ÿØÿà JFIF ÖÆ68g-¤CWŸþ29ÌÄøÖ‘º«™æ±èuZiÀ)"óÓß°Î= ØJ9á+*G¦...

--boundary_1234-abcd--
*/

var form = new FormData();
form.append("image", fs.createReadStream(imagePath));

form.getLength(function(err, length){
    if (err) {
      return requestCallback(err);
    }
    var r = request.post(baseUri, requestCallback);
    r._form = form; 
    r.setHeader('Ocp-Apim-Subscription-Key', subscriptionKey);
  });