"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const skylog_1 = __importDefault(require("skylog"));
const ZLib = __importStar(require("zlib"));
const ENCODINGS_json_1 = __importDefault(require("./ENCODINGS.json"));
class WebResponse {
    constructor(webRequest, res) {
        this.webRequest = webRequest;
        this.res = res;
        const headers = webRequest.headers["accept-encoding"];
        if (typeof headers === "string") {
            this.acceptEncoding = headers;
        }
        else if (headers === undefined) {
            this.acceptEncoding = "";
        }
        else {
            this.acceptEncoding = headers[0];
        }
    }
    response({ headers = {}, statusCode, contentType, encoding, content, }) {
        if (contentType !== undefined) {
            if (encoding === undefined) {
                encoding = ENCODINGS_json_1.default[contentType];
            }
            headers["Content-Type"] = `${contentType}; charset=${encoding}`;
        }
        if (content === undefined) {
            content = "";
        }
        if (statusCode === undefined) {
            statusCode = 200;
        }
        if (encoding === undefined) {
            encoding = "utf-8";
        }
        if (encoding === "utf-8" && typeof this.acceptEncoding === "string" && this.acceptEncoding.match(/\bgzip\b/) !== null) {
            headers["Content-Encoding"] = "gzip";
            ZLib.gzip(content, (error, buffer) => {
                if (error !== null) {
                    skylog_1.default.error(error, this.webRequest);
                }
                else {
                    this.res.writeHead(statusCode, headers);
                    this.res.end(buffer, encoding);
                }
            });
        }
        else {
            this.res.writeHead(statusCode, headers);
            this.res.end(content, encoding);
        }
    }
}
exports.default = WebResponse;
//# sourceMappingURL=WebResponse.js.map