// app.js
const dotenv = require('dotenv');
dotenv.config(); // Loads variables from .env into process.env

var request = require('request');
var FormData = require('form-data');
var fs = require('fs');

var baseUri = 'https://api.bing.microsoft.com/v7.0/images/visualsearch?mkt=en-us';
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

function requestCallback(err, res, body) {
    console.log('--- Request ---');
    console.log(res.request.method, res.request.uri.href);
    console.log('Headers:', JSON.stringify(res.request.headers, null, '  '));
    console.log('--- Response ---');
    console.log('Status:', res.statusCode);
    console.log('Headers:', JSON.stringify(res.headers, null, '  '));
    console.log('Body:', JSON.stringify(JSON.parse(body), null, '  '));
}
