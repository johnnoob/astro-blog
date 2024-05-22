import React from "react";
import { socialLinks } from "@/constants/links";

const FooterLinks = () => {
  return (
    <ul className="flex space-x-7">
      {socialLinks.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            className="flex items-center space-x-2"
          >
            {link.icon}
            <span>{link.platform.toUpperCase()}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default FooterLinks;
