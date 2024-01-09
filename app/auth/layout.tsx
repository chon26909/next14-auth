import React, { ReactNode } from 'react'

const AuthLayout = ({children}: { children: ReactNode }) => {
  return (
    <>
        <header className='bg-red-500'>No Auth</header>
        {children}
    </>
  )
}

export default AuthLayout