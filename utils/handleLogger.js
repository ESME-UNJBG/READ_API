const { IncomingWebhook } = require("@slack/webhook");
const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK);
const loggerStream = {
  write: (message) => {
    webHook.send({
      text: message,
    });
    console.log("caoturando el log", message);
    ///bbjj
  },
};
module.exports = loggerStream;
