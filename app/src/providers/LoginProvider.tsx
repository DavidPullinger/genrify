import { ReactNode, createContext, useContext, useState } from 'react';

type LoginContextType = {
    loggedIn: boolean | null;
    setLoggedIn: (loggedIn: boolean | null) => void;
};

const LoginContext = createContext<LoginContextType>({
    loggedIn: true,
    setLoggedIn: () => {},
});

// just a custom hook to use the context, for semantic reasons
export const useLogin = () => {
    const { loggedIn, setLoggedIn } = useContext(LoginContext);
    console.log(loggedIn);
    return { loggedIn, setLoggedIn };
};

// create a provider element, rather than exporting only the context to App
export function LoginProvider({ children }: { children: ReactNode }) {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(true);

    return <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</LoginContext.Provider>;
}
