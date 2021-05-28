import SkyLog from "skylog";
import * as HTTP from "http";
import * as WebSocket from "ws";
import WebServer from "./WebServer";
import WebSocketClient from "./WebSocketClient";

export default class WebSocketServer {

    constructor(webServer: WebServer, handler: (client: WebSocketClient) => void) {

        new WebSocket.Server({
            server: webServer.httpsServer,
        }).on("connection", (webSocket: WebSocket, req: HTTP.IncomingMessage) => {
            handler(new WebSocketClient(webSocket, req));
        });

        SkyLog.success("websocket server running...");
    }
}
