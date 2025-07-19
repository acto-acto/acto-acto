"use client";

import { projects } from "@/data/projects";
import { FormEvent, useState } from "react";
import MultilineTypewriter from "./components/MultilineTypewriter";
import WrongCommand from "./components/WrongCommand";
import BareList from "./components/BareList";
import { tools } from "@/data/tools";
import LinkedList from "./components/LinkedList";
import { certifications } from "@/data/certifications";
import { articles } from "@/data/articles";
import { contact } from "@/data/contact";

export type OutputType = string | React.ReactElement;

export type Feature = {
  command: string;
  response: string | (() => React.ReactElement) | (() => void);
};

export default function Page() {
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

  const features: Feature[] = [
    {
      command: "help",
      response:
        "Available commands: 'whoami', 'tools', 'certifications', 'projects', 'articles', 'contact', 'clear'",
    },
    {
      command: "whoami",
      response:
        "ThankGod is a results-oriented Software Developer with 6 years of professional experience, proficient with the devops and agile software development culture, frontend and backend web development. Experienced in both team-based and solo development environments, delivering high-quality solutions both for tech firms and non-tech firms.",
    },
    {
      command: "tools",
      response: () => <BareList items={tools} />,
    },
    {
      command: "certifications",
      response: () => <LinkedList items={certifications} />,
    },
    {
      command: "projects",
      response: () => <LinkedList items={projects} />,
    },
    {
      command: "articles",
      response: () => <LinkedList items={articles} />,
    },
    {
      command: "contact",
      response: () => <BareList items={contact} />,
    },
    {
      command: "clear",
      response: () => {
        setPrevCommands([]);
        setOutputs([]);
        setCommand("");
        setJustLoaded(false);
      },
    },
  ];

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();

    const feature = features.find((f) => f.command === command);

    setPrevCommands((prev) => [...prev, command]);

    if (!feature) {
      setOutputs((prev) => [...prev, <WrongCommand command={command} />]);
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
    <main className="bg-black text-green-400 min-h-screen p-2 lg:p-4 font-mono">
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
              <div className="flex items-center">
                <span className="flex items-center justify-center mr-2">
                  <span className="w-[5px] h-[5px] rounded-full bg-green-400"></span>
                </span>
                <p className="mr-2">
                  {`acto@actotech.dev:~$ ${prevCommands[index]}`}
                </p>
              </div>
              {typeof output === "string" ? <p>{output}</p> : output}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex items-center">
            <span className="flex items-center justify-center mr-2">
              <span className="w-[5px] h-[5px] rounded-full bg-green-400  "></span>
            </span>
            <p className="mr-2">acto@actotech.dev:~$</p>
            <input
              className="bg-black border-none outline-none text-green-400 w-full"
              value={command}
              onChange={(e) => setCommand(e.target.value.toLowerCase())}
              autoFocus
            />
          </form>
        </div>
      )}
    </main>
  );
}
