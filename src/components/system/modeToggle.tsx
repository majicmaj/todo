import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn btn-ghost btn-circle">
        <div className="swap swap-rotate">
          {/* Sun icon */}
          <Sun className="swap-on h-5 w-5" />
          {/* Moon icon */}
          <Moon className="swap-off h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </div>
      </summary>

      <div className="dropdown-content menu menu-sm mt-3 w-32 rounded-box bg-base-100 p-2 shadow-lg">
        <button className="btn" onClick={() => setTheme("light")}>
          Light
        </button>
        <button className="btn" onClick={() => setTheme("dark")}>
          Dark
        </button>
        <button className="btn" onClick={() => setTheme("system")}>
          System
        </button>
      </div>
    </details>
  );
}

export default ModeToggle;
