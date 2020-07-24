"use strict";
/**
 * Arquivo para upload de arquivos usando a lib multer
 */
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const uploads = multer({ storage: storage });
exports.default = uploads;
