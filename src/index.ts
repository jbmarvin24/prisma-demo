import express from "express";

const app = express();

const server = app.listen(3000, () => console.log("Listening on port 3000..."));

module.exports = server;
