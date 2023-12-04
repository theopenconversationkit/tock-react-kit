import { UseLocalTools } from './useLocalTools';
import { Message } from './model/messages';
import { QuickReply } from './model/buttons';

export interface TockHistoryData {
  readonly messages: Message[];
  readonly quickReplies: QuickReply[];
}

export interface PostInitContext extends UseLocalTools {
  /**
   * The full chat history at the time the Chat component is initialized, which includes messages from local storage
   * and/or from TockContext, or null if there is no chat history at all.
   */
  readonly history: TockHistoryData | null;
  /**
   * Sends a regular text message as if typed by a user. The message will be visible in the chat.
   * @param message an arbitrary string
   */
  readonly sendMessage: (message: string) => Promise<void>;
  /**
   * Sends a payload to the backend as if a button was triggered.
   * @param payload a string representing a TOCK intent name, followed by URL-like query parameters
   */
  readonly sendPayload: (payload: string) => Promise<void>;
  readonly clearMessages: () => void;
}
