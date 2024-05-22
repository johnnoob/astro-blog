import { FaFacebook, FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa6";

type SocialLink = {
  platform: "facebook" | "instagram" | "github" | "email";
  url: string;
  icon: React.ReactNode;
  iconAlt: "facebook" | "instagram" | "github" | "email";
};

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    url: "https://www.facebook.com/profile.php?id=100003234932687",
    icon: <FaFacebook size={30} />,
    iconAlt: "facebook",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/john_lifetraveler/",
    icon: <FaInstagram size={30} />,
    iconAlt: "instagram",
  },
  {
    platform: "github",
    url: "https://github.com/johnnoob",
    icon: <FaGithub size={30} />,
    iconAlt: "github",
  },
  {
    platform: "email",
    url: "mailto:s079053002006@gmail.com",
    icon: <FaEnvelope size={30} />,
    iconAlt: "email",
  },
];
