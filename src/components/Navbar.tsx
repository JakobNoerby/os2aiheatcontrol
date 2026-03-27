import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import os2Logo from "@/assets/os2-logo.png";

const navItems = [
  { label: "Introduktion", href: "#intro" },
  { label: "Grundelementer", href: "#grundelementer" },
  { label: "Markedet", href: "#leverandoerer" },
  { label: "Governance", href: "#governance" },
  { label: "Datamodel", href: "#datamodel" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_1px_0_hsl(var(--border))] backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-12">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <img src={os2Logo} alt="OS2" className="h-7 w-auto" />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleClick(item.href)}
                className="rounded-md px-3 py-1.5 text-[13px] font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-os2-surface active:scale-[0.97]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1 rounded-md md:hidden hover:bg-os2-surface active:scale-[0.95]"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block h-0.5 w-4 rounded-full bg-foreground transition-transform duration-200",
              mobileOpen && "translate-y-[6px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-4 rounded-full bg-foreground transition-opacity duration-200",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-4 rounded-full bg-foreground transition-transform duration-200",
              mobileOpen && "-translate-y-[6px] -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-b bg-white/95 backdrop-blur-sm transition-[max-height] duration-300 md:hidden",
          mobileOpen ? "max-h-80 border-border" : "max-h-0 border-transparent"
        )}
      >
        <ul className="flex flex-col gap-0.5 px-6 pb-4 pt-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleClick(item.href)}
                className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-os2-surface"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
