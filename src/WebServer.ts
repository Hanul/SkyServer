import * as HTTP from "http";
import * as HTTPS from "https";
import * as Path from "path";
import SkyLog from "skylog";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";

export interface WebServerOptions {
    port: number;
    httpPort?: number;
    key: string | Buffer;
    cert: string | Buffer;
}

export default class WebServer {

    public static readonly CONTENT_TYPES: { [extension: string]: string } = require("./CONTENT_TYPES.json");
    public static readonly ENCODINGS: { [contentType: string]: BufferEncoding } = require("./ENCODINGS.json");

    public static contentTypeFromPath(path: string): string {
        const extension = Path.extname(path).substring(1);
        const contentType = this.CONTENT_TYPES[extension];
        return contentType === undefined ? "application/octet-stream" : contentType;
    }

    public static encodingFromContentType(contentType: string): BufferEncoding {
        const encoding = this.ENCODINGS[contentType];
        return encoding === undefined ? "binary" : encoding;
    }

    public httpsServer: HTTPS.Server;

    constructor(options: WebServerOptions, handler: (webRequest: WebRequest, webResponse: WebResponse) => void) {

        this.httpsServer = HTTPS.createServer({ key: options.key, cert: options.cert }, async (req, res) => {
            //TODO:
        }).listen(options.port);

        this.httpsServer.on("error", (error) => {
            SkyLog.error(error, options);
        });

        // http -> https redirect
        HTTP.createServer((req, res) => {
            res.writeHead(302, {
                Location: `https://${req.headers.host}${options.port === 443 ? "" : `:${options.port}`}${req.url}`,
            });
            res.end();
        }).listen(options.httpPort);

        SkyLog.success(`web server running... https://localhost:${options.port}`);
    }
}
