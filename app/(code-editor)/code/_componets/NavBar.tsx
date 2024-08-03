import { ThemeSwitcher } from "@/components/theme-switcher";

export const NavBar = () => {
  return (
    <>
      <nav className="h-16 bg-white dark:bg-gray-900 shadow">
        <ThemeSwitcher />
      </nav>
    </>
  );
};
