// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Sse {
  let sseIsEnabled = false;
  let eventSource: EventSource;
  let notInitialised: boolean;

  export function init(
    tockEndPoint: string,
    userId: string,
    handleBotResponse: (botResponse: any) => void,
    onSseStateChange: (state: number) => void,
  ): Promise<void> {
    return new Promise<void>((afterInit: () => void): void => {
      if (typeof EventSource !== 'undefined' && tockEndPoint && !eventSource) {
        notInitialised = true;
        eventSource = new EventSource(tockEndPoint + '/sse?userid=' + userId);
        setTimeout(() => onSseStateChange(eventSource.readyState));
        eventSource.addEventListener(
          'message',
          (e: MessageEvent) => {
            handleBotResponse(JSON.parse(e.data));
          },
          false,
        );
        eventSource.addEventListener(
          'open',
          () => {
            onSseStateChange(eventSource.readyState);
            sseIsEnabled = true;
            if (notInitialised) {
              afterInit();
              notInitialised = false;
            }
          },
          false,
        );
        eventSource.addEventListener(
          'error',
          () => {
            if (eventSource.readyState == EventSource.CLOSED) {
              onSseStateChange(eventSource.readyState);
              sseIsEnabled = false;
              if (notInitialised) {
                afterInit();
                notInitialised = false;
              }
            }
          },
          false,
        );
      }
    });
  }

  export function isEnable(): boolean {
    return sseIsEnabled;
  }
}
