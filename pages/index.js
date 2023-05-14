import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import LogIn from '../components/LoginButton'
import RegisterAgent from '../components/RegisterAgent'
import { useSession } from "next-auth/react"
import Navigation from '../components/Navigation'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <LogIn />
  }

  return (
    <div>
      <Navigation />
      <RegisterAgent />
    </div>
  )
}
