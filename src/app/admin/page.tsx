import Link from "next/link";

const ADMIN_LINKS = [
  {
    label: "Debug",
    href: "debug",
  },
  {
    label: "Upload Audio",
    href: "upload-audio",
  },
  {
    label: "Upload Images",
    href: "upload-images",
  },
];

function Admin() {
  return (
    <>
      <h1>Hello, Admin!</h1>
      <div className="flex flex-col gap-6">
        {ADMIN_LINKS.map((link) => {
          return (
            <Link key={link.label} href={`/admin/${link.href}`}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Admin;
