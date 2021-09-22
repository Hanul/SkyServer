"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
exports.default = async (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable_1.default({ multiples: true });
        form.parse(req.req, (error, fields, rawFiles) => {
            if (error !== null) {
                reject(error);
            }
            else {
                const files = [];
                for (const rawFile of Object.values(rawFiles)) {
                    if (Array.isArray(rawFile) === true) {
                        for (const rf of rawFile) {
                            files.push({
                                path: rf.path,
                                size: rf.size,
                                name: rf.name,
                                type: rf.type,
                                modifiedTime: rf.lastModifiedDate,
                            });
                        }
                    }
                    else {
                        files.push({
                            path: rawFile.path,
                            size: rawFile.size,
                            name: rawFile.name,
                            type: rawFile.type,
                            modifiedTime: rawFile.lastModifiedDate,
                        });
                    }
                }
                resolve(files);
            }
        });
    });
};
//# sourceMappingURL=parseUpload.js.map