import { config } from "dotenv";
import express, { json } from "express";
import { userRouter } from "./routes/user.route.js";
import {
  mongoConenctLister,
  mongoConnect,
  mongoDisconenctLister,
  mongoErrorListener,
} from "./configs/db.connect.js";
config();

mongoErrorListener();
mongoConenctLister();
mongoDisconenctLister();
await mongoConnect();

const app = express();
app.use(json());

// Endpoints
app.use("/user/auth", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    answer: {
      code: 404,
      data: "Page not found",
    },
  });
});

app.use((err, req, res, next) => {
  res.status(err.code || 500).json({
    answer: {
      code: err.code || 500,
      data: err.message || "Server Error",
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});
