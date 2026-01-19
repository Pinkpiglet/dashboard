#!/usr/bin/env node

/**
 * Batch check and fix translation syntax errors
 */

const fs = require("fs");
const path = require("path");

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    const errors = [];

    // Check for syntax issues
    for (let i = 0; i < lines.length; i++) {
      const lineNum = i + 1;
      const line = lines[i];

      // Check for patterns like t('...', '...')<
      if (line.includes("t('") && line.trimEnd().endsWith("<")) {
        errors.push({
          line: lineNum,
          type: "extra < character",
          content: line.trim(),
        });
      }

      // Check if useLanguage is imported but t is not used
      if (
        content.includes("useLanguage") &&
        !content.includes("const { t } = useLanguage()") &&
        !content.includes("const { t } = useLanguage;")
      ) {
        // Check if t is used but not defined
        const tUsages = content.match(/t\(/g);
        if (tUsages && !content.includes("useLanguage")) {
          errors.push({
            line: 0,
            type: "missing useLanguage import",
            content: "File uses t() but does not import useLanguage",
          });
        }
      }
    }

    if (errors.length > 0) {
      return { hasErrors: true, errors, filePath };
    }

    return { hasErrors: false, filePath };
  } catch (error) {
    return { hasErrors: false, filePath, error: error.message };
  }
}

function scanDirectory(dir) {
  const results = [];

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
        results.push(...scanDirectory(fullPath));
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      if (!file.includes(".test.") && !file.includes(".spec.")) {
        const result = checkFile(fullPath);
        if (result.hasErrors) {
          results.push(result);
        }
      }
    }
  });

  return results;
}

console.log("Checking for translation syntax errors...\n");
const errors = scanDirectory("src");

if (errors.length > 0) {
  console.log(`Found ${errors.length} files with errors:\n`);

  errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error.filePath}`);
    if (error.errors) {
      error.errors.forEach((e) => {
        console.log(`   Line ${e.line}: ${e.type}`);
        console.log(`   Content: ${e.content.substring(0, 100)}...`);
      });
    }
    console.log("");
  });

  console.log("\nPlease fix these files manually.");
} else {
  console.log("No translation syntax errors found!");
}
