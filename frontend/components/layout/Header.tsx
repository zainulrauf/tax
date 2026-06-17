"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Home, Package, Scale, Settings, Wand2 } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Products",
      href: "/products",
      icon: Package,
    },
    {
      label: "Compare",
      href: "/compare",
      icon: Scale,
    },
    {
      label: "Recommend",
      href: "/recommend",
      icon: Wand2,
    },
    {
      label: "Assistant",
      href: "/assistant",
      icon: Bot,
    },
    {
      label: "Admin",
      href: "/admin/products",
      icon: Settings,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container mx-auto px-6">

        <div className="flex h-16 items-center justify-between">

          <Link
            href="/"
            className="text-xl font-bold"
          >
            TaxGuide AI
          </Link>

          <nav className="hidden md:flex items-center gap-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition
                  ${
                    active
                      ? "bg-black text-white"
                      : "hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}

          </nav>

          <Link
            href="/recommend"
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Get Recommendation
          </Link>

        </div>

      </div>
    </header>
  );
}