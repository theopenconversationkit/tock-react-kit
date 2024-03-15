import { Context, createContext, useContext } from 'react';

const MessageMetadataCtx: Context<Record<string, string>> = createContext({});

export const MessageMetadataContext = MessageMetadataCtx.Provider;

/**
 * Returns the metadata associated with the surrounding message
 */
export const useMessageMetadata = (): Record<string, string> => {
  return useContext(MessageMetadataCtx);
};
