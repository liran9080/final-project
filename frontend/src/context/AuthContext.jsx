import { useState, createContext, useEffect } from "react"

const AuthContext = createContext({
    authData: {token:'', user:{userId:0, fullName:'', isAdmin:false, email:''}},
    setAuthData: (authData) => { },
    updateUserData: (user) => { },
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
    const updateUserData = (user) => { 
        setAuthData( currentUser => {
            const updatedAuthData = {...currentUser};
            updatedAuthData.user.fullName = user.fullName;
            updatedAuthData.user.email = user.email;
            sessionStorage.setItem('auth', JSON.stringify(updatedAuthData))
            return updatedAuthData
        })
    }
    useEffect(() => {
        const jsonData = sessionStorage.getItem('auth');
        if (jsonData) {
            const authData = JSON.parse(jsonData)
            setAuthData(authData)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAdmin, isLoggedin, authData, setAuthData, updateUserData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext