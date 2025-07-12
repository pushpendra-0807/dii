import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { Gift, Brain, Trophy, Star, Check, X } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What's sister's favorite color?",
    options: ["Pink", "Purple", "Blue", "Green"],
    correct: 1,
    explanation: "Purple has always been her favorite - it matches her royal personality! 👑"
  },
  {
    id: 2,
    question: "What does sister love to do on weekends?",
    options: ["Shopping", "Reading", "Cooking", "All of the above"],
    correct: 3,
    explanation: "She's multi-talented and loves doing all these activities! 🌟"
  },
  {
    id: 3,
    question: "What's sister's favorite type of music?",
    options: ["Pop", "Classical", "Rock", "Jazz"],
    correct: 0,
    explanation: "She loves singing along to pop songs and dancing! 🎵"
  },
  {
    id: 4,
    question: "What's sister's favorite dessert?",
    options: ["Ice Cream", "Chocolate Cake", "Cookies", "Fruit Salad"],
    correct: 1,
    explanation: "Chocolate cake is her ultimate weakness, especially homemade! 🍰"
  },
  {
    id: 5,
    question: "What quality describes sister the best?",
    options: ["Funny", "Kind", "Smart", "All of the above"],
    correct: 3,
    explanation: "She's the perfect combination of all these amazing qualities! ✨"
  },
  {
    id: 6,
    question: "What's sister's dream vacation?",
    options: ["Beach Resort", "Mountain Cabin", "City Tour", "Adventure Safari"],
    correct: 0,
    explanation: "She loves relaxing by the ocean with a good book! 🏖️"
  },
  {
    id: 7,
    question: "What makes sister happiest?",
    options: ["Family Time", "New Books", "Surprise Gifts", "All of the above"],
    correct: 3,
    explanation: "She finds joy in all the little things that matter! 💕"
  },
  {
    id: 8,
    question: "What's sister's superpower?",
    options: ["Making Everyone Smile", "Being Super Organized", "Giving Great Advice", "All of the above"],
    correct: 3,
    explanation: "She's basically a superhero in disguise! 🦸‍♀️"
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Array<{questionId: number, selected: number, correct: number}>>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const question = quizQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers(prev => [...prev, {
      questionId: question.id,
      selected: selectedAnswer,
      correct: question.correct
    }]);

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return "Perfect! You know sister amazingly well! 🏆";
    if (percentage >= 80) return "Excellent! You're practically sister's twin! 🌟";
    if (percentage >= 60) return "Great job! You know sister pretty well! 💕";
    if (percentage >= 40) return "Good effort! Time to spend more time together! 😊";
    return "You're just getting to know sister better! 💝";
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 py-20">
        <Confetti active={showConfetti} count={150} />
        
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8 border-0 shadow-magical">
              <Trophy className="w-16 h-16 text-birthday-gold mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Quiz Complete! 🎉</h1>
              
              <div className="text-6xl font-bold text-primary mb-4">
                {score}/{quizQuestions.length}
              </div>
              
              <p className="text-xl text-muted-foreground mb-6">
                {getScoreMessage()}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{((score/quizQuestions.length) * 100).toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
                <div className="p-4 bg-birthday-gold/10 rounded-xl">
                  <div className="text-2xl font-bold text-birthday-gold">{score}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="p-4 bg-birthday-pink/10 rounded-xl">
                  <div className="text-2xl font-bold text-birthday-pink">{quizQuestions.length - score}</div>
                  <div className="text-sm text-muted-foreground">To Learn</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button size="lg" onClick={resetQuiz} className="w-full">
                  <Brain className="w-5 h-5 mr-2" />
                  Take Quiz Again
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => window.location.href = "/"}>
                  <Gift className="w-5 h-5 mr-2" />
                  Back to Celebration
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-birthday-cream to-secondary/20 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />
            Sister Quiz
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-birthday-purple bg-clip-text text-transparent mb-4">
            How Well Do You Know Sister?
          </h1>
          <p className="text-lg text-muted-foreground">
            Test your knowledge about the birthday girl! 🎂
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-birthday-purple h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 border-0 shadow-lg">
            {!showResult ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {question.question}
                </h2>

                <div className="space-y-3 mb-8">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className="w-full p-4 h-auto text-left justify-start"
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}>
                          {selectedAnswer === index && <div className="w-2 h-2 bg-primary-foreground rounded-full" />}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                <Button 
                  onClick={handleNext} 
                  disabled={selectedAnswer === null}
                  className="w-full"
                  size="lg"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </>
            ) : (
              <div className="text-center animate-in fade-in duration-500">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {isCorrect ? (
                    <Check className="w-8 h-8 text-green-600" />
                  ) : (
                    <X className="w-8 h-8 text-red-600" />
                  )}
                </div>

                <h3 className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? "Correct!" : "Oops!"}
                </h3>

                {!isCorrect && (
                  <p className="text-muted-foreground mb-2">
                    The correct answer was: <strong>{question.options[question.correct]}</strong>
                  </p>
                )}

                <p className="text-muted-foreground mb-4">
                  {question.explanation}
                </p>

                <div className="text-sm text-muted-foreground">
                  {currentQuestion === quizQuestions.length - 1 ? "Calculating results..." : "Next question coming up..."}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Score Display */}
        <div className="max-w-2xl mx-auto mt-6">
          <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-birthday-gold" />
                <span className="font-medium">Current Score</span>
              </div>
              <span className="text-lg font-bold text-primary">
                {score}/{currentQuestion + (showResult ? 1 : 0)}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}