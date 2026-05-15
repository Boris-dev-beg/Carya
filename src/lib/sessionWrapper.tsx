"use client";

/**
 * ! Session dans laquelle l'authentification est accessible
 */

import {SessionProvider} from "next-auth/react"

const SessionWrapper = ({children}: {children: React.ReactNode}) =>{
    return <SessionProvider>{children}</SessionProvider>
}

export default SessionWrapper