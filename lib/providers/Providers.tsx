// components/Providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import { UserProvider } from "../context/UserContext"; // Adjust the path as needed

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
}
