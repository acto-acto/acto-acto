import { tools } from "@/data/tools";
import { certifications } from "@/data/certifications";
import { articles } from "@/data/articles";
import { contact } from "@/data/contact";
import { projects } from "@/data/projects";
import BareList from "../components/BareList";
import LinkedList from "../components/LinkedList";

export type Feature = {
  command: string;
  response: string | (() => React.ReactElement) | (() => void);
};

export default function useFeatures(handleClear: () => void) {
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
      response: handleClear,
    },
  ];
  return features;
}
