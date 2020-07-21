var express = require('express');
const crypto = require('crypto');
var app = express();
var http = require('http');
var path = require('path');
var reload = require('reload');
var session = require('express-session');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var session = require('express-session');
var queryString = require('querystring');
var CryptoJS = require("crypto-js");




/*const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

function dec(encrypted){
	
	//var ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	let b64 = CryptoJS.enc.Hex.parse(encrypted);
      let bytes = b64.toString(CryptoJS.enc.Base64);
	
}
*/
//console.log(hw)
//console.log(decrypt(hw))

	let possible = "mnopqrstuvwxyzabcdefghijkl1234567890";
	let text = "";
	let texts = "";
	const lengthOfCode = 32;
	for (let i = 0; i < lengthOfCode; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
  
	const lengthOfCodes = 16;
	for (let i = 0; i < lengthOfCodes; i++) {
		texts += possible.charAt(Math.floor(Math.random() * possible.length));
	}  

    var base64Key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef') 	//'0123456789abcdef0123456789abcdef')	
    var iv = CryptoJS.enc.Hex.parse('abcdef0123456789abcdef0123456789')
	
	
    var token = CryptoJS.AES.encrypt(possible,base64Key,{ iv: iv });
					
app.use(function(req, res, next) {
	
	if(req.originalUrl == "/" ){
		//|| (req.originalUrl).includes("html")
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
		res.setHeader('Authorization', 'Bearer '+ token); 
		var sq= req.protocol + "://" + req.get('host') + req.originalUrl;
		//console.log("Requested url: " +req.originalUrl);
		//console.log("res url: " +res.getHeader('Authorization'));
	}
	
   next();
});

/*app.all('*', function(req, res,next){
	if(req.originalUrl == "/"){
    console.log("second")
	console.log("res url: " +res.getHeader('Authorization'));
	//console.log(util.inspect(res, false, null));

    var sq= req.protocol + "://" + req.get('host') + req.originalUrl;
	console.log("Requested url: " +sq);
	}
	if(req.query.init != undefined){
		
    }
	
	//console.log('encrypted = ' + encrypted);
	//var ciphertexts = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
	//console.log(ciphertexts)
	//var words = CryptoJS.enc.Utf8.parse(ciphertexts); // WordArray object
 //console.log(CryptoJS.enc.Base64.stringify(words));
	var cipherParams = CryptoJS.lib.CipherParams.create({
		ciphertext: CryptoJS.enc.Base64.parse(ciphertexts)
	});
	//console.log(cipherParams)
	var decrypteds = CryptoJS.AES.decrypt(
						cipherParams,
						base64test,
						{ iv: ivtest }
					);
	console.log('decrypted='+decrypteds);
	var descrString = decrypteds.toString(CryptoJS.enc.Utf8);
	console.log('decrypteds='+descrString);
	
	
		//var hw = encrypt("mnopqrstuvwxyzabcdefghijkl1234567890");

		
		
		//console.log(decrypt(data));
		//res.send(hw)
	}

	//res.send("");
	return next();
  });	*/
app.use(express.static("../DeskApp"),session({secret: 'veryimportantsecret',resave: true, saveUninitialized: true})); // myApp will be the same folder name.	

app.get('/test',function(req, res,next) {
   var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["module/test.py"])
                          //  req.query.firstname, 
                          //  req.query.lastname] ); 
	process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
  
});
app.listen(8080, 'localhost');