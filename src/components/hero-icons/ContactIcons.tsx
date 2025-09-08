import { Download, Github, Linkedin } from "lucide-react";
import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank } from "react-icons/si";
import CustomBtn from "../custom-button";
import { Button } from "@/components/ui/button";
import { socialLinks, contactInfo } from "../../data/contact-data";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ContactIcons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = (type: 'resume' | 'cv') => {
    const url = type === 'resume' ? contactInfo.resumeUrl : contactInfo.cvUrl;
    const fileName = type === 'resume' ? 'Alamin_Fullstack_Resume.pdf' : 'Alamin_CV.pdf';

    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setIsOpen(false);
  };
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
        icon = Github;
    }
    return { ...social, icon };
  });

  return (
      <div className="mt-3 md:mt-6 flex flex-col sm:flex-row flex-wrap items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <div className="flex justify-center sm:w-auto scale-90 sm:scale-100">
                    <CustomBtn
                      children={<Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />}
                      title="Download Resume/CV"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="glass-card hover:glass-card-hover border border-white/10 backdrop-blur-xl max-w-sm mx-auto [&>button]:text-white [&>button]:cursor-pointer [&>button]:hover:text-gray-300">
                  <DialogHeader>
                    <DialogTitle className="text-center text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                      Choose Download Option
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-3 pt-2">
                    <div onClick={() => handleDownload('resume')} className="cursor-pointer">
                      <Button
                        className="cursor-pointer flex items-center justify-center gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold
                                  bg-cyan-500/20 border border-white/10 backdrop-blur-xl
                                  shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300
                                  hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105 w-full"
                      >
                        <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                        Download Resume
                      </Button>
                    </div>
                    <div onClick={() => handleDownload('cv')} className="cursor-pointer">
                      <Button
                        className="cursor-pointer flex items-center justify-center gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold
                                  bg-cyan-500/20 border border-white/10 backdrop-blur-xl
                                  shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300
                                  hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105 w-full"
                      >
                        <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                        Download CV
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

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
