import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the chat marker type
interface ChatMarker {
  id: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  participants: number;
  name?: string;
  location?: string;
  description?: string;
  duration?: string;
  tags?: string[];
  distance?: number;
  createdBy?: string;
  createdAt?: string;
  imageIndex?: number;
  borderColorIndex?: number;
  progress?: number;
}

// Define the context type
interface ChatDataContextType {
  chatMarkers: ChatMarker[];
  setChatMarkers: React.Dispatch<React.SetStateAction<ChatMarker[]>>;
  addChatMarker: (chatMarker: ChatMarker) => void;
}

// Create the context with default values
export const ChatDataContext = createContext<ChatDataContextType>({
  chatMarkers: [],
  setChatMarkers: () => {},
  addChatMarker: () => {},
});

// Props for the provider component
interface ChatDataProviderProps {
  children: ReactNode;
}

// Create the provider component
export const ChatDataProvider: React.FC<ChatDataProviderProps> = ({ children }) => {
  const [chatMarkers, setChatMarkers] = useState<ChatMarker[]>([]);

  // Function to add a new chat marker
  const addChatMarker = (chatMarker: ChatMarker) => {
    setChatMarkers(prevMarkers => [...prevMarkers, chatMarker]);
  };

  return (
    <ChatDataContext.Provider value={{ chatMarkers, setChatMarkers, addChatMarker }}>
      {children}
    </ChatDataContext.Provider>
  );
};

export default ChatDataProvider; 