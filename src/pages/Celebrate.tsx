import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { PartyPopper, Heart, Star, Gift, Sparkles, Music, Cake, Crown } from "lucide-react";

function CakeCuttingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const applauseRef = useRef<HTMLAudioElement>(null);
  const [cut, setCut] = useState(false);

  useEffect(() => {
    if (open) {
      setCut(false);
      setTimeout(() => setCut(true), 800); // Start cut animation after modal appears
      applauseRef.current?.play();
    } else {
      applauseRef.current?.pause();
      if (applauseRef.current) applauseRef.current.currentTime = 0;
      setCut(false);
    }
  }, [open]);

  if (!open) return null;

  // Simple SVG cake and knife animation
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-in fade-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-muted-foreground hover:text-primary"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-4 text-center">Cake Cutting Ceremony 🎂</h2>
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Cake SVG */}
          <svg width="220" height="220" viewBox="0 0 220 220" className="absolute left-0 top-0">
            {/* Cake base */}
            <ellipse cx="110" cy="170" rx="80" ry="30" fill="#f9c6d1" />
            {/* Cake body */}
            <rect x="30" y="70" width="160" height="100" rx="40" fill="#fff0f6" stroke="#f9c6d1" strokeWidth="4" />
            {/* Cake top */}
            <ellipse cx="110" cy="70" rx="80" ry="40" fill="#f9c6d1" />
            {/* Cake split (animated) */}
            {cut && (
              <g>
                <rect x="108" y="60" width="4" height="120" fill="#e57373" />
                {/* Slice animation: move right half */}
                <g style={{ transform: 'translateX(20px)', transition: 'transform 1s cubic-bezier(.4,2,.6,1)' }}>
                  <path d="M110,70 Q190,70 190,170 Q190,200 110,200" fill="#fff0f6" stroke="#f9c6d1" strokeWidth="4" />
                </g>
              </g>
            )}
          </svg>
          {/* Knife SVG (animated) */}
          <svg
            width="80" height="80" viewBox="0 0 80 80"
            className="absolute left-1/2 top-10"
            style={{
              transform: cut
                ? 'translate(-50%, 60px) rotate(-30deg)'
                : 'translate(-50%, 0) rotate(0deg)',
              transition: 'transform 0.8s cubic-bezier(.4,2,.6,1)',
              zIndex: 10,
            }}
          >
            <rect x="35" y="10" width="10" height="40" rx="5" fill="#b0b0b0" />
            <polygon points="30,10 50,10 40,0" fill="#e0e0e0" />
          </svg>
        </div>
        <div className="mt-6 text-xl text-birthday-pink font-semibold animate-bounce">Yay! The cake is cut! 🎉</div>
        <audio ref={applauseRef} src="/applause.mp3" preload="auto" />
      </div>
    </div>
  );
}

