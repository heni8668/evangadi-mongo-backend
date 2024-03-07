const express = require("express");
const connectDB = require("./db/connection");
const cors = require("cors");

//import routes
const userRoutes = require("./routes/userRoutes");
const questionRoute = require("./routes/questionRoutes");
const answersRoute = require("./routes/answerRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/users", userRoutes);

app.use("/api/questions", questionRoute);
app.use("/api/answers", answersRoute);

connectDB();

app.listen(8000, () => {
  console.log("server is starting on port 8000");
});
