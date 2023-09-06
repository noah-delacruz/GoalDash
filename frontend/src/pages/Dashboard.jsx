import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Dashboard() {
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth)

    React.useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div>
            Dashboard
        </div>
    )
}