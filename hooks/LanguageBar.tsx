"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { languages, useLanguage } from "./languageContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const LanguageBar: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <ScrollArea
      className="w-full whitespace-nowrap rounded-sm"
      type="scroll"
      scrollHideDelay={0}>
      <div className="flex space-x-1 py-2 pl-2 ">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "inline-flex shrink-0  px-2 py-4 rounded transition-colors",
              language === lang.code
                ? "bg-[#7FA1C3] text-white"
                : "text-[#6482AD] hover:bg-white/20 bg-[#E2DAD6]/45"
            )}>
            {lang.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default LanguageBar;
