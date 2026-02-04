const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRouter = require("./routes/user.route");
dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https//localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/user", userRouter);

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
