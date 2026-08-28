import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Role = "Citizen" | "Student" | "University" | "Industry" | "NGO" | "Government";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Citizen");
  const [isDark, setIsDark] = useState(false); // Default to light mode

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initialize theme
  React.useEffect(() => {
    // Light mode by default, so we don't add the dark class
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole, isDark, toggleTheme }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
