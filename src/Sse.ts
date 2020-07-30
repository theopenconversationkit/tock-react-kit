export namespace Sse {
    let sseIsEnabled = false;
    let eventSource: EventSource;

    export function init(tockEndPoint: string,
                         userId: string,
                         handleBotResponse: (botResponse: any) => void,
                         onSseStateChange: (state: number) => void): Promise<void> {
        return new Promise<void>((afterInit: () => void): void => {
            if (typeof (EventSource) !== "undefined" && tockEndPoint && !eventSource) {
                eventSource = new EventSource(tockEndPoint + '/sse?userid=' + userId);
                setTimeout(() => onSseStateChange(eventSource.readyState))
                eventSource.addEventListener('message', (e: MessageEvent) => {
                    handleBotResponse(JSON.parse(e.data))
                }, false);
                eventSource.addEventListener('open', () => {
                    onSseStateChange(eventSource.readyState)
                    sseIsEnabled = true;
                    afterInit();
                }, false);
                eventSource.addEventListener('error', () => {
                    if (eventSource.readyState == EventSource.CLOSED) {
                        onSseStateChange(eventSource.readyState);
                        sseIsEnabled = false;
                        afterInit()
                    }
                }, false);
            }
        });
    }

    export function isEnable(): boolean {
        return sseIsEnabled
    }
}