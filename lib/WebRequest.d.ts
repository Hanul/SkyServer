/// <reference types="node" />
import * as HTTP from "http";
import { ViewParams } from "skyrouter";
export default class WebRequest {
    req: HTTP.IncomingMessage;
    headers: HTTP.IncomingHttpHeaders;
    method: string;
    ip: string;
    parameterString: string;
    parameters: {
        [name: string]: any;
    };
    uri: string;
    private routed;
    constructor(req: HTTP.IncomingMessage);
    parseParams(): void;
    route(pattern: string, handler: (viewParams: ViewParams) => void): void;
    toString: () => string;
}
//# sourceMappingURL=WebRequest.d.ts.map