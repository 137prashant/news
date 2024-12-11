"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
          The Rapid Report
          </Link>

        </div>

        <div>
          {session ? (
            <div className="flex items-center space-x-4">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details>
                    <summary className="p-0">{session.user?.name}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
                      <li><a onClick={() => signOut({ callbackUrl: '/login' })} className="bg-red-500 hover:bg-red-600">Sign Out</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          ) : (<></>)}
        </div>
      </nav>
    </header>
  );
}