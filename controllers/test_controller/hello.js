// eslint-disable-next-line no-unused-vars
const hello = async (event, context, callback) => {
  console.log("test GET route triggerd");
  const res = {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };

  return res;
};

module.exports = {
  hello,
};
