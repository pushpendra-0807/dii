import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Camera, Star, Calendar, MapPin } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  color: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "Looking at the camera",
    date: "time pass click",
    location: "",
    description: "",
    image: "/IMG-20250712-WA0003.jpg",
    color: "bg-birthday-pink"
  },
  {
    id: 2,
    title: "",
    date: "",
    location: "",
    description: "",
    image: "/IMG-20250712-WA0004.jpg",
    color: "bg-birthday-gold"
  },
  {
    id: 3,
    title: "",
    date: "",
    location: "",
    description: "",
    image: "/IMG-20250712-WA0005.jpg",
    color: "bg-birthday-purple"
  },
  {
    id: 4,
    title: "",
    date: "",
    location: "",
    description: "",
    image: "/IMG-20250712-WA0006.jpg",
    color: "bg-birthday-pink"
  },
  {
    id: 5,
    title: "",
    date: "",
    location: "",
    description: "",
    image: "/IMG-20250712-WA0007.jpg",
    color: "bg-birthday-purple"
  },
  {
    id: 6,
    title: "",
    date: "",
    location: "",
    description: "",
    image: "/WhatsApp Image 2025-07-12 at 21.05.27_a84a1817.jpg",
    color: "bg-birthday-gold"
  }
];

export default function Memories() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [favoriteMemories, setFavoriteMemories] = useState<number[]>([]);

  const toggleFavorite = (memoryId: number) => {
    setFavoriteMemories(prev => 
      prev.includes(memoryId) 
        ? prev.filter(id => id !== memoryId)
        : [...prev, memoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Camera className="w-4 h-4" />
            Memory Lane
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-birthday-purple bg-clip-text text-transparent mb-4">
            Our Beautiful Memories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of all the wonderful moments we've shared together. Each memory is a treasure that makes our bond even stronger! 💕
          </p>
        </div>

        {/* Memories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {memories.map((memory, index) => (
            <Card 
              key={memory.id}
              className="p-6 hover:scale-105 transition-all duration-300 cursor-pointer group border-0 shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedMemory(memory)}
            >
              <div className="text-center space-y-4">
                {/* Memory Image Only, Larger */}
                <div className={`w-60 h-60 rounded-2xl ${memory.color} flex items-center justify-center mx-auto overflow-hidden`}>
                  <img 
                    src={memory.image} 
                    alt="Memory" 
                    className="object-cover w-full h-full" 
                  />
                </div>
                {/* Favorite Button Only */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(memory.id);
                  }}
                  className="mt-4"
                >
                  <Heart 
                    className={`w-4 h-4 mr-1 ${
                      favoriteMemories.includes(memory.id) 
                        ? 'text-birthday-pink fill-birthday-pink' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                  {favoriteMemories.includes(memory.id) ? 'Loved' : 'Love This'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Memory Detail Modal */}
        {selectedMemory && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4"
                onClick={() => setSelectedMemory(null)}
              >
                ✕
              </Button>
              <div className="text-center space-y-6">
                {/* Large Image Only */}
                <div className={`w-96 h-96 rounded-2xl ${selectedMemory.color} flex items-center justify-center mx-auto overflow-hidden`}>
                  <img
                    src={selectedMemory.image}
                    alt="Memory"
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Favorite Button Only */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(selectedMemory.id)}
                  className="mt-4"
                >
                  <Heart 
                    className={`w-4 h-4 mr-1 ${
                      favoriteMemories.includes(selectedMemory.id) 
                        ? 'text-birthday-pink fill-birthday-pink' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                  {favoriteMemories.includes(selectedMemory.id) ? 'Loved' : 'Love This'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Memory Stats */}
        <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <h3 className="text-2xl font-bold text-foreground mb-4">Memory Collection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary">{memories.length}</div>
              <div className="text-muted-foreground">Total Memories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-birthday-pink">{favoriteMemories.length}</div>
              <div className="text-muted-foreground">Favorite Moments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-birthday-gold">∞</div>
              <div className="text-muted-foreground">More to Come</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}