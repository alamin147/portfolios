// Central contact/social media data
export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/alamin27",
    color: "hover:bg-sky-600/20",
    iconColor: "group-hover:text-blue-500",
  },
  {
    name: "GitHub",
    href: "https://github.com/alamin147",
    color: "hover:bg-gray-700/20",
    iconColor: "group-hover:text-gray-400",
  },
  {
    name: "LeetCode",
    href: "https://leetcode.com/u/alamin14",
    color: "hover:bg-orange-600/20",
    iconColor: "group-hover:text-orange-500",
  },
  {
    name: "Codeforces",
    href: "https://codeforces.com/profile/alamin147",
    color: "hover:bg-blue-600/20",
    iconColor: "group-hover:text-blue-400",
  },
  {
    name: "CodeChef",
    href: "https://www.codechef.com/users/alamin14780",
    color: "hover:bg-amber-600/20",
    iconColor: "group-hover:text-amber-500",
  },
  {
    name: "Hackerrank",
    href: "https://www.hackerrank.com/profile/alamin_14780",
    color: "hover:bg-green-600/20",
    iconColor: "group-hover:text-green-500",
  },
];

export const contactInfo = {
  phone: "+8801322332323",
  email: "alamin.14780@gmail.com",
  address: "Dhaka, Bangladesh",
  linkedin: "https://www.linkedin.com/in/alamin27",
  github: "https://github.com/alamin147",
  resumeUrl: import.meta.env.VITE_RESUME_URL,
  cvUrl: import.meta.env.VITE_CV_URL || import.meta.env.VITE_RESUME_URL, // fallback to resume if CV not set
};
