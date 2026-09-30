import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const AppLayout = () => {
  const { pathname } = useLocation();
  const linkClass = ({ isActive }) =>
    isActive ? 'font-semibold text-blue-700' : 'text-slate-600 hover:text-blue-700';

  useEffect(() => {
    const pageTitle = pathname === '/' ? 'Home' : pathname === '/about' ? 'About' : 'Not Found';
    document.title = `Anveshan | ${pageTitle}`;
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <NavLink className="text-xl font-bold" to="/">
            Anveshan
          </NavLink>
          <div className="flex gap-6 text-sm">
            <NavLink className={linkClass} to="/">
              Home
            </NavLink>
            <NavLink className={linkClass} to="/about">
              About
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
