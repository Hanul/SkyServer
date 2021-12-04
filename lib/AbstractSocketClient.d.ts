import EventContainer from "eventcontainer";
export default abstract class AbstractSocketClient extends EventContainer {
    abstract send(method: string, ...params: any[]): void;
}
//# sourceMappingURL=AbstractSocketClient.d.ts.map