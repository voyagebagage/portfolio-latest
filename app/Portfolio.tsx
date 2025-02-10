"use client";

import type React from "react";
import { useLanguage } from "@/hooks/languageContext";
import LanguageBar from "@/hooks/LanguageBar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Github, Linkedin, Mail } from "lucide-react";

const Portfolio: React.FC = () => {
  const { t } = useLanguage();

  const currentStack = [
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "GraphQL",
    "Python",
    "Docker",
    "AWS",
    "Redux",
    "Express.js",
  ];

  const experiences = [
    {
      year: 2025,
      title: "Junior Developer",
      company: "Tech Corp",
      details: ["Led frontend development", "Implemented new features"],
    },
    {
      year: 2024,
      title: "Junior Developer",
      company: "Tech Corp",
      details: ["Developed REST APIs", "Worked with React"],
    },
    {
      year: 2023,
      title: "Junior Developer",
      company: "Tech Corp",
      details: ["Full stack development", "Agile methodology"],
    },
    {
      year: 2022,
      title: "Junior Developer",
      company: "Tech Corp",
      details: ["Frontend development", "UI/UX implementation"],
    },
    {
      year: 2021,
      title: "Developer",
      company: "Start Up",
      details: ["Web development", "Database design"],
    },
    {
      year: 2020,
      title: "Developer",
      company: "Start Up",
      details: ["Backend development", "API integration"],
    },
    {
      year: 2019,
      title: "Developer",
      company: "Start Up",
      details: ["Full stack development", "Project management"],
    },
  ];

  const projects = [
    {
      name: "E-commerce Platform",
      year: "2022",
      description:
        "A full-featured online shopping platform with real-time inventory management.",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      name: "Social Media Dashboard",
      year: "2021",
      description:
        "Analytics and management dashboard for social media accounts.",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
    },
    {
      name: "Task Management App",
      year: "2020",
      description: "Collaborative task management solution.",
      technologies: ["React", "Firebase", "Material-UI"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-12">
        {/* Language Bar - Full width and scrollable */}
        <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <LanguageBar />
        </div>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("name")}</h1>
          <div className="flex space-x-4">
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer">
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:john.doe@example.com">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* About Section */}
        <Card className="mb-8 bg-card">
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("about")}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Current Stack Section */}
        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="current-stack">
            <AccordionTrigger className="text-2xl font-bold">
              {t("current_stack")}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-4">
                {currentStack.map((tech) => (
                  <div
                    key={tech}
                    className="bg-muted p-4 rounded-lg text-muted-foreground hover:bg-primary/10 transition-colors">
                    {tech}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Experience Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t("experience")}</h2>
          <div className="space-y-2">
            {experiences.map((exp) => (
              <div key={exp.year} className="border-b border-border">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-2">
                  <span className="text-2xl font-bold">{exp.year}</span>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full sm:w-2/3">
                    <AccordionItem
                      value={exp.year.toString()}
                      className="border-none">
                      <AccordionTrigger className="hover:no-underline py-0">
                        <div className="text-left sm:text-right">
                          <div className="text-lg text-muted-foreground">
                            {exp.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {exp.company}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <ul className="list-disc pl-4 text-sm text-muted-foreground">
                          {exp.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t("projects")}</h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.name} className="border-b border-border">
                <Accordion type="single" collapsible>
                  <AccordionItem value={project.name} className="border-none">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2">
                      <div className="space-y-1">
                        <h3 className="text-xl font-medium">{project.name}</h3>
                        <p className="text-muted-foreground">{project.year}</p>
                      </div>
                      <AccordionTrigger className="hover:no-underline py-0" />
                    </div>
                    <AccordionContent className="pt-2">
                      <p className="text-muted-foreground mb-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
