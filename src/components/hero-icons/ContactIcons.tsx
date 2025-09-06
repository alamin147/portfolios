import { Download, Github, Linkedin } from "lucide-react";
import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank } from "react-icons/si";
import CustomBtn from "../custom-button";
import { socialLinks } from "../../data/contact-data";

const ContactIcons = () => {
  // Map social links to include their icons
  const socialLinksWithIcons = socialLinks.map((social) => {
    let icon;
    switch (social.name) {
      case "LinkedIn":
        icon = Linkedin;
        break;
      case "GitHub":
        icon = Github;
        break;
      case "LeetCode":
        icon = SiLeetcode;
        break;
      case "Codeforces":
        icon = SiCodeforces;
        break;
      case "CodeChef":
        icon = SiCodechef;
        break;
      case "Hackerrank":
        icon = SiHackerrank;
        break;
      default:
        icon = Github; // fallback
    }
    return { ...social, icon };
  });

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
              {socialLinksWithIcons.map((social, index) => (
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
