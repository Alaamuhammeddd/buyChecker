const serverless = require("serverless-http");
const app = require("../server");
const { connectDB } = require("../config/database");

let handler;
let isConnecting = false;

async function init() {
  if (handler) return handler;
  if (isConnecting) return isConnecting;

  isConnecting = (async () => {
    await connectDB();
    handler = serverless(app);
    return handler;
  })();

  return isConnecting;
}

module.exports = async (req, res) => {
  console.log("API hit:", req.method, req.url);
  const h = await init();
  return h(req, res);
};
