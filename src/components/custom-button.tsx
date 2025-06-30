import { Button } from "./ui/button";

const CustomBtn = ({ title,children }: { title:string,children?: any }) => {
  return (
    <Button
      className="cursor-pointer flex items-center justify-center gap-2 px-8 py-6 rounded-full text-white text-lg font-semibold
                bg-cyan-500/20 border border-white/10 backdrop-blur-xl
                    shadow-[0_4px_16px_rgba(8,145,178,0.25)] transition-all duration-300
                     hover:bg-cyan-500/30 hover:shadow-[0_10px_25px_rgba(8,145,178,0.4)] hover:scale-105"
    >
      {children}
      {title }
    </Button>
  );
};

export default CustomBtn;
