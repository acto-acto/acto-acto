"use client";

import { FormEvent, useState } from "react";
import useFeatures from "../hooks/features";
import WrongCommand from "./WrongCommand";
import MultilineTypewriter from "./MultilineTypewriter";
import ShellInput from "./ShellInput";

export type OutputType = string | React.ReactElement;

export default function Overview() {
  const [command, setCommand] = useState("");
  const [justLoaded, setJustLoaded] = useState(true);
  const [isIntroducing, setIsIntroducing] = useState(true);
  const [prevCommands, setPrevCommands] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<OutputType[]>([]);

  const intro: string[] = [
    "Hello!, I'm  ThankGod Chibugwum Obobo",
    "Software Developer & Devops Engineer",
    'Type "help" to see a list of available commands.',
  ];

  const handleClear = () => {
    setPrevCommands([]);
    setOutputs([]);
    setCommand("");
    setJustLoaded(false);
  };

  const features = useFeatures(handleClear);

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();

    const feature = features.find((f) => f.command === command);

    setPrevCommands((prev) => [...prev, command]);

    if (!feature) {
      setOutputs((prev) => [
        ...prev,
        <WrongCommand key={prev.length} command={command} />,
      ]);
    } else {
      if (typeof feature.response === "function") {
        if (feature.command === "clear") {
          feature.response();
          return;
        } else {
          const componentElement = feature.response() as React.ReactElement;
          setOutputs((prev) => [...prev, componentElement]);
        }
      } else {
        setOutputs((prev) => [...prev, feature.response as string]);
      }
    }

    setCommand("");
  };

  return (
    <div className="bg-[#F9FAFF] dark:bg-[#0A0A0A] text-[#00A154] min-h-screen p-2 lg:p-4 !pt-[60px]">
      {justLoaded && (
        <div className="mb-8">
          <MultilineTypewriter
            lines={intro}
            onDone={() => setIsIntroducing(false)}
          />
        </div>
      )}

      {!isIntroducing && (
        <div className="space-y-2">
          {outputs.map((output, index) => (
            <div key={index}>
              <ShellInput command={prevCommands[index]} />
              {typeof output === "string" ? <p>{output}</p> : output}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center">
            <ShellInput />
            <input
              className="border-none outline-none w-full"
              value={command}
              onChange={(e) => setCommand(e.target.value.toLowerCase())}
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
}
