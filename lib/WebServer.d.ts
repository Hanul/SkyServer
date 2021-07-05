/// <reference types="node" />
import * as HTTPS from "https";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";
export interface WebServerOptions {
    port: number;
    httpPort?: number;
    key: string;
    cert: string;
}
export default class WebServer {
    private options;
    private handler;
    static contentTypeFromPath(path: string): string;
    static encodingFromContentType(contentType: string): BufferEncoding;
    httpsServer: HTTPS.Server | undefined;
    constructor(options: WebServerOptions, handler: (webRequest: WebRequest, webResponse: WebResponse) => void);
    private load;
}
//# sourceMappingURL=WebServer.d.ts.map