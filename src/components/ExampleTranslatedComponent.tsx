// Example of how to use translations in components
// This is a demonstration file showing the pattern

"use client";

import { useLanguage } from "@/contexts/LanguageProvider";
import Button from "@components/Button";

export default function ExampleTranslatedComponent() {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="p-4">
      <h2>{t("common.save", "t('common.save', 'Save')")}</h2>
      <p>{t("msg.saved_successfully", "t('common.save', 'Save')d successfully")}</p>

      <Button variant="primary">{t("common.edit", "t('common.edit', 'Edit')")}</Button>

      <div className="mt-2 text-sm text-gray-500">
        Current language: {currentLanguage}
      </div>
    </div>
  );
}
