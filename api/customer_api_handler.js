const {
  updateCustomerFeilds,
} = require("../controllers/customer_controller/update_customer_feilds.js");

const customerApiRouter = {
  PATCH: updateCustomerFeilds,
};

const customerApiHandler = async (event, context, callback) => {
  const httpMethod = event.httpMethod;
  const handler = customerApiRouter[httpMethod];
  const res = await handler(event, context, callback);
  return res;
};

module.exports = {
  customerApiHandler,
};
