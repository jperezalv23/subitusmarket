// app/components/Header.tsx
"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "../client";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b">
      <h1 className="text-xl font-bold text-gray-800">Mi App Web3</h1>
      <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
    </header>
  );
}
