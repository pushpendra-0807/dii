import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { GamepadIcon, Trophy, Star, Heart, Zap, Clock } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const games: Game[] = [
  {
    id: "memory-match",
    title: "Sister Memory Match",
    description: "Match the pairs and test your memory!",
    icon: "🧠",
    color: "bg-birthday-pink"
  },
  {
    id: "birthday-wishes",
    title: "Wish Generator",
    description: "Generate magical birthday wishes!",
    icon: "✨",
    color: "bg-birthday-gold"
  },
  {
    id: "balloon-pop",
    title: "Balloon Pop",
    description: "Pop the balloons to reveal surprises!",
    icon: "🎈",
    color: "bg-birthday-purple"
  },
  {
    id: "cake-decorator",
    title: "Cake Decorator",
    description: "Design the perfect birthday cake!",
    icon: "🎂",
    color: "bg-birthday-rose"
  }
];

const memoryCards = ["🎂", "🎁", "🎈", "🎉", "💕", "⭐", "🌟", "💖"];

export default function Games() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Memory Match Game State
  const [cards, setCards] = useState<Array<{id: number, symbol: string, flipped: boolean, matched: boolean}>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameComplete, setGameComplete] = useState(false);

  // Balloon Pop Game State
  const [balloons, setBalloons] = useState<Array<{id: number, popped: boolean, x: number, y: number, color: string}>>([]);

  // Wish Generator State
  const [currentWish, setCurrentWish] = useState("");

  const wishes = [
    "May your day be filled with happiness and laughter! 🌟",
    "Wishing you a year full of adventures and joy! 🎉", 
    "May all your dreams come true this year! ✨",
    "Hope your birthday is as amazing as you are! 💕",
    "Sending you love, hugs, and birthday magic! 🎁",
    "May this new year of life bring you endless happiness! 🌈",
    "You deserve all the wonderful things life has to offer! 🎂",
    "Another year of being absolutely incredible! 👑"
  ];

  // Initialize Memory Match Game
  const initMemoryGame = () => {
    const gameCards = [...memoryCards, ...memoryCards]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        flipped: false,
        matched: false
      }));
    setCards(gameCards);
    setFlippedCards([]);
    setGameComplete(false);
    setScore(0);
  };

  // Initialize Balloon Pop Game
  const initBalloonGame = () => {
    const gameballoons = Array.from({ length: 12 }, (_, index) => ({
      id: index,
      popped: false,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      color: ["bg-birthday-pink", "bg-birthday-gold", "bg-birthday-purple", "bg-primary", "bg-secondary"][Math.floor(Math.random() * 5)]
    }));
    setBalloons(gameballoons);
    setScore(0);
  };

  // Memory Match Game Logic
  const flipCard = (cardId: number) => {
    if (flippedCards.length === 2 || cards[cardId].flipped || cards[cardId].matched) return;

    const newCards = [...cards];
    newCards[cardId].flipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards[first].symbol === cards[second].symbol) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[first].matched = true;
          matchedCards[second].matched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setScore(prev => prev + 10);
          
          // Check if game is complete
          if (matchedCards.every(card => card.matched)) {
            setGameComplete(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Balloon Pop Logic
  const popBalloon = (balloonId: number) => {
    setBalloons(prev => prev.map(balloon => 
      balloon.id === balloonId ? { ...balloon, popped: true } : balloon
    ));
    setScore(prev => prev + 5);
    
    if (balloons.filter(b => !b.popped).length === 1) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  // Generate Random Wish
  const generateWish = () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setCurrentWish(randomWish);
  };

  useEffect(() => {
    if (currentGame === "memory-match") {
      initMemoryGame();
    } else if (currentGame === "balloon-pop") {
      initBalloonGame();
    }
  }, [currentGame]);

  if (currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 py-20">
        <Confetti active={showConfetti} />
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => setCurrentGame(null)}>
              ← Back to Games
            </Button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Trophy className="w-4 h-4 text-birthday-gold" />
                <span className="font-bold text-primary">{score} points</span>
              </div>
            </div>
          </div>

          {/* Memory Match Game */}
          {currentGame === "memory-match" && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Sister Memory Match</h2>
              {gameComplete && (
                <div className="mb-6 p-4 bg-primary/10 rounded-xl">
                  <h3 className="text-xl font-bold text-primary">🎉 Congratulations! 🎉</h3>
                  <p>You completed the game with {score} points!</p>
                </div>
              )}
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {cards.map((card) => (
                  <Card 
                    key={card.id}
                    className={`aspect-square flex items-center justify-center cursor-pointer text-2xl transition-all duration-300 ${
                      card.flipped || card.matched ? 'bg-primary/20' : 'bg-muted hover:bg-muted/80'
                    }`}
                    onClick={() => flipCard(card.id)}
                  >
                    {card.flipped || card.matched ? card.symbol : "?"}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Balloon Pop Game */}
          {currentGame === "balloon-pop" && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Balloon Pop Fiesta!</h2>
              <p className="mb-8 text-muted-foreground">Pop all the balloons to reveal birthday surprises!</p>
              <div className="relative h-96 bg-gradient-to-b from-blue-100 to-blue-50 rounded-xl overflow-hidden">
                {balloons.map((balloon) => (
                  <div
                    key={balloon.id}
                    className={`absolute w-12 h-16 rounded-full cursor-pointer transition-all duration-300 ${
                      balloon.popped ? 'opacity-0 scale-0' : 'hover:scale-110'
                    } ${balloon.color}`}
                    style={{
                      left: `${balloon.x}%`,
                      top: `${balloon.y}%`,
                    }}
                    onClick={() => popBalloon(balloon.id)}
                  >
                    {!balloon.popped && "🎈"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wish Generator */}
          {currentGame === "birthday-wishes" && (
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Magical Wish Generator</h2>
              <p className="mb-8 text-muted-foreground">Click the button to generate a special birthday wish!</p>
              
              <Card className="p-8 mb-8 min-h-[200px] flex items-center justify-center">
                {currentWish ? (
                  <p className="text-xl text-center leading-relaxed animate-in fade-in duration-1000">
                    {currentWish}
                  </p>
                ) : (
                  <p className="text-muted-foreground">Click the magic button to reveal your wish!</p>
                )}
              </Card>
              
              <Button size="lg" onClick={generateWish} className="animate-glow">
                <Star className="w-5 h-5 mr-2" />
                Generate Magic Wish ✨
              </Button>
            </div>
          )}

          {/* Cake Decorator */}
          {currentGame === "cake-decorator" && (
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Design Your Perfect Cake!</h2>
              <Card className="p-8">
                <div className="text-8xl mb-6">🎂</div>
                <p className="text-xl mb-6">Your beautiful birthday cake is ready!</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-birthday-pink/20 rounded-xl">🍓 Strawberries</div>
                  <div className="p-4 bg-birthday-gold/20 rounded-xl">✨ Sparkles</div>
                  <div className="p-4 bg-birthday-purple/20 rounded-xl">🎀 Ribbons</div>
                  <div className="p-4 bg-primary/20 rounded-xl">💕 Love</div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GamepadIcon className="w-4 h-4" />
            Birthday Games
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-birthday-purple bg-clip-text text-transparent mb-4">
            Fun & Games
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's make your birthday extra special with some fun interactive games! Choose your favorite and let the celebration begin! 🎮
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {games.map((game, index) => (
            <Card 
              key={game.id}
              className="p-8 hover:scale-105 transition-all duration-300 cursor-pointer group border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setCurrentGame(game.id)}
            >
              <div className="text-center space-y-4">
                <div className={`w-20 h-20 rounded-full ${game.color} flex items-center justify-center mx-auto text-3xl group-hover:scale-110 transition-transform duration-300`}>
                  {game.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {game.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {game.description}
                </p>
                
                <Button className="mt-4 group-hover:shadow-lg transition-all duration-300">
                  <Zap className="w-4 h-4 mr-2" />
                  Play Now!
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Game Stats */}
        <Card className="p-8 mt-12 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-2xl font-bold text-foreground mb-4">Gaming Challenge</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary">{games.length}</div>
              <div className="text-muted-foreground">Fun Games</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-birthday-pink">∞</div>
              <div className="text-muted-foreground">Hours of Fun</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-birthday-gold">100%</div>
              <div className="text-muted-foreground">Birthday Joy</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}