import { createContext, useContext, useEffect, useState } from "react";

const ToggleContext = createContext();

function ToggleProvider(props, { children }) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };

  return (
    <ToggleContext.Provider value={value} {...props}>
      {children}
    </ToggleContext.Provider>
  );
}

function useToggle() {
  const context = useContext(ToggleContext);

  if (typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { ToggleProvider, useToggle };
