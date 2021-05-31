let env = process.env.NODE_ENV ? process.env.NODE_ENV : process.argv[2];
console.log(`env ${env}`);
env= (env) ? env : process.argv[2] ? process.argv[2] : 'dev';
process.env.NODE_ENV = env;
console.log(`env ${env}`);
let config = require(`./environments/${env}`);
module.exports = config;