const app = require("../Razor-pay/src/app");
const connect = require("../Razor-pay/src/db/db");
require("dotenv").config();

connect();

app.listen(3000, () => {
  console.log("Razorpay server is running on port 3000");
});
