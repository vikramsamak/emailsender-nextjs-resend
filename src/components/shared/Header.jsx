import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Header() {
  return (
    <header className="flex justify-between items-center w-full h-auto p-4">
      <h2 className="font-mono font-semibold uppercase tracking-wide">EMAIL SENDER</h2>
      <ThemeSwitcher />
    </header>
  );
}

export default Header;
