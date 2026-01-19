"use client";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@utils/helpers";
import React, { forwardRef } from "react";
import { Globe } from "lucide-react";

export interface LanguageSwitcherProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof languageSwitcherVariants> {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const languageSwitcherVariants = cva(
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
      },
      size: {
        sm: "text-sm py-2 px-3",
        md: "text-md py-2.5 px-4",
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

// Supported languages configuration
const supportedLanguages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

const LanguageSwitcher = forwardRef<HTMLButtonElement, LanguageSwitcherProps>(
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
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const currentLang =
      supportedLanguages.find((lang) => lang.code === currentLanguage) ||
      supportedLanguages[0];

    const handleLanguageSelect = (languageCode: string) => {
      onLanguageChange?.(languageCode);
      setIsOpen(false);
    };

    // t('common.close', 'Close') dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          ref={ref}
          type="button"
          className={cn(
            languageSwitcherVariants({ variant, size, rounded }),
            className,
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Select language"
          {...props}
        >
          <Globe size={16} />
          <span className="hidden sm:inline">
            {currentLang.flag} {currentLang.name}
          </span>
          <span className="sm:hidden">{currentLang.flag}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-nb-gray-920 border border-gray-200 dark:border-gray-700/40 rounded-md shadow-lg z-50">
            <div className="py-1 max-h-64 overflow-y-auto">
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-nb-gray-900 transition-colors",
                    "flex items-center gap-2",
                    currentLanguage === language.code &&
                      "bg-gray-100 dark:bg-nb-gray-900 text-netbird dark:text-netbird font-medium",
                  )}
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                  {currentLanguage === language.code && (
                    <span className="ml-auto text-netbird">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

LanguageSwitcher.displayName = "LanguageSwitcher";

export default LanguageSwitcher;
