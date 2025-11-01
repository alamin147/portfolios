import { useState } from "react";
import { X, Terminal, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { ContactSuccessToast, ContactErrorToast, ContactSendingToast } from "@/components/shared";

type TInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

interface LinuxContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const url = import.meta.env.VITE_URL;

export default function LinuxContactModal({ isOpen, onClose }: LinuxContactModalProps) {
  const [terminalOutput, setTerminalOutput] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TInputs>();

  const onSubmit = async (data: TInputs) => {
    // Show terminal-style processing
    setTerminalOutput("root@alamin:~# ./send_message.sh\nInitializing secure communication...\nEncrypting message...\nSending to server...\n");

    // Show sending toast
    const sendingToastId = toast(<ContactSendingToast />, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      className: "custom-toast contact-sending-toast",
    });

    try {
      const response = await axios.post(url, data);

      // Dismiss the sending toast
      toast.dismiss(sendingToastId);

      setTerminalOutput(prev => prev + "Message sent successfully!\nConnection terminated.\n");

      reset();

      if (response.data.success == true) {
        toast(<ContactSuccessToast />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast contact-success-toast",
        });

        setTimeout(() => {
          onClose();
          setTerminalOutput("");
        }, 2000);
      } else {
        setTerminalOutput(prev => prev + "Error: Message transmission failed!\n");
        toast(<ContactErrorToast />, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "custom-toast contact-error-toast",
        });
      }
    } catch (error) {
      // Dismiss the sending toast
      toast.dismiss(sendingToastId);

      setTerminalOutput(prev => prev + "Error: Connection failed!\n");
      toast(<ContactErrorToast />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast contact-error-toast",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border border-green-400 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-green-400/30">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-mono text-sm">root@alamin:~# ./contact.sh</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-6 bg-black text-green-400 font-mono max-h-[80vh] overflow-y-auto">
          <div className="mb-6">
            <p className="text-green-300 mb-2">root@alamin:~# ./contact.sh --secure</p>
            <p className="text-gray-400 text-sm mb-4">Initializing secure communication channel...</p>

          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-green-400 text-sm mb-2">
                <span className="text-red-400">$</span> Enter your name:
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full bg-gray-900 border border-gray-700 text-green-400 rounded px-3 py-2 focus:border-green-400 focus:outline-none font-mono"
                placeholder="John Doe"
                type="text"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">Error: {errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-green-400 text-sm mb-2">
                <span className="text-red-400">$</span> Enter your email address:
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full bg-gray-900 border border-gray-700 text-green-400 rounded px-3 py-2 focus:border-green-400 focus:outline-none font-mono"
                placeholder="john@example.com"
                type="email"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">Error: {errors.email.message}</p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-green-400 text-sm mb-2">
                <span className="text-red-400">$</span> Enter message subject:
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className="w-full bg-gray-900 border border-gray-700 text-green-400 rounded px-3 py-2 focus:border-green-400 focus:outline-none font-mono"
                placeholder="Security Consultation Request"
                type="text"
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">Error: {errors.subject.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-green-400 text-sm mb-2">
                <span className="text-red-400">$</span> Enter your message:
              </label>
              <textarea
                {...register("message", { required: "Message is required" })}
                className="w-full bg-gray-900 border border-gray-700 text-green-400 rounded px-3 py-2 focus:border-green-400 focus:outline-none font-mono h-32 resize-none"
                placeholder="I need help with Linux system administration..."
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">Error: {errors.message.message}</p>
              )}
            </div>

            {/* Terminal Output */}
            {terminalOutput && (
              <div className="bg-gray-900 border border-gray-700 rounded p-4 mb-4">
                <pre className="text-green-400 text-xs whitespace-pre-wrap">
                  {terminalOutput}
                  <span className="animate-pulse">█</span>
                </pre>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-gray-900 border border-green-400 text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-mono"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Sending..." : "./send_message.sh"}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center space-x-2 bg-gray-900 border border-red-400 text-red-400 px-4 py-2 rounded hover:bg-red-400 hover:text-black transition-all duration-300 font-mono"
              >
                <X className="h-4 w-4" />
                <span>./exit.sh</span>
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-xs">
              root@alamin:~# echo "Secure communication established"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
