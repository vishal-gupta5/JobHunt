const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRouter = require("./routes/user.route");
const companyRouter = require("./routes/company.router");
dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/company", companyRouter);

connectDB()
  .then(() => {
    console.log("Database Connection is established!");
    app.listen(PORT, () => {
      console.log(`Server is sucessfully running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Database connection is not established!`);
  });
