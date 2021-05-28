"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP = __importStar(require("http"));
const HTTPS = __importStar(require("https"));
const Path = __importStar(require("path"));
const skylog_1 = __importDefault(require("skylog"));
class WebServer {
    constructor(options) {
        this.httpsServer = HTTPS.createServer({ key: options.key, cert: options.cert }, async (req, res) => {
        }).listen(options.port);
        this.httpsServer.on("error", (error) => {
            skylog_1.default.error(error, options);
        });
        HTTP.createServer((req, res) => {
            res.writeHead(302, {
                Location: `https://${req.headers.host}${options.port === 443 ? "" : `:${options.port}`}${req.url}`,
            });
            res.end();
        }).listen(options.httpPort);
        skylog_1.default.success(`web server running... https://localhost:${options.port}`);
    }
    static contentTypeFromPath(path) {
        const extension = Path.extname(path).substring(1);
        const contentType = this.CONTENT_TYPES[extension];
        return contentType === undefined ? "application/octet-stream" : contentType;
    }
    static encodingFromContentType(contentType) {
        const encoding = this.ENCODINGS[contentType];
        return encoding === undefined ? "binary" : encoding;
    }
}
exports.default = WebServer;
WebServer.CONTENT_TYPES = require("./CONTENT_TYPES.json");
WebServer.ENCODINGS = require("./ENCODINGS.json");
//# sourceMappingURL=WebServer.js.map