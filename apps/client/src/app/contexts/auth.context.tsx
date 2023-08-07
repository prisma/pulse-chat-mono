"use client";

import React, { createContext, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export const AuthContext = createContext(null);

const AuthProvider: React.FC<any> = ({ children }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if ( !session && status !== 'loading' ) {
            signIn()
        } 
    }, [session, status])

    // Don't render a page unless we're sure there is a session
    return <AuthContext.Provider value={null}>
        {(status == 'authenticated') ? children  : null}
    </AuthContext.Provider>
}

export default AuthProvider