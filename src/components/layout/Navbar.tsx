import { Link, useLocation } from "react-router-dom";
import { personalInfo } from "@/data/personal";

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const navItems = [
    { label: "Inicio", href: "/#home" },
    { label: "Sobre mí", href: "/#about" },
    { label: "Proyectos", href: "/#projects" },
    { label: "Habilidades", href: "/#skills" },
    { label: "Contacto", href: "/#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si estamos en home y el link es un hash, dejamos que useScrollToHash lo maneje
    if (isHome && href.startsWith("/#")) {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <Link to={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          {personalInfo.name}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="rounded-lg transition-colors"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/#contact"
          className="btn btn-primary"
          onClick={(e) => handleNavClick(e, "/#contact")}
        >
          Contáctame
        </Link>
      </div>
    </div>
  );
}
