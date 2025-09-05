import { Download, Github, Linkedin } from "lucide-react";
import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import CustomBtn from "../custom-button";

const ContactIcons = () => {
  return (
      <div className="mt-3 md:mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <a
                href={import.meta.env.VITE_RESUME_URL}
                target="_blank"
                download="Alamin_Fullstack_Resume.pdf"
                className="flex justify-center sm:w-auto scale-90 sm:scale-100"
              >
                <CustomBtn
                  children={<Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />}
                  title="Download Resume"
                />
              </a>

              <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start flex-wrap sm:flex-nowrap">
              {[
                {
                  name: "LinkedIn",
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/alamin27",
                  color: "hover:bg-sky-600/20",
                  iconColor: "group-hover:text-blue-500",
                },
                {
                  name: "GitHub",
                  icon: Github,
                  href: "https://github.com/alamin147",
                  color: "hover:bg-gray-700/20",
                  iconColor: "group-hover:text-gray-400",
                },
                {
                  name: "LeetCode",
                  icon: SiLeetcode,
                  href: "https://leetcode.com/u/alamin14",
                  color: "hover:bg-orange-600/20",
                  iconColor: "group-hover:text-orange-500",
                },
                {
                  name: "Codeforces",
                  icon: SiCodeforces,
                  href: "https://codeforces.com/profile/alamin147",
                  color: "hover:bg-blue-600/20",
                  iconColor: "group-hover:text-blue-400",
                },
                {
                  name: "CodeChef",
                  icon: SiCodechef,
                  href: "https://www.codechef.com/users/alamin14780",
                  color: "hover:bg-amber-600/20",
                  iconColor: "group-hover:text-amber-500",
                },
                // {
                //   name: "mail",
                //   icon: Mail,
                //   href: "/#contact",
                //   color: "hover:bg-emerald-600/20",
                //   iconColor: "group-hover:text-emerald-400",
                // },
              ].map((social, index) => (
                <a
                  href={social.href}
                  target={social.name == "mail" ? "" : "_blank"}
                  key={index}
                >
                  <div
                    className={`mt-2.5 md:mt-0 glass-card ${social.color} rounded-full p-2 sm:p-2 lg:p-3 hover:scale-110 transition-all duration-300 cursor-pointer group `}
                  >
                    <social.icon className={`h-5 w-5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-white ${social.iconColor} group-hover:scale-110 transition-all duration-300`} />
                  </div>
                </a>
              ))}
              </div>
            </div>
  )
}

export default ContactIcons
