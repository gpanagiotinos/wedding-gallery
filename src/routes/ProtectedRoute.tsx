import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = () => {
    const auth = useAuth()
    const outlet = useOutlet()

    if (!auth?.user) {
        return <Navigate to="/login" />
    }

    return <div>{outlet}</div>
}

export default ProtectedRoute
