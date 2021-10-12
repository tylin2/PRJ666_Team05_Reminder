import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

export const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password) 
    //export declare function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
    //Creates a new user account associated with the specified email address and password.
    //On successful creation of the user account, this user will also be signed in to your application.
    //User account creation can fail if the account already exists or the password is invalid.
    //https://firebase.google.com/docs/reference/js/auth.md#createuserwithemailandpassword
    //https://firebase.google.com/docs/reference/js/auth.usercredential.md#usercredentialuser
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => { //https://firebase.google.com/docs/reference/js/auth.md#onauthstatechanged
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe 
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}