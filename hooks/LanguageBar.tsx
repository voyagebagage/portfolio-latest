"use client";

import type React from "react";
// import { useLanguage, languages } from "./languageContext"
import { languages, useLanguage } from "./languageContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const LanguageBar: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md">
      <div className="flex space-x-2 pb-2.5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`inline-flex shrink-0 px-3 py-1 rounded ${
              language === lang.code
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            {lang.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default LanguageBar;
