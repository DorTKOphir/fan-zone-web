module.exports = {
  apps : [{
    name   : "fan_zone",
    script : "./dist/src/server.js",
    env_production : {
      NODE_ENV: "production"
    }
  }]
}
