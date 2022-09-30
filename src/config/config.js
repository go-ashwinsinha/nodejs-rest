const port = process.env.NODE_PORT || 80

module.exports = {
    port,
    cacheServiceProfileId: process.env.DYNAMO_DB_CACHE_TABLE,
    customCsmfBaseURL: process.env.CUSTOM_CSMF_BASE_URL,
    customAuthBaseUrl: process.env.CUSTOM_CSMF_BASE_URL,
    CUSTOM_AUTH: process.env.CUSTOM_AUTH,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    jwtKey: process.env.JWT_KEY,
    jwtExpirySeconds: process.env.JWT_EXPIRY_SECONDS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    awsDynRegion: process.env.AWS_REGION
}