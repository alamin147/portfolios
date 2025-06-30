import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "@/components/css/contact.css";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SectionTitle from "./section-title";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

type TInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [formData, setFormData] = useState<TInputs>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<TInputs>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Fix: Create a new instance of the scroll animation hook
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contactFormRef, isVisible: contactVisible } = useScrollAnimation();
  const { ref: contactsRef, isVisible: contactsVisible } = useScrollAnimation();


  const validateForm = (): boolean => {
    const newErrors: Partial<TInputs> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof TInputs]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-4/5 relative z-10">
        <div
          ref={headerRef as any}
          className={`text-center mb-20 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <SectionTitle
            title="Contact Me"
            desc="Have a question or want to work together? Feel free to reach out. I'm ready to bring your ideas to life."
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div
          ref={contactFormRef as any}
          className={`lg:col-span-3 mb-20 transition-all duration-1000 ${
              contactVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/*  */}
            <div className="glass-card hover:glass-card-hover rounded-3xl p-8 sm:p-10 transition-all duration-500 relative overflow-hidden glow-animation">

              <div className="relative z-10">
                <h3 className="text-center text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  Get In Touch
                </h3>
                <p className="mb-8 text-center text-gray-300">
                  Have a project in mind? Let's collaborate and build something
                  amazing together.
                </p>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-lg glass-card border border-green-500/30 bg-green-500/10">
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>
                        Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-lg glass-card border border-red-500/30 bg-red-500/10">
                    <div className="flex items-center text-red-400">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>Email could not be sent. Please try again.</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        className="glass-input text-white placeholder:text-gray-400 focus:glass-input transition-all duration-300 py-6"
                      />
                      {errors.name && (
                        <p className="text-red-400 mt-1 text-sm font-medium">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your Email"
                        className="glass-input text-white placeholder:text-gray-400 focus:glass-input transition-all duration-300 py-6"
                      />
                      {errors.email && (
                        <p className="text-red-400 mt-1 text-sm font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject"
                      className="glass-input text-white placeholder:text-gray-400 focus:glass-input transition-all duration-300 py-6"
                    />
                    {errors.subject && (
                      <p className="text-red-400 mt-1 text-sm font-medium">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={8}
                      placeholder="Your Message"
                      className="glass-input text-white placeholder:text-gray-400 focus:glass-input resize-none transition-all duration-300"
                    />
                    {errors.message && (
                      <p className="text-red-400 mt-1 text-sm font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      className="cursor-pointer flex items-center justify-center gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold
                bg-cyan-500/20 border border-white/10 backdrop-blur-xl
                    shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300
                     hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>

            </div>
          </div>

          {/* Contact Information */}
          <div
          ref={contactsRef as any}
            className={`lg:col-span-2 flex flex-col  space-y-8 transition-all duration-1000 ${contactsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center lg:text-left mb-4">
              <div className="glass-card hover:glass-card-hover rounded-2xl p-6 transition-all duration-500">
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                  Contact Information
                </h3>
                <p className="text-gray-300">
                  Feel free to reach out through any of these channels. I'm
                  looking forward to hearing from you!
                </p>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <ContactInfo
                icon={<MapPin className="h-6 w-6" />}
                title="Address"
                description="Dhaka, Bangladesh"
                color="from-sky-500 to-sky-600"
                />
              <ContactInfo
                icon={<Phone className="h-6 w-6" />}
                title="Phone Number"
                description="+8801322332323"
                color="from-sky-500 to-sky-600"
                // color="from-emerald-500 to-emerald-600"
                />
              <ContactInfo
                icon={<Mail className="h-6 w-6" />}
                title="Email Address"
                description="alamin.14780@gmail.com"
                color="from-sky-500 to-sky-600"
                // color="from-sky-500 to-emerald-500"
              />
            </div>

            {/* Social Media Links */}
            <div className="glass-card hover:glass-card-hover rounded-2xl p-6 transition-all duration-500">
              <h4 className="text-xl font-semibold mb-4 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Connect with me
              </h4>
              <div className="flex space-x-4 justify-center lg:justify-start">
                <a
                  href="https://www.linkedin.com/in/alamin-developer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card hover:glass-card-hover hover:scale-110 transition-all duration-300 group"
                >
                  <FaLinkedin className="w-5 h-5 text-sky-400 group-hover:text-white" />
                </a>
                <a
                  href="https://github.com/alamin147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card hover:glass-card-hover hover:scale-110 transition-all duration-300 group"
                >
                  <FaGithub className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Information Component
const ContactInfo = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => (
  <div className="bg-gray-700/40  border border-white/10 backdrop-blur-xl
                    transition-all duration-300
                    hover:g-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105
                    rounded-2xl p-5 group">
    <div className="flex items-center">
      <div
        className={`flex-shrink-0 p-3 rounded-xl ${typeof color === 'string' && color.includes('from-') ? `bg-gradient-to-r ${color}` : ''} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        {icon}
      </div>
      <div className="ml-5">
        <h4 className="mb-1 text-lg font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-base text-gray-300">{description}</p>
      </div>
    </div>
  </div>
);
