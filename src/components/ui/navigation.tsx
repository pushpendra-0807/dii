import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Gift, Camera, GamepadIcon, MessageSquare, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Heart },
  { name: "Memories", path: "/memories", icon: Camera },
  { name: "Games", path: "/games", icon: GamepadIcon },
  { name: "Wishes", path: "/wishes", icon: MessageSquare },
  { name: "Quiz", path: "/quiz", icon: Gift },
  { name: "Celebrate", path: "/celebrate", icon: PartyPopper },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300",
        "bg-card/90 backdrop-blur-lg rounded-full border shadow-lg",
        "px-6 py-3 hidden md:block"
      )}>
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                  "hover:bg-primary/10 hover:scale-105",
                  isActive && "bg-primary text-primary-foreground shadow-md"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className="absolute top-20 right-4 bg-card rounded-2xl p-6 shadow-xl min-w-[200px]">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                    "hover:bg-primary/10",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}