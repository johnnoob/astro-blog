import React from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type ThemeSwitchProps = {
  theme: "light" | "dark" | "system";
  handleThemeChange: (e: boolean) => void;
};

export function ThemeModeSwitch({
  theme,
  handleThemeChange,
}: ThemeSwitchProps) {
  return (
    <div className="flex items-center space-x-1">
      <Switch checked={theme === "dark"} onCheckedChange={handleThemeChange} />
      {theme === "light" ? <Sun /> : <Moon />}
    </div>
  );
}
