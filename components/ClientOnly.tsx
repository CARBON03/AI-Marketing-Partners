'use client'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default dynamic(() => Promise.resolve(ClientOnly), {
  ssr: false
})