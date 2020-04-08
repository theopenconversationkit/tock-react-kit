export namespace Sse {
  let sseIsEnabled = false;
  let eventSource: EventSource;

  export function init(tockEndPoint: string, userId: string, handleBotResponse: (botResponse: any) => void) {
    if (typeof (EventSource) !== "undefined" && tockEndPoint && !eventSource) {
      eventSource = new EventSource(tockEndPoint + '/sse?userid=' + userId);
      eventSource.addEventListener('message', (e: MessageEvent) => {
        handleBotResponse(JSON.parse(e.data))
      }, false);
      eventSource.addEventListener('open', (e: Event) => {
        sseIsEnabled = true;
      }, false);
      eventSource.addEventListener('error', (e: Event) => {
        // @ts-ignore
        if (e.readyState == EventSource.CLOSED) {
          sseIsEnabled = false;
        }
      }, false);
    }
  }

  export function isEnable(): boolean {
    return sseIsEnabled
  }
}