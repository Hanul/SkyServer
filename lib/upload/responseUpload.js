"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
exports.default = async (req, res) => {
    return new Promise((resolve, reject) => {
        const form = formidable_1.default({ multiples: true });
        form.parse(req.req, (error, fields, rawFiles) => {
            const files = [];
            for (const rawFile of Object.values(rawFiles)) {
                if (Array.isArray(rawFile) === true) {
                    for (const rf of rawFile) {
                        files.push({
                            size: rf.size,
                            name: rf.name,
                            type: rf.type,
                            modifiedTime: rf.modifiedTime,
                        });
                    }
                }
                else {
                    files.push({
                        size: rawFile.size,
                        name: rawFile.name,
                        type: rawFile.type,
                        modifiedTime: rawFile.modifiedTime,
                    });
                }
            }
            res.response({
                content: JSON.stringify(files),
            });
        });
    });
};
//# sourceMappingURL=responseUpload.js.map