/// <reference types="node" />
import * as HTTPS from "https";
export interface WebServerOptions {
    port: number;
    httpPort?: number;
    key: string | Buffer;
    cert: string | Buffer;
}
export default class WebServer {
    static readonly CONTENT_TYPES: {
        [extension: string]: string;
    };
    static readonly ENCODINGS: {
        [contentType: string]: BufferEncoding;
    };
    static contentTypeFromPath(path: string): string;
    static encodingFromContentType(contentType: string): BufferEncoding;
    httpsServer: HTTPS.Server;
    constructor(options: WebServerOptions);
}
//# sourceMappingURL=WebServer.d.ts.map