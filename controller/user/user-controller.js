const joi = require('@hapi/joi');
const paxServer = require('../../paxserver/paxserver');
const userInfo = async(req, res)=> {
    try {
        const username = req.body.username || 'KKNaidu';
        paxServer.paxURLHit('POST', `username=${username}`, req.url).then(responseOutput => {
            res.send(responseOutput);
        }).catch(err => {
            res.send({error: true, message:err});
        });
    } catch(err) {
        res.send({error: true, message:"Internal server Error"});
    }
};
const userTrust = async(req, res)=> {
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
const userUnTrust = async(req, res)=> {
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
    userInfo,
    userTrust,
    userUnTrust
} 