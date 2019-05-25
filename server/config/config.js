// Check the Application Enviorment
var appEnv=process.env.NODE_ENV || "development";
// Fetch Environment Data from  config.json file.
var config= require('./config.json');
var envConfig=config[appEnv];
Object.keys(envConfig).forEach(key=>process.env[key]=envConfig[key]);