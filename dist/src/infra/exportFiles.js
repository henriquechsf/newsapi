"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json2csv = require("json2csv");
const uuid = require("uuid");
const fs = require("fs");
const fields = [
    '_id',
    'hat',
    'title',
    'text',
    'author',
    'img',
    'publishDate',
    'link',
    'active'
];
// armazenando as fields em obj
const opts = { fields };
class ExportFiles {
    constructor() {
        this.tocsv = function (news) {
            try {
                const csv = json2csv.parse(news, opts);
                const filename = uuid.v4() + ".csv";
                fs.writeFile("./exports/" + filename, csv, function (err) {
                    if (err)
                        throw err;
                    console.log("Arquivo exportado com sucesso");
                });
                return filename;
            }
            catch (error) {
                console.error(error);
            }
        };
    }
}
exports.default = new ExportFiles();
