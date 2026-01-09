import { Context, createContext, Dispatch, Reducer, useContext } from "react";
import { QuickReply } from "./model/buttons";
import { Message } from "./model/messages";

export const TockStateContext: Context<TockState | undefined> = createContext<
	TockState | undefined
>(undefined);
export const TockStateDispatch: Context<Dispatch<TockAction> | undefined> =
	createContext<Dispatch<TockAction> | undefined>(undefined);

export const useTockState: () => TockState = () => {
	const state: TockState | undefined = useContext(TockStateContext);
	if (!state) {
		throw new Error("useTockState must be used in a TockContext");
	}
	return state;
};

export const useTockDispatch: () => Dispatch<TockAction> = () => {
	const dispatch: Dispatch<TockAction> | undefined =
		useContext(TockStateDispatch);
	if (!dispatch) {
		throw new Error("useTockDispatch must be used in a TockContext");
	}
	return dispatch;
};

export interface TockState {
	quickReplies: QuickReply[];
	messages: Message[];
	userId: string;
	loading: boolean;
	sseInitializing: boolean;
	metadata: Record<string, string>;
	error: boolean;
}

export interface TockAction {
	type:
		| "SET_QUICKREPLIES"
		| "ADD_MESSAGE"
		| "UPDATE_MESSAGE"
		| "SET_METADATA"
		| "SET_LOADING"
		| "SET_SSE_INITIALIZING"
		| "CLEAR_MESSAGES"
		| "SET_ERROR";
	quickReplies?: QuickReply[];
	messages?: Message[];
	loading?: boolean;
	sseInitializing?: boolean;
	metadata?: Record<string, string>;
	error?: boolean;
}

export const tockReducer: Reducer<TockState, TockAction> = (
	state: TockState,
	action: TockAction,
): TockState => {
	switch (action.type) {
		case "SET_QUICKREPLIES":
			if (action.quickReplies) {
				return {
					...state,
					quickReplies: action.quickReplies,
					error: !!action.error,
				};
			}
			break;
		case "ADD_MESSAGE":
			if (action.messages) {
				return {
					...state,
					messages: [...state.messages, ...action.messages],
					error: !!action.error,
				};
			}
			break;

		case "UPDATE_MESSAGE":
			if (action.messages) {
				let messageAlreadyExists = false;

				const newMessages = state.messages.map((message) => {
					// Search if a streamed message with the same responseId already exists
					const messageExists = action.messages?.find((m) => {
						const isMessageExists =
							m.metadata?.RESPONSE_ID === message.metadata?.RESPONSE_ID &&
							m.metadata?.TOCK_STREAM_RESPONSE === "true" &&
							message.metadata?.TOCK_STREAM_RESPONSE === "true";

						if (isMessageExists) {
							messageAlreadyExists = true;
						}

						return isMessageExists;
					});

					// If the message already exists, replace with the new message
					if (messageExists) {
						return messageExists;
					}

					// Else return the original message
					return message;
				});

				// If the message is new, add it to the messages
				// We can have multiple messages with the same responseId, but we only want to add the last one (chunks when streaming is disabled)
				if (!messageAlreadyExists) {
					const messagesToAdd: Message[] = [];
					const seenResponseIds = new Set<string>();

					for (let i = action.messages.length - 1; i >= 0; i--) {
						const message = action.messages[i];
						const responseId = message.metadata?.RESPONSE_ID;
						const isStreamedResponse = message.metadata?.TOCK_STREAM_RESPONSE;

						if (responseId && isStreamedResponse === "true") {
							if (!seenResponseIds.has(responseId)) {
								seenResponseIds.add(responseId);
								messagesToAdd.push(message);
							}
						} else {
							messagesToAdd.push(message);
						}
					}

					messagesToAdd.reverse();

					newMessages.push(...messagesToAdd);
				}

				return {
					...state,
					messages: newMessages,
					error: !!action.error,
				};
			}
			break;
		case "SET_LOADING":
			if (action.loading != undefined) {
				return {
					...state,
					loading: action.loading,
				};
			}
			break;
		case "SET_SSE_INITIALIZING":
			if (action.sseInitializing != undefined) {
				return {
					...state,
					sseInitializing: action.sseInitializing,
					error: !!action.error,
				};
			}
			break;
		case "CLEAR_MESSAGES":
			if (state.messages) {
				return {
					...state,
					messages: [],
				};
			}
			break;
		case "SET_METADATA":
			if (action.metadata != undefined) {
				return {
					...state,
					metadata: action.metadata,
				};
			}
			break;
		case "SET_ERROR":
			return {
				...state,
				error: !!action.error,
			};
		default:
			break;
	}
	return state;
};
