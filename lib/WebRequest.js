"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Querystring = __importStar(require("querystring"));
const skyrouter_1 = require("skyrouter");
class WebRequest {
    constructor(req) {
        this.req = req;
        this.parameters = {};
        this.toString = () => {
            return JSON.stringify({
                headers: this.headers,
                method: this.method,
                ip: this.ip,
                parameterString: this.parameterString,
                parameters: this.parameters,
                uri: this.uri,
            });
        };
        this.headers = req.headers;
        this.method = req.method.toUpperCase();
        let ip;
        const headerIps = this.headers["x-forwarded-for"];
        if (headerIps !== undefined) {
            if (typeof headerIps === "string") {
                ip = headerIps;
            }
            else {
                ip = headerIps[0];
            }
        }
        if (ip === undefined) {
            ip = req.socket.remoteAddress;
            if (ip === undefined) {
                ip = "";
            }
        }
        if (ip.substring(0, 7) === "::ffff:") {
            ip = ip.substring(7);
        }
        this.ip = ip;
        this.uri = req.url;
        if (this.uri.indexOf("?") !== -1) {
            this.parameterString = this.uri.substring(this.uri.indexOf("?") + 1);
            this.uri = this.uri.substring(0, this.uri.indexOf("?"));
        }
        else {
            this.parameterString = "";
        }
        this.uri = this.uri.substring(1);
    }
    parseParams() {
        const queryParams = Querystring.parse(this.parameterString);
        for (const [name, param] of Object.entries(queryParams)) {
            if (Array.isArray(param) === true) {
                this.parameters[name] = queryParams[param.length - 1];
            }
            else {
                this.parameters[name] = queryParams[name];
            }
        }
    }
    async route(pattern, handler) {
        const viewParams = {};
        if (skyrouter_1.URIParser.parse(this.uri, pattern, viewParams) === true) {
            await handler(viewParams);
        }
    }
}
exports.default = WebRequest;
//# sourceMappingURL=WebRequest.js.map