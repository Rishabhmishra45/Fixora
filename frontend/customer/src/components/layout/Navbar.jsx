import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Fixora</h1>

        <div className="flex gap-2">
          {["light", "dark", "midnight"].map((t) => (
            <button
              key={t}
              onClick={() => toggleTheme(t)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                theme === t
                  ? "bg-primary text-white"
                  : "bg-border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
