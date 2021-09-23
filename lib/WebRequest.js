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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const Querystring = __importStar(require("querystring"));
const skyrouter_1 = require("skyrouter");
class WebRequest {
    constructor(req) {
        this.req = req;
        this.parameters = {};
        this.responsed = false;
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
    async loadBody() {
        var e_1, _a;
        const buffers = [];
        try {
            for (var _b = __asyncValues(this.req), _c; _c = await _b.next(), !_c.done;) {
                const chunk = _c.value;
                buffers.push(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Buffer.concat(buffers).toString();
    }
    async route(pattern, handler) {
        const viewParams = {};
        if (this.responsed !== true && skyrouter_1.URIParser.parse(this.uri, pattern, viewParams) === true) {
            await handler(viewParams);
        }
    }
}
exports.default = WebRequest;
//# sourceMappingURL=WebRequest.js.map