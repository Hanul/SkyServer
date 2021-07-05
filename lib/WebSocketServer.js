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