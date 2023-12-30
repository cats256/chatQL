"use client";
import { getSession, signIn, signOut } from "next-auth/react";

export default function AuthButton(session) {
    return <>{session?.user ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => signIn("google")}>Sign In</button>}</>;
}
