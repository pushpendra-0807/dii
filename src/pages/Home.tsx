import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Confetti } from "@/components/ui/confetti";
import { Heart, Gift, Sparkles, Calendar, Camera } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti on page load
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 relative overflow-hidden">
      <Confetti active={showConfetti} count={100} />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-20 left-20 text-birthday-pink animate-float w-8 h-8 opacity-60" />
        <Gift className="absolute top-40 right-32 text-birthday-gold animate-bounce-gentle w-10 h-10 opacity-70" />
        <Sparkles className="absolute bottom-32 left-16 text-birthday-purple animate-sparkle w-6 h-6 opacity-80" />
        <Heart className="absolute bottom-20 right-20 text-birthday-rose animate-float w-7 h-7 opacity-50" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero */}
          <div className="mb-12 animate-in fade-in duration-1000">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              July 13th, 2025
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-birthday-purple to-birthday-gold bg-clip-text text-transparent mb-6 animate-glow">
              Happy Birthday
            </h1>
            
            <p className="text-3xl md:text-4xl font-semibold text-foreground/80 mb-4">
              Dear Sister! 🎉
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Today is all about celebrating the amazing, wonderful, and absolutely incredible person you are. 
              Let's make this birthday unforgettable with love, laughter, and magical moments! ✨
            </p>
          </div>

          {/* Birthday Message Card */}
          <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-card via-birthday-cream/50 to-card shadow-magical border-0 animate-in slide-in-from-bottom duration-1000 delay-300">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  A Special Message Just For You 💕
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Another year of being absolutely amazing! You bring so much joy, love, and laughter into everyone's life. 
                  Your kindness, wisdom, and beautiful spirit make the world a brighter place. 
                  I'm so grateful to have you as my sister and best friend.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Heart className="w-8 h-8 text-birthday-pink mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Love</h3>
                  <p className="text-sm text-muted-foreground">Endless and unconditional</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Sparkles className="w-8 h-8 text-birthday-gold mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Magic</h3>
                  <p className="text-sm text-muted-foreground">You make everything special</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-xl">
                  <Gift className="w-8 h-8 text-birthday-purple mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Joy</h3>
                  <p className="text-sm text-muted-foreground">Your smile lights up our world</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom duration-1000 delay-500">
            <Link to="/memories">
              <Button size="lg" className="group relative overflow-hidden">
                <Camera className="w-5 h-5 mr-2" />
                Explore Memories
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </Link>
            
            <Link to="/games">
              <Button variant="outline" size="lg" className="group">
                <Gift className="w-5 h-5 mr-2" />
                Play Games
              </Button>
            </Link>
            
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={handleCelebrate}
              className="group"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Celebrate! 🎉
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}