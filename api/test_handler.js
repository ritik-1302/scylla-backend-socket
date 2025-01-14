const { hello } = require("../controllers/test_controller/hello.js");

const testRouter = {
  GET: hello,
};

const testHandler = async (event,context,calllback) => {
  const httpMethod = event.httpMethod;

  const handler = testRouter[httpMethod];

 const res= await handler(event,context,calllback);
 return res
};

module.exports = {
  testHandler,
};
