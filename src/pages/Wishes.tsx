import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, MessageSquare, Send, Star, Users, Gift } from "lucide-react";

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  color: string;
}

const predefinedWishes: Wish[] = [
  {
    id: 1,
    name: "Your Little Brother",
    message: "Happy Birthday to the most amazing sister in the world! You've always been my role model and inspiration. Thank you for all the love, guidance, and for being my biggest supporter. I hope your special day is filled with all your favorite things! 🎉💕",
    timestamp: "July 13, 2025",
    color: "bg-birthday-pink"
  },
  {
    id: 2,
    name: "Mom & Dad",
    message: "Our dearest daughter, watching you grow into the wonderful woman you are today has been our greatest joy. Your kindness, strength, and beautiful spirit make us so proud every single day. Happy Birthday, sweetheart! 🌟👑",
    timestamp: "July 13, 2025",
    color: "bg-birthday-gold"
  },
  {
    id: 3,
    name: "Your Best Friend",
    message: "To my partner in crime and the sister I chose! Thank you for all the late-night talks, crazy adventures, and for always being there through thick and thin. Here's to another year of amazing memories together! 🎈✨",
    timestamp: "July 13, 2025",
    color: "bg-birthday-purple"
  },
  {
    id: 4,
    name: "Your Cousin",
    message: "Happy Birthday to my favorite cousin! You bring so much light and laughter into every family gathering. May this new year bring you endless happiness, success, and all the ice cream you can eat! 🍦🎂",
    timestamp: "July 13, 2025",
    color: "bg-birthday-rose"
  }
];

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(predefinedWishes);
  const [newWishName, setNewWishName] = useState("");
  const [newWishMessage, setNewWishMessage] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const addWish = () => {
    if (newWishName.trim() && newWishMessage.trim()) {
      const newWish: Wish = {
        id: Date.now(),
        name: newWishName,
        message: newWishMessage,
        timestamp: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        color: ["bg-primary", "bg-secondary", "bg-accent", "bg-birthday-pink", "bg-birthday-gold"][Math.floor(Math.random() * 5)]
      };
      
      setWishes(prev => [newWish, ...prev]);
      setNewWishName("");
      setNewWishMessage("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Birthday Wishes
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-birthday-purple bg-clip-text text-transparent mb-4">
            Messages of Love
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Beautiful birthday wishes from everyone who loves you. Each message is a reminder of how special you are! 💕
          </p>

          {/* Add Wish Button */}
          <Button 
            size="lg" 
            onClick={() => setShowAddForm(!showAddForm)}
            className="animate-glow"
          >
            <Heart className="w-5 h-5 mr-2" />
            Add Your Wish
          </Button>
        </div>

        {/* Add Wish Form */}
        {showAddForm && (
          <Card className="p-6 mb-8 max-w-2xl mx-auto animate-in slide-in-from-top duration-500">
            <h3 className="text-xl font-bold mb-4">Share Your Birthday Wish</h3>
            <div className="space-y-4">
              <Input
                placeholder="Your name"
                value={newWishName}
                onChange={(e) => setNewWishName(e.target.value)}
              />
              <Textarea
                placeholder="Write your birthday message here..."
                value={newWishMessage}
                onChange={(e) => setNewWishMessage(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button onClick={addWish} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Wish
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Wishes Grid */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {wishes.map((wish, index) => (
            <Card 
              key={wish.id}
              className="p-6 hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg animate-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className={`w-12 h-12 rounded-full ${wish.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {wish.name.charAt(0).toUpperCase()}
                </div>

                {/* Message Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground text-lg">{wish.name}</h3>
                    <span className="text-sm text-muted-foreground">{wish.timestamp}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {wish.message}
                  </p>

                  {/* Reaction */}
                  <div className="flex items-center gap-2 pt-2">
                    <Heart className="w-4 h-4 text-birthday-pink fill-birthday-pink" />
                    <span className="text-sm text-muted-foreground">With love</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Wishes Stats */}
        <Card className="p-8 mt-12 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-2xl font-bold text-foreground mb-6">Birthday Love</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Users className="w-8 h-8 text-primary mx-auto" />
              <div className="text-3xl font-bold text-primary">{wishes.length}</div>
              <div className="text-muted-foreground">People Who Love You</div>
            </div>
            <div className="space-y-2">
              <Heart className="w-8 h-8 text-birthday-pink mx-auto fill-current" />
              <div className="text-3xl font-bold text-birthday-pink">∞</div>
              <div className="text-muted-foreground">Love & Hugs</div>
            </div>
            <div className="space-y-2">
              <Star className="w-8 h-8 text-birthday-gold mx-auto fill-current" />
              <div className="text-3xl font-bold text-birthday-gold">100%</div>
              <div className="text-muted-foreground">Happiness</div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-birthday-pink/10 to-birthday-purple/10 rounded-xl">
            <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="text-xl font-bold text-foreground mb-2">Special Birthday Message</h4>
            <p className="text-muted-foreground leading-relaxed">
              "You are loved beyond measure, appreciated more than you know, and celebrated today and always. 
              Your presence in our lives is the greatest gift we could ever receive. Happy Birthday, dear sister!" 🎉💕
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}