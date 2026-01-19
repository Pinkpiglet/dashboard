#!/usr/bin/env node

/**
 * Automated translation replacement script
 * This script finds and replaces hardcoded English text with translation function calls
 */

const fs = require("fs");
const path = require("path");

const directories = ["src/components", "src/modules", "src/contexts"];

const translations = {
  // Common translations
  Save: "t('common.save', 'Save')",
  Cancel: "t('common.cancel', 'Cancel')",
  Delete: "t('common.delete', 'Delete')",
  Edit: "t('common.edit', 'Edit')",
  Add: "t('common.add', 'Add')",
  Close: "t('common.close', 'Close')",
  "Loading...": "t('common.loading', 'Loading...')",
  Error: "t('common.error', 'Error')",
  Success: "t('common.success', 'Success')",
  Confirm: "t('common.confirm', 'Confirm')",
  Search: "t('common.search', 'Search')",
  Filter: "t('common.filter', 'Filter')",
  Refresh: "t('common.refresh', 'Refresh')",
  Settings: "t('user.settings', 'Settings')",
  Logout: "t('user.logout', 'Logout')",
  Profile: "t('user.profile', 'Profile')",

  // Button patterns
  ">Cancel<": ">{t('common.cancel', 'Cancel')}<",
  ">Save<": ">{t('common.save', 'Save')}<",
  ">Delete<": ">{t('common.delete', 'Delete')}<",
  ">Edit<": ">{t('common.edit', 'Edit')}<",
  ">Add<": ">{t('common.add', 'Add')}<",
  ">Close<": ">{t('common.close', 'Close')}<",
  ">Confirm<": ">{t('common.confirm', 'Confirm')}<",
  ">Submit<": ">{t('common.submit', 'Submit')}<",
  ">Update<": ">{t('common.update', 'Update')}<",
  ">Create<": ">{t('common.create', 'Create')}<",

  // Modal patterns
  "Create ": "Create ", // Don't replace in some contexts
  'title={"Create ': "title={t('",
  'title={"Delete ': "title={t('",
  'title={"Edit ': "title={t('",

  // Notification patterns
  'title: "': 'title: t("',
  'description: "': 'description: t("',
};

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let modified = false;

    // Skip if already has useLanguage import
    if (!content.includes("useLanguage")) {
      // Add import if it has React imports
      if (
        content.includes("import React") ||
        content.includes("from 'react'")
      ) {
        const importPattern = /import React.*from 'react';/;
        if (importPattern.test(content)) {
          content = content.replace(
            importPattern,
            "$&import { useLanguage } from '@/contexts/LanguageProvider';",
          );
          modified = true;
        } else if (content.includes("import { useState")) {
          content = content.replace(
            /import { useState[^}]+}\s+from 'react';/,
            "$&, { useLanguage } from '@/contexts/LanguageProvider';",
          );
          modified = true;
        }
      }
    }

    // Replace common patterns
    Object.entries(translations).forEach(([pattern, replacement]) => {
      if (content.includes(pattern)) {
        content = content.split(pattern).join(replacement);
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      processFile(fullPath);
    }
  });
}

// Run the script
console.log("Starting automated translation replacement...");
directories.forEach((dir) => {
  console.log(`Scanning: ${dir}`);
  scanDirectory(dir);
});
console.log("Done!");
