let appConfig = {
    port :3000,
    allowedCorsOrigin : "*",
    environment : "dev",
    db : {
        uri : "mongodb://127.0.0.1:27017/toDoListAppDB"
    },
    apiVersion : "/api/v1"

}

module.exports = {
    port : appConfig.port,
    allowedCorsOrigin : appConfig.allowedCorsOrigin,
    environment : appConfig.environment,
    db : appConfig.db,
    apiVersion : appConfig.apiVersion
}