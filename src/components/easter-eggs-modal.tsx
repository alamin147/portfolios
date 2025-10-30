import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Gamepad2, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';

interface EasterEggsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EasterEggsModal: React.FC<EasterEggsModalProps> = ({ open, onOpenChange }) => {
  const easterEggs = [

    {
      title: "Secret Game",
      description: "Use the secret key combination to unlock a hidden game!",
      hint: (
        <div className="flex items-center gap-2 text-sky-400">
          <ArrowUp className="w-4 h-4" />
          <ArrowUp className="w-4 h-4" />
          <ArrowDown className="w-4 h-4" />
          <ArrowDown className="w-4 h-4" />
          <ArrowLeft className="w-4 h-4" />
        </div>
      ),
      icon: <Gamepad2 className="w-5 h-5 text-sky-400" />,
    },
    {
      title: "404 Game",
      description: "Visit any unknown URL to discover a fun star-catching game!",
      hint: (
        <div className="flex items-center gap-2">
          <span>Try visiting: </span>
          <a
            href="/cool-game"
            className="group transition-all duration-300"
          >
            <code className="px-2 py-0.5 bg-sky-950/50 rounded border border-sky-500/30 text-sky-400 cursor-pointer hover:bg-sky-950/70 hover:border-sky-400/50 transition-all duration-300">
              /cool-game
            </code>
            <span className="ml-2 text-sky-400/70 group-hover:text-sky-400">→</span>
          </a>
        </div>
      ),
      icon: <Gamepad2 className="w-5 h-5 text-sky-400" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-sky-500/30">
        <DialogHeader className="border-b border-sky-500/20 pb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            🎮 Easter Eggs Collection
          </DialogTitle>
          <DialogDescription className="text-white/80">
            Discover hidden features and fun games throughout the portfolio!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {easterEggs.map((egg, index) => (
            <Card key={index} className="p-4 bg-background/80 backdrop-blur-lg border border-sky-500/30 hover:border-sky-500/50 transition-colors duration-300">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-sky-950/80 border border-sky-500/30">
                  {egg.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{egg.title}</h3>
                  <p className="text-sm text-white/90 mb-2">{egg.description}</p>
                  <div className="flex items-center gap-2 text-sm text-sky-400">
                    <span className="text-white/80">How to activate:</span>
                    {egg.hint}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EasterEggsModal;
