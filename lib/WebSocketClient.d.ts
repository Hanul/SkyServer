/// <reference types="node" />
import HTTP from "http";
import * as WebSocket from "ws";
import AbstractSocketClient from "./AbstractSocketClient";
export default class WebSocketClient extends AbstractSocketClient {
    constructor(webSocket: WebSocket, nativeRequest: HTTP.IncomingMessage);
}
//# sourceMappingURL=WebSocketClient.d.ts.map