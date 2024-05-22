import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
    icon: <FaFacebook />,
    iconAlt: "facebook",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/john_lifetraveler/",
    icon: <FaInstagram />,
    iconAlt: "instagram",
  },
  {
    platform: "github",
    url: "https://github.com/johnnoob",
    icon: <FaGithub />,
    iconAlt: "github",
  },
  {
    platform: "email",
    url: "s079053002006@gmail.com",
    icon: <MdEmail />,
    iconAlt: "email",
  },
];
