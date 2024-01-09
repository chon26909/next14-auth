import React, { ReactNode } from 'react'

const DashboardLayout = ({ children }: {children: ReactNode}) => {
  return (
    <div className='flex flex-col gap-y-4'>
        <header className='bg-black text-white'>
            Header 
        </header>
        {children}
    </div>
  )
}

export default DashboardLayout