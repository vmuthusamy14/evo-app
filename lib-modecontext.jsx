import React, { createContext, useContext, useState } from "react";

const ModeContext = createContext(null);

export function ModeProvider({ children }) {
  const [activeMode, setActiveMode] = useState(null); // null | "personal" | "business"
  return (
    <ModeContext.Provider value={{ activeMode, setActiveMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
