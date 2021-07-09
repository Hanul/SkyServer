import * as HTTP from "http";
import * as HTTPS from "https";
import * as Path from "path";
import SkyFiles from "skyfiles";
import SkyLog from "skylog";
import CONTENT_TYPES from "./CONTENT_TYPES.json";
import ENCODINGS from "./ENCODINGS.json";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";

export interface WebServerOptions {
    port: number;
    httpPort?: number;
    key: string;
    cert: string;
}

export default class WebServer {

    public static contentTypeFromPath(path: string): string {
        const extension = Path.extname(path).substring(1);
        const contentType = (CONTENT_TYPES as any)[extension];
        return contentType === undefined ? "application/octet-stream" : contentType;
    }

    public static encodingFromContentType(contentType: string): BufferEncoding {
        const encoding = (ENCODINGS as any)[contentType];
        return encoding === undefined ? "binary" : encoding;
    }

    public httpsServer: HTTPS.Server | undefined;

    constructor(
        private options: WebServerOptions,
        private handler: (webRequest: WebRequest, webResponse: WebResponse) => void,
        private notFoundHandler?: (webRequest: WebRequest, webResponse: WebResponse) => void,
    ) {
        this.load();
    }

    private async load() {

        const key = await SkyFiles.readBuffer(this.options.key);
        const cert = await SkyFiles.readBuffer(this.options.cert);

        this.httpsServer = HTTPS.createServer({ key, cert }, async (req, res) => {

            const webRequest = new WebRequest(req);
            const webResponse = new WebResponse(webRequest, res);

            this.handler(webRequest, webResponse);
            if (webResponse.responsed !== true) {
                //TODO: serve file.
                if (this.notFoundHandler !== undefined && webResponse.responsed !== true) {
                    this.notFoundHandler(webRequest, webResponse);
                }
            }
        }).listen(this.options.port);

        this.httpsServer.on("error", (error) => {
            SkyLog.error(error, this.options);
        });

        // http -> https redirect
        HTTP.createServer((req, res) => {
            res.writeHead(302, {
                Location: `https://${req.headers.host}${this.options.port === 443 ? "" : `:${this.options.port}`}${req.url}`,
            });
            res.end();
        }).listen(this.options.httpPort);

        SkyLog.success(`web server running... https://localhost:${this.options.port}`);
    }
}
