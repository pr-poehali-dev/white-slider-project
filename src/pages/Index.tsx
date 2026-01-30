import { useState, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const Index = () => {
  const [design, setDesign] = useState([50]);
  const [beat, setBeat] = useState([50]);
  const [vocal, setVocal] = useState([50]);
  const [implementation, setImplementation] = useState([50]);
  const [meat, setMeat] = useState([50]);
  const confettiTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = () => {
    setDesign([0]);
    setBeat([0]);
    setVocal([0]);
    setImplementation([0]);
    setMeat([0]);
  };

  useEffect(() => {
    const allMaxed = design[0] === 100 && 
                     beat[0] === 100 && 
                     vocal[0] === 100 && 
                     implementation[0] === 100 && 
                     meat[0] === 100;

    if (allMaxed) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = Math.floor((timeLeft / duration) * 100);

        confetti({
          ...defaults,
          particleCount: Math.max(particleCount / 5, 2),
          origin: { x: Math.random() * 0.4, y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#9b87f5']
        });
        confetti({
          ...defaults,
          particleCount: Math.max(particleCount / 5, 2),
          origin: { x: Math.random() * 0.4 + 0.6, y: Math.random() - 0.2 },
          colors: ['#FFD700', '#FFA500', '#9b87f5']
        });
      }, 200);

      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }

      confettiTimeoutRef.current = interval as unknown as NodeJS.Timeout;
    }

    return () => {
      if (confettiTimeoutRef.current) {
        clearInterval(confettiTimeoutRef.current as unknown as number);
      }
    };
  }, [design, beat, vocal, implementation, meat]);

  const sliders = [
    { label: "дизайнерство", value: design, setValue: setDesign },
    { label: "бит", value: beat, setValue: setBeat },
    { label: "вокал", value: vocal, setValue: setVocal },
    { label: "реализация", value: implementation, setValue: setImplementation },
    { label: "мясо", value: meat, setValue: setMeat },
  ];

  const totalScore = (
    design[0] / 5 +
    beat[0] / 5 +
    vocal[0] / 5 +
    implementation[0] / 5 +
    meat[0] / 5
  ) / 10;

  const getScoreColor = (score: number) => {
    if (score < 2.5) {
      const ratio = score / 2.5;
      const r = 239;
      const g = Math.round(68 + (234 - 68) * ratio);
      const b = Math.round(68 + (132 - 68) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (score < 7.5) {
      const ratio = (score - 2.5) / 5;
      const r = Math.round(239 - (239 - 34) * ratio);
      const g = Math.round(234 - (234 - 197) * ratio);
      const b = Math.round(132 - (132 - 94) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      const ratio = (score - 7.5) / 2.5;
      const r = Math.round(34 + (255 - 34) * ratio);
      const g = Math.round(197 + (215 - 197) * ratio);
      const b = Math.round(94 + (0 - 94) * ratio);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12 relative">
      <div className="fixed bottom-4 left-4 text-base text-gray-600 font-normal">
        by zxclozer & ayoluvme
      </div>
      <div className="w-full max-w-2xl space-y-12 animate-fade-in">
        <div className="flex justify-end">
          <Button 
            onClick={handleReset}
            variant="outline"
            className="text-gray-600 hover:text-gray-900"
          >
            сбросить
          </Button>
        </div>

        {sliders.map((slider, index) => (
          <div
            key={slider.label}
            className="space-y-3"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <label className="text-2xl font-light tracking-wide text-gray-800">
                {slider.label}
              </label>
              <span className="text-3xl font-medium text-primary tabular-nums">
                {slider.value[0]}
              </span>
            </div>
            <Slider
              value={slider.value}
              onValueChange={slider.setValue}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
        ))}

        <div 
          className="pt-8 mt-16 border-t border-gray-200"
          style={{ animationDelay: '500ms' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-light tracking-wide text-gray-800">
              общая оценка
            </h2>
            <span 
              className="text-5xl font-medium tabular-nums transition-colors duration-300"
              style={{ color: getScoreColor(totalScore) }}
            >
              {totalScore.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;