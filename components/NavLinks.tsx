"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string };

type Props = {
  links: NavItem[];
  linkClass: string;
  activeClass: string;
  exact?: boolean;
};

export default function NavLinks({ links, linkClass, activeClass, exact = false }: Props) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const active =
          pathname === link.href ||
          (!exact && link.href !== "/" && pathname.startsWith(`${link.href}/`));
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${linkClass} ${active ? activeClass : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
