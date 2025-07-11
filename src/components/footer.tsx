import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";

const ADMIN_LINKS = [
  {
    label: "Admin",
    href: "/admin",
  },
];

function Footer() {
  return (
    <footer className="w-full bg-purple-100 mt-16">
      <div className="w-full md:max-w-5xl mx-auto flex flex-col justify-center items-center p-6 text-center">
        <p>
          Made with 💖 by
          {" "}
          <a
            href="https://github.com/geraldiner"
            rel="noopener noreferrer"
            target="_blank"
          >
            Geraldine Ragsac
          </a>
        </p>
        <nav className="flex justify-center items-center gap-6">
          <SignedIn>
            <ul>
              {ADMIN_LINKS.map((link) => {
                return (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                );
              })}
            </ul>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" oauthFlow="popup">
              Admin Sign In
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
