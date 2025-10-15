const next = require("next");
const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use("/api/goals", require("./routes/goalRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));

// // Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve((__dirname, "../", "frontend", "build", "index.html"))
//     )
//   );
// } else {
//   app.get("/", (req, res) =>
//     res.send("Go to the .env file and set NODE_ENV to production.")
//   );
// }

// app.use(errorHandler);

// app.listen(port, () => console.log(`Server started on port ${port}`));

// THE BELOW WORKS FOR NEXTJS SPECIFICALLY WHILE THE ABOVE WORKS FOR CREATE REACT APP
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./frontend" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use("/api/goals", require("./routes/goalRoutes"));
  server.use("./api/users", require("./routes/userRoutes"));

  // NextJS handles frontend routes
  server.all(/.*/, (req, res) => {
    return handle(req, res);
  });

  server.use(errorHandler);

  server.listen(port, () => console.log(`Server started on port ${port}`));
});
