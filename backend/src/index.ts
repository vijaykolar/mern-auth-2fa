import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!@@@@");
});

app.get("/app", (req, res) => {
  res.send("Hello World app");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
