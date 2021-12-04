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
const skylog_1 = __importDefault(require("skylog"));
const skyutil_1 = __importDefault(require("skyutil"));
const WebSocket = __importStar(require("ws"));
const WebSocketClient_1 = __importDefault(require("./WebSocketClient"));
class WebSocketServer {
    constructor(webServer, handler) {
        this.webServer = webServer;
        this.handler = handler;
        this.clients = [];
        if (webServer.httpsServer === undefined) {
            webServer.on("load", async () => this.launch());
        }
        else {
            this.launch();
        }
    }
    launch() {
        new WebSocket.Server({
            server: this.webServer.httpsServer,
        }).on("connection", (webSocket, req) => {
            const client = new WebSocketClient_1.default(this, webSocket, req);
            this.clients.push(client);
            webSocket.on("close", () => skyutil_1.default.pull(this.clients, client));
            this.handler(client);
        });
        skylog_1.default.success("websocket server running...");
    }
}
exports.default = WebSocketServer;
//# sourceMappingURL=WebSocketServer.js.map