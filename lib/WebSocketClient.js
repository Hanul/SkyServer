"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocketClient_1 = __importDefault(require("./AbstractSocketClient"));
class WebSocketClient extends AbstractSocketClient_1.default {
    constructor(webSocket, nativeRequest) {
        super();
    }
}
exports.default = WebSocketClient;
//# sourceMappingURL=WebSocketClient.js.map