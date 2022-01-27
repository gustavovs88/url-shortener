import { MongoConnection } from "./database/mongoConnection";
import express, { json, NextFunction, Request, Response } from "express";
import UrlController from "./controller/urlController";

const api = express();

api.use(express.json());

const database = new MongoConnection();
database.connect();
api.use(express.urlencoded({ extended: true }));
const urlController = new UrlController();
api.post("/shorten", urlController.shorten);
api.get("/:hash", urlController.redirect);

api.listen(5000, () => console.log("listening to port 5000"));
