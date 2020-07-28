export namespace Sse {
    let sseIsEnabled = false;
    let eventSource: EventSource;

    export function init(tockEndPoint: string,
                         userId: string,
                         handleBotResponse: (botResponse: any) => void,
                         onSseStateChange: (state: number) => void): Promise<void> {
        return new Promise<void>((nextAction: () => void): void => {
            if (typeof (EventSource) !== "undefined" && tockEndPoint && !eventSource) {
                eventSource = new EventSource(tockEndPoint + '/sse?userid=' + userId);
                setTimeout(() => onSseStateChange(EventSource.CONNECTING))
                eventSource.addEventListener('message', (e: MessageEvent) => {
                    handleBotResponse(JSON.parse(e.data))
                }, false);
                eventSource.addEventListener('open', (e: Event) => {
                    sseIsEnabled = true;
                    onSseStateChange(EventSource.OPEN)
                    nextAction();
                }, false);
                eventSource.addEventListener('error', (e: Event) => {
                    // @ts-ignore
                    if (e.readyState == EventSource.CLOSED) {
                        sseIsEnabled = false;
                        onSseStateChange(EventSource.CLOSED);
                    }
                    nextAction()
                }, false);
            }
        });
    }

    export function isEnable(): boolean {
        return sseIsEnabled
    }
}