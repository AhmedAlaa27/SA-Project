import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ProtectedRoute from './ProtectedRoute'

function Layout({ children }) {
    return (
        <ProtectedRoute>
            <div className="App">
                < Navbar />
                <div className='container-fluid main-body'>
                    <div className='row'>
                        <div className='col-2'>< Sidebar /></div>
                        <div className='col-10'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default Layout