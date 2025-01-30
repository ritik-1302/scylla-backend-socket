const { customer } = require("../../models/customer_model.js");
const { device } = require("../../models/device_model.js");

// eslint-disable-next-line no-unused-vars
const updateCustomerFeilds = async (event, context, callback) => {
  console.log("Customer update route triggered");
  const body = JSON.parse(event.body);
  const { deviceIdentifier, ...rest } = body;

  try {
    const whatsappDevice = await device.findOne({
      identifier: deviceIdentifier,
    });
    let deviceID = null;
    if (!whatsappDevice) {
      console.log("Device not found");
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Device not found" }),
      };
    } else {
      console.log("Device found", whatsappDevice);
      deviceID = whatsappDevice._id;
    }

    const updatedCustomer = await customer.findOneAndUpdate(
      { devices: deviceID },
      { $set: rest },
      { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Customer not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(updatedCustomer),
    };
  } catch (err) {
    console.error("Error updating customer:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to update customer",
        error: err,
      }),
    };
  }
};

module.exports = {
  updateCustomerFeilds
};
