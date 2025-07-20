"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "../hooks/useTheme";

type themeOption = {
  theme: "light" | "dark" | "system";
  icon: string;
};

const themeOptions: themeOption[] = [
  {
    theme: "system",
    icon: "stash:desktop-check-light",
  },
  {
    theme: "light",
    icon: "hugeicons:sun-03",
  },
  {
    theme: "dark",
    icon: "tabler:moon",
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="rounded-full px-2 py-1 flex items-center bg-[#BFBFBF66] drop-shadow-xl drop-shadow-[#77777745]">
        {themeOptions.map((i) => (
          <button
            key={i.theme}
            onClick={() => setTheme(i.theme)}
            className={`text-xl w-[35px] h-[35px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              i.theme === theme
                ? "bg-white text-black"
                : "bg-transparent text-[#A3A1A1]"
            }`}
          >
            {<Icon icon={i.icon} />}
          </button>
        ))}
      </div>
    </div>
  );
}
