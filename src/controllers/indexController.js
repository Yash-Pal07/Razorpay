const instance = require("../config/razorpay");
module.exports.indexPageViewController = (req, res) => {
  res.render("index");
  console.log(instance);
};

const Payment = require("../models/Payment");
module.exports.CreateOrder = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    console.log(amount, currency, receipt);
    var options = {
      amount: amount, // Amount is in paise (10 INR)
      currency: currency,
      receipt: receipt,
    };
    const order = await instance.orders.create(options); // ✅ Await order creation
    console.log(order);
    const newPayment = await Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "pending",
    });
    console.log("Payment created" + newPayment );
    res.send(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" }); // ✅ Proper error handling
  }
};

require("dotenv").config();
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

module.exports.VerifyPayment = async (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const validity = validatePaymentVerification(
    { order_id, payment_id },
    signature,
    secret
  );

  if (validity) {
    const payment = await Payment.findOne({ orderId: order_id });
    payment.paymentId = payment_id;
    payment.signature = signature;
    payment.status = "completed";
    await payment.save();
    res.json({ status: "Payment verification successful" });
    console.log("Payment verification successful");
  } else {
    console.error("Payment verification failed:", validity);
    return res.status(401).json({ error: "Invalid payment signature" });
  }
};
