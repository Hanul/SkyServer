"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
exports.default = (req, res) => {
    const form = formidable_1.default({ multiples: true });
    form.parse(req.req, (error, fields, files) => {
        console.log(error, fields, files);
    });
};
//# sourceMappingURL=responseUpload.js.map