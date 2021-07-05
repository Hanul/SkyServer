"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP = __importStar(require("http"));
const HTTPS = __importStar(require("https"));
const Path = __importStar(require("path"));
const skyfiles_1 = __importDefault(require("skyfiles"));
const skylog_1 = __importDefault(require("skylog"));
const CONTENT_TYPES_json_1 = __importDefault(require("./CONTENT_TYPES.json"));
const ENCODINGS_json_1 = __importDefault(require("./ENCODINGS.json"));
const WebRequest_1 = __importDefault(require("./WebRequest"));
const WebResponse_1 = __importDefault(require("./WebResponse"));
class WebServer {
    constructor(options, handler) {
        this.options = options;
        this.handler = handler;
        this.load();
    }
    static contentTypeFromPath(path) {
        const extension = Path.extname(path).substring(1);
        const contentType = CONTENT_TYPES_json_1.default[extension];
        return contentType === undefined ? "application/octet-stream" : contentType;
    }
    static encodingFromContentType(contentType) {
        const encoding = ENCODINGS_json_1.default[contentType];
        return encoding === undefined ? "binary" : encoding;
    }
    async load() {
        const key = await skyfiles_1.default.readBuffer(this.options.key);
        const cert = await skyfiles_1.default.readBuffer(this.options.cert);
        this.httpsServer = HTTPS.createServer({ key, cert }, async (req, res) => {
            const webRequest = new WebRequest_1.default(req);
            this.handler(webRequest, new WebResponse_1.default(webRequest, res));
        }).listen(this.options.port);
        this.httpsServer.on("error", (error) => {
            skylog_1.default.error(error, this.options);
        });
        HTTP.createServer((req, res) => {
            res.writeHead(302, {
                Location: `https://${req.headers.host}${this.options.port === 443 ? "" : `:${this.options.port}`}${req.url}`,
            });
            res.end();
        }).listen(this.options.httpPort);
        skylog_1.default.success(`web server running... https://localhost:${this.options.port}`);
    }
}
exports.default = WebServer;
//# sourceMappingURL=WebServer.js.map