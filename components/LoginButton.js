import { useSession, signIn, signOut } from "next-auth/react"

export default function LogIn() {
    const { data: session } = useSession()
    console.log(session)
    if (session) {
        return (
            <>
                {session.user.name.split(" ")[0]} <span><img src={session.user.image} /></span><br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}