"use client";

import { signOut } from "next-auth/react"
const Header = () => {
    return <header className="flex items-center justify-end bg-gray-300 p-4">
        <h2 className="w-1/2 font-extrabold text-gray-600">PulseChat</h2>
        <button className="rounded-xl px-3 py-2 bg-gray-600 text-gray-100 text-sm" onClick={() => {
            signOut()
        }}>Logout</button>
    </header>
}

export default Header;