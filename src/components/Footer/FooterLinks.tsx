import { socialLinks } from "@/constants/links";

const FooterLinks = () => {
  return (
    <ul className="flex space-x-7 mx-auto w-fit">
      {socialLinks.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            className="flex items-center space-x-2 hover:text-primary"
          >
            {link.icon}
            <span className="max-sm:hidden">{link.platform.toUpperCase()}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
