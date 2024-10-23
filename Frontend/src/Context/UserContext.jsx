import { createContext, useState } from "react";

export const UserContext = createContext({ isAuthenticated: false })

export const UserContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
