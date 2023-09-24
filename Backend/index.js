require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./Db/connect");
const notFoundMiddleWare = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const userRoute = require("./routes/user");
const requestRoute = require("./routes/friendRequest");
const uploadRoute = require("./routes/upload");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const multer = require("multer");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/request", requestRoute);
app.use("/api/v1/upload", uploadRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/conversation", conversationRoute);

// const dirname = path.resolve();
// app.use("/uploads", express.static(path.join(dirname, "/uploads")));

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`server is listening on port ${port}`));
};

start();
