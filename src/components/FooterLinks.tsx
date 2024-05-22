import React from "react";
import { socialLinks } from "@/constants/links";

const FooterLinks = () => {
  return (
    <ul>
      {socialLinks.map((link) => (
        <li key={link.url}>{link.icon}</li>
      ))}
    </ul>
  );
};

export default FooterLinks;
