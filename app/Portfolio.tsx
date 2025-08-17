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
import { ThemeProvider } from "@/components/theme-provider";
import { AIChatBox } from "@/components/AIChatBot";
import StyledAboutText from "@/components/StyleAboutText";

const Portfolio: React.FC = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      year: 2024,
      title: "Developer",
      company: "Tech Corp",
      details: ["Developed REST APIs", "Worked with React"],
    },
    {
      year: 2023,
      title: "Developer",
      company: "Tech Corp",
      details: ["Full stack development", "Agile methodology"],
    },
    {
      year: 2022,
      title: "Developer",
      company: "Tech Corp",
      details: ["Frontend development", "UI/UX implementation"],
    },
    {
      year: 2021,
      title: "Developer",
      company: "Start Up",
      details: ["Web development", "Database design"],
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
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Tech University",
      year: "2022",
      details: [
        "Specialized in Artificial Intelligence",
        "Thesis on Deep Learning applications in NLP",
      ],
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      year: "2020",
      details: [
        "Dean's List for 4 consecutive years",
        "Capstone project: Developing a real-time collaboration tool",
      ],
    },
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#F5EDED] to-[#E2DAD6] text-foreground">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-12">
          {/* Language Bar - Full width and scrollable */}
          <div className="mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <LanguageBar />
          </div>

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pr-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#6482AD]">
              {t("name")}
            </h1>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6482AD] hover:text-[#7FA1C3] transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6482AD] hover:text-[#7FA1C3] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:john.doe@example.com"
                className="text-[#6482AD] hover:text-[#7FA1C3] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* About Section */}
          <Card className="mb-8 -mx-2 bg-white/80 shadow-md border border-[#7FA1C3]/30 hover:border-[#7FA1C3]/50 transition-colors ">
            <div className="bg-[#7FA1C] border-[10px] rounded-md">
              <CardHeader>
                <CardTitle className="text-2xl text-[#6482AD] font-bold">
                  {t("title")}
                </CardTitle>
                <CardDescription className="text-[#6482AD]/80 mt-2 leading-relaxed">
                  <StyledAboutText text={t("about")} />
                </CardDescription>
              </CardHeader>
            </div>
          </Card>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#6482AD] border-b border-[#7FA1C3]/30 pb-2 inline-block">
              {t("experience")}
            </h2>
            <div className="space-y-2">
              {experiences.map((exp) => (
                <div
                  key={exp.year}
                  className="border-b border-border hover:bg-white/20 bg-gradient-to-b from-[#E2DAD6]/0 via-[#E2DAD6]/10 to-[#E2DAD6]/40 px-4 p-0 rounded w-full">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value={exp.year.toString()}
                      className="border-none ">
                      <AccordionTrigger className="hover:no-underline flex justify-between">
                        <span className="text-2xl font-bold text-[#7FA1C3]">
                          {exp.year}
                        </span>
                        <div className="flex-1 flex justify-center items-center">
                          <div className="text-center">
                            <div className="text-lg text-muted-foreground">
                              {exp.title}
                            </div>
                            <div className="text-sm text-right text-muted-foreground">
                              {exp.company}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="w-full mx-auto text-center">
                          <ul className="list-disc inline-block text-left text-sm text-muted-foreground">
                            {exp.details.map((detail, index) => (
                              <li key={index}>{detail}</li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#6482AD] border-b border-[#7FA1C3]/30 pb-2 inline-block">
              {t("projects")}
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.name} className="border-b border-border">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={project.name} className="border-none">
                      <AccordionTrigger className="hover:no-underline w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                          <div className="  text-left">
                            <h3 className="text-xl font-medium text-[#7FA1C3]">
                              {project.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {project.year}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <p className="text-muted-foreground mb-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-[#7FA1C3]/10 text-[#6482AD] rounded-md text-sm font-medium shadow-sm border border-[#7FA1C3]/20">
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

          {/* Education Section */}
          <div className="mb-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="education">
                <AccordionTrigger className="text-2xl font-bold text-[#6482AD] hover:text-[#6482AD]/70 border-b border-[#7FA1C3]/30 pb-2">
                  {t("education")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    {education.map((edu) => (
                      <div
                        key={edu.degree}
                        className="border-b border-border pb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="text-xl font-medium text-[#7FA1C3]">
                              {edu.degree}
                            </h3>
                            <p className="text-muted-foreground">
                              {edu.institution}
                            </p>
                          </div>
                          <span className="text-muted-foreground">
                            {edu.year}
                          </span>
                        </div>
                        <ul className="list-disc pl-4 mt-2 text-sm text-muted-foreground">
                          {edu.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* AI Chat Section */}
          <div className="max-w-2xl mx-auto p-4" id="chat">
            <div className="bg-gradient-to-r from-[#7FA1C3]/15 to-[#E2DAD6]/40 p-4 rounded-lg shadow-sm border border-[#7FA1C3]/20">
              <AIChatBox />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
