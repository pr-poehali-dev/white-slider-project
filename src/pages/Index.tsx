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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
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
      </div>
    </div>
  );
};

export default Index;