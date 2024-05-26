import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

type SocialLink = {
  platform: "facebook" | "instagram" | "github" | "linkedIn" | "twitter";
  url: string;
  icon: React.ReactNode;
  iconAlt: "facebook" | "instagram" | "github" | "linkedIn" | "twitter";
};

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    url: "https://www.facebook.com/profile.php?id=100003234932687",
    icon: <FaFacebook size={25} />,
    iconAlt: "facebook",
  },
  {
    platform: "instagram",
    url: "https://www.instagram.com/john_lifetraveler/",
    icon: <FaInstagram size={25} />,
    iconAlt: "instagram",
  },
  {
    platform: "github",
    url: "https://github.com/johnnoob",
    icon: <FaGithub size={25} />,
    iconAlt: "github",
  },
  {
    platform: "twitter",
    url: "https://github.com/johnnoob",
    icon: <FaXTwitter size={25} />,
    iconAlt: "twitter",
  },
  {
    platform: "linkedIn",
    url: "https://github.com/johnnoob",
    icon: <FaLinkedin size={25} />,
    iconAlt: "linkedIn",
  },
];

type NavLink = {
  label: string;
  url: string;
};

export const navLinks: NavLink[] = [
  { label: "首頁", url: "/" },
  { label: "全部貼文", url: "/blog" },
  { label: "關於筆者", url: "/about" },
];
