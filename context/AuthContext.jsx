'use client'

import { auth, db } from "@/firebase"
import { subscriptions } from "@/utils"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {

    const { children } = props

    const { currentUser, setCurrentUser } = useState(null)
    const { userData, setUserData } = useState(null)
    //we by default have no user data or user active
    const { loading, setLoading } = useState(true) // we add a loading state, when we are checking if a user is authenticated or we're fetching their data


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setLoading(true)
                setCurrentUser(user)

                if (!user) { return }

                //if we found a user, we check the databse

                const docRef = doc(db, 'users', user.uid)

                const docSnap = await getDoc(docRef)

                console.log('Fetching user data')

                let firebaseData = { subscriptions: [] } // it's our default data of new users

                if (docSnap.exists()) {
                    //we found data
                    console.log('found user data')
                    firebaseData = docSnap.data()


                }

                setUserData(firebaseData)

                setLoading(false)


            } catch (err) {
                console.log(err.message)
            }
        })

        
                return unsubscribe
    }, [])

    const value = {
        currentUser, userData, loading
    } // anything inside this object will be passed as global



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}