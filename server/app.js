const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const taskRoute = require("./routes/tasks");
const noteRoute = require("./routes/notes");
const categoryRoute = require("./routes/category");
const statsRout = require("./routes/stats");
// mongoose
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/notes", noteRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/stats", statsRout);

// DB connexion
mongoose.connect("mongodb://127.0.0.1:27017/db_users");

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
