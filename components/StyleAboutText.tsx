import React from "react";

interface StyledAboutTextProps {
  text: string;
}

const StyledAboutText: React.FC<StyledAboutTextProps> = ({ text }) => {
  // Function to render the processed text
  const renderProcessedText = () => {
    // First, handle the HTML anchor tags by replacing them with placeholders
    const anchors: string[] = [];
    const textWithPlaceholders = text.replace(/<a[^>]*>.*?<\/a>/g, (match) => {
      anchors.push(match);
      return `__ANCHOR_${anchors.length - 1}__`;
    });

    // Split the text by spaces to process each token
    const parts = textWithPlaceholders.split(/(\s+)/);
    console.log(parts);

    return parts.map((part, index) => {
      // If it's just whitespace, return it as is
      if (/^\s+$/.test(part)) {
        return part;
      }

      // Check if this is an anchor placeholder
      if (part.startsWith("__ANCHOR_") && part.endsWith("__")) {
        const anchorIndex = parseInt(part.slice(9, -2));
        console.log(anchorIndex);

        return (
          <span
            key={`anchor-${index}`}
            dangerouslySetInnerHTML={{ __html: anchors[anchorIndex] }}
            className="text-[#6482AD] underline"
          />
        );
      }

      // Check if the part starts with an emoji from your specific set
      if (part.includes("+")) {
        part = part.replace(/\+/g, " ");

        return (
          <span
            key={`styled-${index}`}
            className="inline-block mx px-1 bg-[#7FA1C3]/10 text-[#6482AD] rounded-md text-sm font-medium shadow-sm border border-[#7FA1C3]/20">
            {part}
          </span>
        );
      }

      // Otherwise, return the part as is
      return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
    });
  };

  return <>{renderProcessedText()}</>;
};

export default StyledAboutText;
