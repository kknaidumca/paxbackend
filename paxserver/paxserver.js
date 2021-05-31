const fetch = require('node-fetch');
const CryptoJS = require("crypto-js");
const paxURLHit = async (cmethod, cpayload, capiEndPoint="payment-method/fee") => {
    const key = "";
    const secret = "";
    const payload = cpayload || ""; // empty or null when not required :)
    const apiEndPoint = capiEndPoint; // this will be your API end Point
    const method = cmethod;
    try { 
        return new Promise((resolve, reject) => {
            let secretKey = secret,
                        payloadData = payload,
            body = 'apikey=' + key + '&nonce=' + Date.now();
            payloadData = payloadData.split("\n").map(Function.prototype.call, String.prototype.trim);
            var tmp = [];
            for (var i in payloadData) {
                if (payloadData[i].length > 0) {
                    tmp.push(payloadData[i]);
                }
            }
            payloadData = tmp;
            delete tmp;
            payloadData = payloadData.join('&');
            if (payloadData.length) {
                body += '&' + payloadData;
            }
            let seal = CryptoJS.HmacSHA256(body, secretKey);
            var url = body + '&apiseal=' + seal;
            fetch(`https://paxful.com/api${apiEndPoint}`,
            {
            "credentials":"omit",
            "headers":
                {
                "accept":"application/json",
                "content-type":"text/plain",
                "pragma":"no-cache",
                "sec-fetch-mode":"cors",
                "sec-fetch-site":"cross-site"
                },
            "referrerPolicy":"no-referrer-when-downgrade",
            "body":url,
            "method":method,
            })
            .then(res => res.json()) // expecting a json response
            .then(data => {
                console.log(data.data);
                resolve(data);
            }).catch(err => reject(err));
        });
    } catch(err) {
        console.error(err);
    }

};
module.exports = {
    paxURLHit
}