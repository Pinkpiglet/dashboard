#!/usr/bin/env node

/**
 * Unified translation fix script
 * Fixes all translation-related syntax errors in one go
 */

const fs = require("fs");
const path = require("path");

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let fixed = false;

    // 1. Fix extra < character after t() calls
    // Pattern: t('...', '...')<
    content = content.replace(
      /t\((['"])([^'"]+)\1,\s*([^(]+)\)(<)/g,
      (match, quote1, key, fallback, lt) => {
        console.log(`  Fixed extra < in ${filePath}`);
        fixed = true;
        return `t(${quote1}${key}${quote1}, ${fallback})${
          lt === "<" ? "" : lt
        }`;
      },
    );

    // Also fix patterns with double quotes
    content = content.replace(
      /t\("([^"]+)",\s*([^)]+)\)(<)/g,
      (match, key, fallback, lt) => {
        console.log(`  Fixed extra < in ${filePath}`);
        fixed = true;
        return `t("${key}", ${fallback})`;
      },
    );

    // 2. Fix missing useLanguage import when t() is used
    const hasTFunction = content.match(/t\(['"]/);
    const hasUseLanguage = content.includes("useLanguage");

    if (hasTFunction && !hasUseLanguage) {
      // Add import after React import
      if (content.includes("from 'react'")) {
        content = content.replace(
          /(['"])react['"];(\s*)/,
          `$1react['"];$2import { useLanguage } from '@/contexts/LanguageProvider';$2`,
        );
        console.log(`  Added useLanguage import to ${filePath}`);
        fixed = true;
      }
    }

    // 3. Add const { t } = useLanguage() to component functions
    if (hasTFunction && hasUseLanguage) {
      // Check if t is used but not defined
      const hasTDefinition =
        content.includes("const { t } = useLanguage()") ||
        content.includes("const { t } = useLanguage;") ||
        content.includes("const {t} = useLanguage");

      if (!hasTDefinition && hasTFunction) {
        // Find component functions and add t definition
        content = content.replace(
          /(export (default )?(function|const) \w+\([^)]*\)\s*\{)/g,
          `$1\n  const { t } = useLanguage();`,
        );
        console.log(`  Added t definition to ${filePath}`);
        fixed = true;
      }
    }

    if (fixed) {
      fs.writeFileSync(filePath, content);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function scanDirectory(dir) {
  const results = { fixed: 0, failed: 0, files: [] };

  if (!fs.existsSync(dir)) return results;

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (
        file !== "node_modules" &&
        file !== ".git" &&
        file !== ".next" &&
        file !== "scripts"
      ) {
        const subResults = scanDirectory(fullPath);
        results.fixed += subResults.fixed;
        results.failed += subResults.failed;
        results.files.push(...subResults.files);
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      if (
        !file.includes(".test.") &&
        !file.includes(".spec.") &&
        !file.includes("scripts")
      ) {
        try {
          const content = fs.readFileSync(fullPath, "utf8");

          // Check if file needs fixing
          const needsFix =
            (content.includes("t('") && !content.includes("useLanguage")) ||
            content.match(/t\([^)]+\)[<]/);

          if (needsFix) {
            console.log(`\nFixing: ${fullPath}`);
            if (fixFile(fullPath)) {
              results.fixed++;
              results.files.push(fullPath);
            } else {
              results.failed++;
            }
          }
        } catch (error) {
          results.failed++;
        }
      }
    }
  });

  return results;
}

console.log("=========================================");
console.log("Translation Fix Script");
console.log("=========================================\n");

console.log("Scanning for translation syntax errors...\n");

const results = scanDirectory("src");

console.log("\n=========================================");
console.log("Results:");
console.log("=========================================");
console.log(`Fixed: ${results.fixed} files`);
console.log(`Failed: ${results.failed} files`);

if (results.files.length > 0) {
  console.log("\nFixed files:");
  results.files.forEach((file) => {
    console.log(`  - ${file}`);
  });
}

console.log("\nDone!");
