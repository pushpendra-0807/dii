import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  delay: number;
}

interface ConfettiProps {
  active?: boolean;
  count?: number;
  className?: string;
}

const colors = [
  "bg-birthday-pink",
  "bg-birthday-gold", 
  "bg-birthday-purple",
  "bg-primary",
  "bg-secondary",
  "bg-accent"
];

export function Confetti({ active = true, count = 50, className }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) return;

    const newPieces = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
    }));

    setPieces(newPieces);
  }, [active, count]);

  if (!active) return null;

  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden z-50", className)}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={cn(
            "absolute w-3 h-3 rounded-sm animate-confetti",
            piece.color
          )}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}