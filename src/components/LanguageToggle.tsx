"use client";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@utils/helpers";
import React, { forwardRef } from "react";
import { Globe } from "lucide-react";

export interface LanguageToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof languageToggleVariants> {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const languageToggleVariants = cva(
  [
    "relative",
    "text-sm focus:z-10 focus:ring-2 font-medium focus:outline-none whitespace-nowrap",
    "inline-flex gap-2 items-center justify-center transition-colors focus:ring-offset-1",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:dark:text-nb-gray-300 dark:ring-offset-neutral-950/50",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white hover:text-black focus:ring-zinc-200/50 hover:bg-gray-100 border-gray-200 text-gray-900",
          "dark:focus:ring-zinc-800/50 dark:bg-nb-gray dark:text-gray-400 dark:border-gray-700/30 dark:hover:text-white dark:hover:bg-zinc-800/50",
        ],
        outline: [
          "bg-white hover:text-black focus:ring-zinc-200/50 hover:bg-gray-100 border-gray-200 text-gray-900",
          "dark:focus:ring-zinc-800/50 dark:bg-transparent dark:text-gray-400 dark:border-gray-700/40 dark:hover:text-white dark:hover:bg-nb-gray-910",
        ],
        compact: [
          "bg-transparent hover:bg-gray-100 dark:hover:bg-nb-gray-900 text-gray-600 dark:text-gray-400",
          "border border-gray-200 dark:border-gray-700/40",
        ],
      },
      size: {
        sm: "text-sm py-2 px-3",
        md: "text-md py-2.5 px-4",
        icon: "p-2",
      },
      rounded: {
        true: "rounded-md",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "sm",
      rounded: true,
    },
  },
);

// Only Chinese and English
const supportedLanguages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

const LanguageToggle = forwardRef<HTMLButtonElement, LanguageToggleProps>(
  (
    {
      currentLanguage = "en",
      onLanguageChange,
      variant = "outline",
      size = "sm",
      rounded = true,
      className,
      ...props
    },
    ref,
  ) => {
    const currentLang =
      supportedLanguages.find((lang) => lang.code === currentLanguage) ||
      supportedLanguages[0];

    // Toggle to the other language
    const otherLanguage =
      supportedLanguages.find((lang) => lang.code !== currentLanguage) ||
      supportedLanguages[1];

    const handleToggle = () => {
      onLanguageChange?.(otherLanguage.code);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          languageToggleVariants({ variant, size, rounded }),
          className,
        )}
        onClick={handleToggle}
        title={currentLanguage === "en" ? "切换到中文" : "Switch to English"}
        aria-label={
          currentLanguage === "en" ? "切换到中文" : "Switch to English"
        }
        {...props}
      >
        {size === "icon" ? (
          <>
            <Globe size={16} />
            <span className="text-xs font-medium">
              {currentLang.code.toUpperCase()}
            </span>
          </>
        ) : (
          <>
            <Globe size={16} />
            <span className="hidden sm:inline">
              {currentLang.flag} {currentLang.name}
            </span>
            <span className="sm:hidden">{currentLang.flag}</span>
            <span className="text-xs opacity-60">→</span>
            <span className="hidden sm:inline">
              {otherLanguage.flag} {otherLanguage.name}
            </span>
            <span className="sm:hidden">{otherLanguage.flag}</span>
          </>
        )}
      </button>
    );
  },
);

LanguageToggle.displayName = "LanguageToggle";

export default LanguageToggle;
