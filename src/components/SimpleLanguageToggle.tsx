"use client";

import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@utils/helpers";
import React, { forwardRef } from "react";

export interface SimpleLanguageToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof simpleLanguageToggleVariants> {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const simpleLanguageToggleVariants = cva(
  [
    "relative",
    "text-sm font-medium focus:outline-none transition-all duration-200",
    "inline-flex items-center justify-center",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "hover:scale-105 active:scale-95",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white dark:bg-nb-gray border border-gray-200 dark:border-gray-700/40",
          "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-nb-gray-900",
          "shadow-sm",
        ],
        compact: [
          "bg-transparent hover:bg-gray-100 dark:hover:bg-nb-gray-900/50",
          "text-gray-600 dark:text-gray-400",
          "border border-gray-200 dark:border-gray-700/40",
        ],
        minimal: [
          "bg-transparent hover:bg-gray-100 dark:hover:bg-nb-gray-900/30",
          "text-gray-500 dark:text-gray-400",
        ],
      },
      size: {
        sm: "text-sm py-2 px-3",
        md: "text-md py-2.5 px-4",
        icon: "p-2",
        mini: "p-1.5",
      },
      rounded: {
        true: "rounded-md",
        false: "",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "compact",
      size: "sm",
      rounded: true,
    },
  },
);

const SimpleLanguageToggle = forwardRef<
  HTMLButtonElement,
  SimpleLanguageToggleProps
>(
  (
    {
      currentLanguage = "en",
      onLanguageChange,
      variant = "compact",
      size = "sm",
      rounded = true,
      className,
      ...props
    },
    ref,
  ) => {
    const handleToggle = () => {
      const newLanguage = currentLanguage === "en" ? "zh" : "en";
      onLanguageChange?.(newLanguage);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          simpleLanguageToggleVariants({ variant, size, rounded }),
          className,
        )}
        onClick={handleToggle}
        title={currentLanguage === "en" ? "切换到中文" : "Switch to English"}
        aria-label={
          currentLanguage === "en" ? "切换到中文" : "Switch to English"
        }
        {...props}
      >
        {size === "mini" || size === "icon" ? (
          // Icon-only version
          <div className="flex items-center gap-0.5">
            <span
              className={`transition-opacity duration-200 ${
                currentLanguage === "en" ? "opacity-100" : "opacity-40"
              }`}
            >
              🇺🇸
            </span>
            <span className="text-xs opacity-50">|</span>
            <span
              className={`transition-opacity duration-200 ${
                currentLanguage === "zh" ? "opacity-100" : "opacity-40"
              }`}
            >
              🇨🇳
            </span>
          </div>
        ) : (
          // Full version
          <div className="flex items-center gap-2">
            <span
              className={`transition-all duration-200 ${
                currentLanguage === "en" ? "opacity-100" : "opacity-40 scale-90"
              }`}
            >
              🇺🇸
            </span>
            <span
              className={`text-xs font-medium ${
                currentLanguage === "en"
                  ? "text-netbird dark:text-netbird"
                  : "opacity-50"
              }`}
            >
              EN
            </span>
            <span className="text-xs opacity-40">↔</span>
            <span
              className={`text-xs font-medium ${
                currentLanguage === "zh"
                  ? "text-netbird dark:text-netbird"
                  : "opacity-50"
              }`}
            >
              中
            </span>
            <span
              className={`transition-all duration-200 ${
                currentLanguage === "zh" ? "opacity-100" : "opacity-40 scale-90"
              }`}
            >
              🇨🇳
            </span>
          </div>
        )}
      </button>
    );
  },
);

SimpleLanguageToggle.displayName = "SimpleLanguageToggle";

export default SimpleLanguageToggle;
