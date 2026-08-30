import { useTheme } from "../../context/ThemeContext";

function ThemeToggle() {
  const { dark, setDark } = useTheme();

  return (
    <button
      className="btn btn-dark"
      onClick={() => setDark(!dark)}
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}

export default ThemeToggle;