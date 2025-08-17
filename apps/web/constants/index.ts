import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://linkedin.com/company/techcorp",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://twitter.com/techcorp",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/techcorp",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Services",
    data: [
      {
        name: "Web Development",
        icon: null,
        link: "#services",
      },
      {
        name: "Mobile Development",
        icon: null,
        link: "#services",
      },
      {
        name: "Cloud Solutions",
        icon: null,
        link: "#services",
      },
      {
        name: "UI/UX Design",
        icon: null,
        link: "#services",
      },
    ],
  },
  {
    title: "Company",
    data: [
      {
        name: "About Us",
        icon: null,
        link: "#about",
      },
      {
        name: "Our Team",
        icon: null,
        link: "#team",
      },
      {
        name: "Projects",
        icon: null,
        link: "#projects",
      },
      {
        name: "Contact",
        icon: null,
        link: "#contact",
      },
    ],
  },
  {
    title: "Connect",
    data: [
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com/company/techcorp",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://twitter.com/techcorp",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/techcorp",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About",
    link: "#about",
  },
  {
    title: "Services",
    link: "#services",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Team",
    link: "#team",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const LINKS = {
  bookCall: "/book-call",
  admin: "/admin",
};