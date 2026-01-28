import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [design, setDesign] = useState([50]);
  const [beat, setBeat] = useState([50]);
  const [vocal, setVocal] = useState([50]);
  const [implementation, setImplementation] = useState([50]);
  const [meat, setMeat] = useState([50]);

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
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-2xl space-y-12 animate-fade-in">
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