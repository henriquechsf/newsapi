"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const NewsController_1 = require("../../src/controller/NewsController");
const newsRouter = express.Router();
newsRouter.route("/api/v1/news").get(NewsController_1.default.get);
newsRouter.route("/api/v1/news/:id").get(NewsController_1.default.getById);
newsRouter.route("/api/v1/news").post(NewsController_1.default.create);
newsRouter.route("/api/v1/news/:id").put(NewsController_1.default.update);
newsRouter.route("/api/v1/news/:id").delete(NewsController_1.default.delete);
exports.default = newsRouter;