"use client";

import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        SkillMatch
      </h1>

      <nav className="flex items-center space-x-6">
        <Link
          href="/contratos"
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          Contratos
        </Link>
        <Link
          href="/trabajadores"
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          Colaboradores
        </Link>

        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
        />
      </nav>
    </header>
  );
}
