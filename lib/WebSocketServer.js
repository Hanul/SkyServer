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
const WebSocket = __importStar(require("ws"));
const WebSocketClient_1 = __importDefault(require("./WebSocketClient"));
class WebSocketServer {
    constructor(webServer, handler) {
        new WebSocket.Server({
            server: webServer.httpsServer,
        }).on("connection", (webSocket, req) => {
            handler(new WebSocketClient_1.default(webSocket, req));
        });
        skylog_1.default.success("websocket server running...");
    }
}
exports.default = WebSocketServer;
//# sourceMappingURL=WebSocketServer.js.map