import { createContext, useState } from "react";

export const UserContext = createContext({
    userInfo:null,
    setuserInfo:() => {}
})

export function UserContextProvider({children}){
    const [userInfo, setuserInfo] = useState(null)
    return(
        <UserContext.Provider value={{userInfo, setuserInfo}}>
            {children}
        </UserContext.Provider>
    )
}