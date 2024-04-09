const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
mongoose.set("useFindAndModify", false);

const app = express();

app.use(cors());
//DB config
const db = config.get("mongoURI");
//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'animeDB'
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//Body Parser Middleware
app.use(express.json());

app.use("/api/animes", require("./routes/api/animes"));
app.use("/api/reviews", require("./routes/api/reviews"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
