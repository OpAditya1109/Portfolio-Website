import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";

const footerLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-yadav-1109mb/", // Replace with your LinkedIn profile URL
  },
  {
    title: "GitHub",
    href: "https://github.com/OpAditya1109", // Replace with your GitHub profile URL
  },
];

export const Footer = () => {
  return (
    <footer className="relative z-10 overflow-x-clip">
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-white/40">&copy; 2025. Aditya Yadav All Rights Reserved.</div>
          <div>
            <nav className="flex flex-col items-center gap-8 md:flex-row">
              {footerLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-emerald-400 transition"
                >
                  <span className="font-semibold">{link.title}</span>
                  {/* Temporary placeholder for icon to avoid breaking layout */}
                  <ArrowUpRightIcon className="size-4"></ArrowUpRightIcon>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
