import React from 'react'
import Sidebar from '../components/sidebar'
import RoomChat from '../components/RoomChat'

function Dashboard() {
    return (
        <div className='container py-10 flex justify-center h-screen'>
            <Sidebar />
            <RoomChat />
        </div>
    )
}

export default Dashboard