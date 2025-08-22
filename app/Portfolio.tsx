"use client";

import type React from "react";
import { useRef, useState } from "react";
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
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { AIChatBox, AIChatBoxRef } from "@/components/AIChatBot";
import StyledAboutText from "@/components/StyleAboutText";

const Portfolio: React.FC = () => {
  const { t } = useLanguage();
  const chatBoxRef = useRef<AIChatBoxRef>(null);
  const [activeAccordion, setActiveAccordion] = useState<string>("");

  const handleChatLinkClick = (message: string) => {
    if (chatBoxRef.current) {
      chatBoxRef.current.submitMessage(message);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Scroll to chat section
    const chatElement = document.getElementById("chat");
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.setEmailMode(true);
          chatBoxRef.current.setInputValue("Write your email here");
        }
      }, 500);
    }
  };

  const handleNavClick = (section: string) => {
    switch (section) {
      case "stack":
        // Scroll to chat and ask about stack
        const chatElement = document.getElementById("chat");
        if (chatElement) {
          chatElement.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            if (chatBoxRef.current) {
              chatBoxRef.current.submitMessage(t("tellMeAboutYourTechStack"));
            }
          }, 500);
        }
        break;
      case "questions":
        // Just scroll to chat
        const chatEl = document.getElementById("chat");
        if (chatEl) {
          chatEl.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "projects":
        // Scroll to projects section
        const projectsEl = document.getElementById("projects");
        if (projectsEl) {
          projectsEl.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "education":
        // Scroll to education section
        const educationEl = document.getElementById("education");
        if (educationEl) {
          educationEl.scrollIntoView({ behavior: "smooth" });
        }
        break;
    }
  };

  const experiences = [
    {
      year: "2023 - 2025",
      title: t("freelanceDeveloper"),
      company: t("freelance"),
      details: [
        t("fullStackDevelopment"),
        t("frontendDevelopment"),
        t("backendDevelopment"),
        t("telegramBotsDevelopment"),
      ],
    },
    {
      year: "2021 - 2023",
      title: t("developerFullStack"),
      company: t("ninjaPartners"),
      details: [
        t("gamificationDashboardDevelopment"),
        t("awsAmplifyGraphQLIntegration"),
        t("reactNodejsImplementation"),
        t("airtableAutomationScripts"),
        t("apiIntegrationReplyWoodpecker"),
        t("databaseOptimizationAnalysis"),
        t("backOfficeEfficiencyImprovements"),
      ],
    },
  ];

  const projects = [
    {
      name: t("telegramCryptoMiningApp"),
      nameLink: {
        text: t("wildMinerHash"),
        url: "https://web.telegram.org/a/#7626071294",
      },
      year: "2025",
      description: t("telegramCryptoMiningDescription"),
      technologies: ["Next.js", "Tailwind CSS"],
      link: "https://web.telegram.org/a/#7626071294",
    },
    {
      name: t("foodDeliveryTelegramApp"),
      year: "2024 - 2025",
      description: t("foodDeliveryDescription"),
      technologies: ["Next.js", "Cloudflare Workers", "D1 database"],
      link: "https://github.com/johndoe/food-delivery-telegram-app",
    },
    {
      name: t("gamificationDashboard"),
      nameLink: {
        text: t("ninjaPartners"),
        url: "https://www.ninja.partners/",
      },
      year: "2021 - 2022",
      description: t("gamificationDescription"),
      technologies: ["React", "Next.js", "AWS Amplify", "DynamoDB", "GraphQL"],
      link: "https://github.com/johndoe/gamification-dashboard",
    },
  ];
  const education = [
    {
      degree: t("leReacteurBootcamp"),
      institution: t("leReacteur"),
      year: "2021",
      details: [
        t("fullStackDevelopment"),
        t("agileMethodology"),
        "React",
        "Node.js",
        "Express",
        "MongoDB",
      ],
    },
    {
      degree: t("abcMusicTechnology"),
      institution: t("universityArtLondon"),
      year: "2011",
    },
    {
      degree: t("bachelorsElectricalEngineering"),
      institution: t("universiteCoteAzur"),
      year: "2010",
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pr-8">
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
                href="#"
                onClick={handleEmailClick}
                className="text-[#6482AD] hover:text-[#7FA1C3] transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/33769654361"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6482AD] hover:text-[#7FA1C3] transition-colors">
                <MessageCircle className="w-6 h-6 whatsapp-pulse" />
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
                <CardDescription className="text-[#6482AD]/80 mt-2 leading-[1.7]">
                  <StyledAboutText
                    text={t("about")}
                    onChatLinkClick={handleChatLinkClick}
                  />
                </CardDescription>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap md:flex-nowrap gap-1 sm:gap-2 mt-8 pt-2 w-full ml-1 pr-3">
                  <button
                    onClick={() => handleNavClick("stack")}
                    className="flex-1 min-w-0 px-2 sm:px-4 md:px-6 py-[6px] bg-[#6482AD] bg-opacity-85 hover:bg-[#7FA1C3] text-white rounded-md transition-colors shadow-sm text-xs sm:text-sm font-medium transform"
                    style={{ transform: "skewX(-30deg)" }}>
                    <span
                      style={{ transform: "skewX(30deg)" }}
                      className="block text-center leading-tight">
                      {t("seeMyStack")}
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavClick("questions")}
                    className="flex-1 min-w-0 px-2 sm:px-4 md:px-6 py-[6px] bg-[#7FA1C3] bg-opacity-85 hover:bg-[#6482AD] text-white rounded-md transition-colors shadow-sm text-xs sm:text-sm font-medium transform"
                    style={{ transform: "skewX(-30deg)" }}>
                    <span
                      style={{ transform: "skewX(30deg)" }}
                      className="block text-center leading-tight">
                      {t("questions")}
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavClick("projects")}
                    className="flex-1 min-w-0 px-2 sm:px-4 md:px-6 py-[6px] bg-[#E2DAD6] bg-opacity-85 hover:bg-[#7FA1C3] text-[#6482AD] hover:text-white rounded-md transition-colors shadow-sm text-xs sm:text-sm font-medium transform"
                    style={{ transform: "skewX(-30deg)" }}>
                    <span
                      style={{ transform: "skewX(30deg)" }}
                      className="block text-center leading-tight">
                      {t("projects")}
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavClick("education")}
                    className="flex-1 min-w-0 px-2 sm:px-4 md:px-6 py-[6px] bg-[#E2DAD6] bg-opacity-85 hover:bg-[#7FA1C3] text-[#6482AD] hover:text-white rounded-md transition-colors shadow-sm text-xs sm:text-sm font-medium transform"
                    style={{ transform: "skewX(-30deg)" }}>
                    <span
                      style={{ transform: "skewX(30deg)" }}
                      className="block text-center leading-tight">
                      {t("education")}
                    </span>
                  </button>
                </div>
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
                  {exp.details && exp.details.length > 0 ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      value={
                        activeAccordion === `exp-${exp.year}`
                          ? `exp-${exp.year}`
                          : ""
                      }
                      onValueChange={(value) =>
                        setActiveAccordion(value || "")
                      }>
                      <AccordionItem
                        value={`exp-${exp.year}`}
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
                          <div className="flex flex-wrap gap-2">
                            {exp.details.map((detail, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-[#7FA1C3]/10 text-[#6482AD] rounded-md text-sm font-medium shadow-sm border border-[#7FA1C3]/20">
                                {detail}
                              </span>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div className="py-4">
                      <div className="flex justify-between items-center">
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
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-8" id="projects">
            <h2 className="text-2xl font-bold mb-4 text-[#6482AD] border-b border-[#7FA1C3]/30 pb-2 inline-block">
              {t("projects")}
            </h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="border-b border-border hover:bg-white/20 bg-gradient-to-b from-[#E2DAD6]/0 via-[#E2DAD6]/10 to-[#E2DAD6]/40 px-4 p-0 rounded w-full">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    value={
                      activeAccordion === `project-${project.name}`
                        ? `project-${project.name}`
                        : ""
                    }
                    onValueChange={(value) => setActiveAccordion(value || "")}>
                    <AccordionItem
                      value={`project-${project.name}`}
                      className="border-none">
                      <AccordionTrigger className="hover:no-underline w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                          <div className="  text-left">
                            <h3 className="text-xl font-medium text-[#7FA1C3]">
                              {project.name}
                              {project.nameLink && (
                                <a
                                  href={project.nameLink.url}
                                  className="text-[#7FA1C3] underline hover:text-[#5A7BA3]"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  {project.nameLink.text}
                                </a>
                              )}
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
          <div className="mb-8" id="education">
            <h2 className="text-2xl font-bold mb-4 text-[#6482AD] border-b border-[#7FA1C3]/30 pb-2 inline-block">
              {t("education")}
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="border-b border-border hover:bg-white/20 bg-gradient-to-b from-[#E2DAD6]/0 via-[#E2DAD6]/10 to-[#E2DAD6]/40 px-4 p-0 rounded w-full">
                  {edu.details && edu.details.length > 0 ? (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      value={
                        activeAccordion === `edu-${edu.degree}`
                          ? `edu-${edu.degree}`
                          : ""
                      }
                      onValueChange={(value) =>
                        setActiveAccordion(value || "")
                      }>
                      <AccordionItem
                        value={`edu-${edu.degree}`}
                        className="border-none">
                        <AccordionTrigger className="hover:no-underline w-full">
                          <div className="text-left w-full">
                            <h3 className="text-xl font-medium text-[#7FA1C3]">
                              {edu.degree}
                            </h3>
                            <p className="text-muted-foreground">
                              {edu.institution} • {edu.year}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="flex flex-wrap gap-2">
                            {edu.details.map((detail, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-[#7FA1C3]/10 text-[#6482AD] rounded-md text-sm font-medium shadow-sm border border-[#7FA1C3]/20">
                                {detail}
                              </span>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div className="py-4">
                      <div className="text-left w-full">
                        <h3 className="text-xl font-medium text-[#7FA1C3]">
                          {edu.degree}
                        </h3>
                        <p className="text-muted-foreground">
                          {edu.institution} • {edu.year}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Section */}
          <div className="max-w p-4" id="chat">
            <div className="bg-gradient-to-r from-[#7FA1C3]/15 to-[#E2DAD6]/40 p-4 rounded-lg shadow-sm border border-[#7FA1C3]/20">
              <AIChatBox ref={chatBoxRef} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
