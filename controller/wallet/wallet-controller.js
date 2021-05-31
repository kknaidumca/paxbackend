const joi = require('@hapi/joi');
const paxServer = require('../../paxserver/paxserver');
const walletBalance = async(req, res)=> {
    try {
        console.log(req);
        paxServer.paxURLHit('POST', "", req.url).then(responseOutput => {
            res.send(responseOutput);
        }).catch(err => {
            res.send({error: true, message:err});
        });
    } catch(err) {
        res.send({error: true, message:"Internal server Error"});
    }
};
const walletNewAddress = async(req, res)=> {
    try {
        paxServer.paxURLHit('POST', "", req.url).then(responseOutput => {
            res.send(responseOutput);
        }).catch(err => {
            res.send({error: true, message:err});
        });
    } catch(err) {
        res.send({error: true, message:"Internal server Error"});
    }
};
const walletListddresses = async(req, res)=> {
    try {
        paxServer.paxURLHit('POST', "", req.url).then(responseOutput => {
            res.send(responseOutput);
        }).catch(err => {
            res.send({error: true, message:err});
        });
    } catch(err) {
        res.send({error: true, message:"Internal server Error"});
    }
};
module.exports = {
    walletBalance,
    walletNewAddress,
    walletListddresses
} 