import { useState, createContext, useEffect } from "react"

const AuthContext = createContext({
    authData: {token:'', user:{userId:0, fullName:'', isAdmin:false, email:''}},
    setAuthData: (authData) => { },
    clearAuthData: () => { },
    isLoggedin: () => false,
    isAdmin: () => false,
})

export const AuthContextProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null)
    const clearAuthData = () => {
        setAuthData(null)
    }
    const isLoggedin = () => authData !== null;
    const isAdmin = () => authData && authData.user.isAdmin == true

    useEffect(() => {
        const jsonData = sessionStorage.getItem('auth');
        if (jsonData) {
            const authData = JSON.parse(jsonData)
            setAuthData(authData)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAdmin, isLoggedin, authData, setAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext