import { CheckCircle, Copy, Share2, Info, AlertCircle, Send } from "lucide-react";

interface CustomToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  icon?: React.ReactNode;
}

export const CustomToast = ({ type, message, icon }: CustomToastProps) => {
  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-400" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30';
      case 'error':
        return 'bg-red-500/20 border-red-500/30';
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30';
      default:
        return 'bg-green-500/20 border-green-500/30';
    }
  };

  return (
    <div className={`glass-card rounded-xl p-4 ${getBgColor()} backdrop-blur-xl border max-w-sm`}>
      <div className="flex items-center space-x-3">
        {getIcon()}
        <p className="text-white font-medium text-sm">
          {message}
        </p>
      </div>
    </div>
  );
};

export const ShareToast = () => (
  <CustomToast
    type="success"
    message="Link copied to clipboard!"
    icon={<Copy className="h-5 w-5 text-sky-400" />}
  />
);

export const ShareSuccessToast = () => (
  <CustomToast
    type="success"
    message="Link shared successfully!"
    icon={<Share2 className="h-5 w-5 text-sky-400" />}
  />
);

export const LikeToast = () => (
  <CustomToast
    type="success"
    message="Post liked! Thanks for your support!"
    icon={<CheckCircle className="h-5 w-5 text-pink-400" />}
  />
);

export const UnlikeToast = () => (
  <CustomToast
    type="info"
    message="Like removed"
    icon={<Info className="h-5 w-5 text-gray-400" />}
  />
);

export const ContactSuccessToast = () => (
  <CustomToast
    type="success"
    message="Message sent successfully! I'll get back to you soon."
    icon={<Send className="h-5 w-5 text-green-400" />}
  />
);

export const ContactErrorToast = () => (
  <CustomToast
    type="error"
    message="Failed to send message. Please try again or contact me directly."
    icon={<AlertCircle className="h-5 w-5 text-red-400" />}
  />
);

export const ContactSendingToast = () => (
  <CustomToast
    type="info"
    message="Sending your message..."
    icon={<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>}
  />
);
