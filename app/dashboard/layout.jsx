import React from 'react'
import Header from './_components/Header'

function DashboardLayout({children}) {
  return (
    
    <div className="min-h-screen bg-gray-50">
      
      <Header/>
      <div className='mx-5 md:mx-20 lg:mx-36'>
      {children}
      </div>
      </div>
  )
}

export default DashboardLayout