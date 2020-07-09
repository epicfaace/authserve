module.exports = {
  serve: {
    type: "express",
    sessionSecret: process.env.SESSION_SECRET
  },
  auth: {
    type: "github",
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    allowedUsernames: []
  }
}