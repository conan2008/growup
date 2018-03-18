
let config = {
    env: process.env.NODE_ENV //development, production
}

if(process.env.NODE_ENV === 'development') {

    var devConfig = {
        port: 8081
    }

    Object.assign(config, devConfig);
}

if(process.env.NODE_ENV === 'production') {

    var prodConfig = {
        port: 8081
    }

    Object.assign(config,prodConfig);
}

export default config;