export default function Celebrate() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [birthdaySong, setBirthdaySong] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [cakeModalOpen, setCakeModalOpen] = useState(false);

  useEffect(() => {
    // Auto-start celebration
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (birthdaySong && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.error('Audio play error:', e);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [birthdaySong]);

  // Stop song if user leaves page/component unmounts
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    };
  }, []);

  const triggerFireworks = () => {
    setFireworksActive(true);
    setShowConfetti(true);
    setTimeout(() => {
      setFireworksActive(false);
      setShowConfetti(false);
    }, 5000);
  };

  const toggleBirthdaySong = () => {
    setBirthdaySong((prev) => !prev);
  };

  // Add this style for the animated music note
  const noteStyle = {
    display: 'inline-block',
    animation: 'floatNote 1s infinite ease-in-out',
  };

  // Add this keyframes style in a <style> tag in the component (React inline style for demo)
  const noteKeyframes = `
@keyframes floatNote {
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-pink/20 via-birthday-gold/20 to-birthday-purple/20 relative overflow-hidden">
      <Confetti active={showConfetti} count={200} />
      
      {/* Floating celebration elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce-gentle">🎈</div>
        <div className="absolute top-20 right-20 animate-float text-4xl">🎉</div>
        <div className="absolute bottom-20 left-20 animate-sparkle text-3xl">✨</div>
        <div className="absolute bottom-10 right-10 animate-bounce-gentle text-4xl">🎂</div>
        <div className="absolute top-1/2 left-10 animate-float text-3xl">🎁</div>
        <div className="absolute top-1/3 right-10 animate-sparkle text-3xl">🌟</div>
        <div className="absolute bottom-1/3 left-1/4 animate-bounce-gentle text-2xl">💕</div>
        <div className="absolute top-3/4 right-1/4 animate-float text-2xl">🎊</div>
      </div>

      <CakeCuttingModal open={cakeModalOpen} onClose={() => setCakeModalOpen(false)} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Celebration */}
          <div className="mb-12">
            <Crown className="w-16 h-16 text-birthday-gold mx-auto mb-6 animate-glow" />
            
            <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-birthday-pink via-birthday-gold to-birthday-purple bg-clip-text text-transparent mb-6 animate-pulse">
              🎉 CELEBRATION TIME! 🎉
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-foreground mb-4 animate-bounce-gentle">
              Today We Celebrate YOU!
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This is your moment to shine! You deserve all the love, joy, and celebration in the world. 
              Dance, smile, laugh, and enjoy every second of your special day! ✨
            </p>
          </div>

          {/* Interactive Celebration */}
          <Card className="p-8 md:p-12 mb-12 bg-gradient-to-br from-card via-birthday-cream/30 to-card shadow-magical border-0">
            <h2 className="text-3xl font-bold mb-8 text-foreground">
              🎊 Let's Make Some Noise! 🎊
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Button
                size="lg"
                onClick={triggerFireworks}
                className="h-20 flex-col space-y-2 bg-gradient-to-r from-birthday-pink to-birthday-rose hover:scale-105 transition-all duration-300"
              >
                <PartyPopper className="w-6 h-6" />
                <span>Fireworks! 🎆</span>
              </Button>
              
              <Button
                size="lg"
                onClick={toggleBirthdaySong}
                variant={birthdaySong ? "secondary" : "outline"}
                className="h-20 flex-col space-y-2 hover:scale-105 transition-all duration-300"
              >
                <Music className="w-6 h-6" />
                <span>{birthdaySong ? "🎵 Playing!" : "Birthday Song"}</span>
                {birthdaySong && (
                  <span style={noteStyle} className="ml-2 text-xl">🎶</span>
                )}
              </Button>
              {/* Always render audio element, but hidden */}
              <audio ref={audioRef} src="/happy-birthday-254480.mp3" preload="auto" style={{ display: 'none' }} />
              {/* Animated music note below button when playing */}
              {birthdaySong && (
                <div className="flex justify-center mt-2">
                  <span style={noteStyle} className="text-3xl">🎶</span>
                </div>
              )}
              {/* Inject keyframes for animation */}
              <style>{noteKeyframes}</style>
              
              <Button
                size="lg"
                onClick={() => setShowConfetti(!showConfetti)}
                className="h-20 flex-col space-y-2 bg-gradient-to-r from-birthday-gold to-secondary hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-6 h-6" />
                <span>Confetti Rain! 🎊</span>
              </Button>
              
              <Button
                size="lg"
                onClick={() => setCakeModalOpen(true)}
                className="h-20 flex-col space-y-2 bg-gradient-to-r from-birthday-purple to-accent hover:scale-105 transition-all duration-300"
              >
                <Cake className="w-6 h-6" />
                <span>Cut The Cake! 🎂</span>
              </Button>
            </div>

            {birthdaySong && (
              <div className="mb-8 p-6 bg-primary/10 rounded-xl animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-4">🎵 Happy Birthday Song! 🎵</h3>
                <div className="text-lg leading-relaxed space-y-2">
                  <p>Enjoy the music!</p>
                </div>
              </div>
            )}
          </Card>

          {/* Birthday Wishes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-birthday-pink/20 to-birthday-rose/20 border-0 shadow-lg hover:scale-105 transition-all duration-300">
              <Heart className="w-12 h-12 text-birthday-pink mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-2">With All Our Love</h3>
              <p className="text-muted-foreground">You are cherished beyond words and loved beyond measure!</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-birthday-gold/20 to-secondary/20 border-0 shadow-lg hover:scale-105 transition-all duration-300">
              <Star className="w-12 h-12 text-birthday-gold mx-auto mb-4 animate-sparkle" />
              <h3 className="text-xl font-bold mb-2">Shine Bright</h3>
              <p className="text-muted-foreground">May your light continue to brighten everyone's world!</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-birthday-purple/20 to-accent/20 border-0 shadow-lg hover:scale-105 transition-all duration-300">
              <Gift className="w-12 h-12 text-birthday-purple mx-auto mb-4 animate-bounce-gentle" />
              <h3 className="text-xl font-bold mb-2">Your Special Day</h3>
              <p className="text-muted-foreground">Today is all about celebrating the wonderful you!</p>
            </Card>
          </div>

          {/* Final Birthday Message */}
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 via-birthday-gold/10 to-accent/10 border-0 shadow-magical">
            <div className="space-y-6">
              <div className="text-6xl mb-6">🎂🎉🎈</div>
              
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-birthday-purple bg-clip-text text-transparent">
                Happy Birthday, Beautiful Sister!
              </h3>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                As this special day comes to a close, remember that you are loved every single day of the year. 
                Your kindness, your smile, and your beautiful heart make the world a better place. 
                Here's to another year of amazing adventures, wonderful memories, and endless happiness!
              </p>
              
              <div className="text-2xl font-bold text-primary">
                May All Your Dreams Come True! ✨💕🌟
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-4xl">
                🎂 🎉 🎈 🎁 💕 ✨ 🌟 🎊 🎆 👑
              </div>
            </div>
          </Card>

          {/* Thank You Message */}
          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground italic">
              "Thank you for being the most amazing sister anyone could ask for. This website was made with all our love, just for you!" 💝
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}