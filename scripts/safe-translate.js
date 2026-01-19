#!/usr/bin/env node

/**
 * Safe automated translation script for common button text
 * Only replaces simple text content, not code or JSX attributes
 */

const fs = require("fs");
const path = require("path");

const replacements = [
  // Simple text replacements for button and common UI text
  {
    from: /(?<![\w>"'])>Save Changes(?=<)/g,
    to: ">{t('common.save_changes', 'Save Changes')}<",
  },
  { from: /(?<![\w>"'])>Save(?=<)/g, to: ">{t('common.save', 'Save')}<" },
  { from: /(?<![\w>"'])>Cancel(?=<)/g, to: ">{t('common.cancel', 'Cancel')}<" },
  { from: /(?<![\w>"'])>Delete(?=<)/g, to: ">{t('common.delete', 'Delete')}<" },
  { from: /(?<![\w>"'])>Edit(?=<)/g, to: ">{t('common.edit', 'Edit')}<" },
  { from: /(?<![\w>"'])>Add(?=<)/g, to: ">{t('common.add', 'Add')}<" },
  { from: /(?<![\w>"'])>Close(?=<)/g, to: ">{t('common.close', 'Close')}<" },
  {
    from: /(?<![\w>"'])>Confirm(?=<)/g,
    to: ">{t('common.confirm', 'Confirm')}<",
  },
  { from: /(?<![\w>"'])>Submit(?=<)/g, to: ">{t('common.submit', 'Submit')}<" },
  { from: /(?<![\w>"'])>Update(?=<)/g, to: ">{t('common.update', 'Update')}<" },
  { from: /(?<![\w>"'])>Create(?=<)/g, to: ">{t('common.create', 'Create')}<" },
  {
    from: /(?<![\w>"'])>Download(?=<)/g,
    to: ">{t('common.download', 'Download')}<",
  },
  { from: /(?<![\w>"'])>Copy(?=<)/g, to: ">{t('common.copy', 'Copy')}<" },
  { from: /(?<![\w>"'])>Back(?=<)/g, to: ">{t('common.back', 'Back')}<" },
  { from: /(?<![\w>"'])>Next(?=<)/g, to: ">{t('common.next', 'Next')}<" },
  { from: /(?<![\w>"'])>Yes(?=<)/g, to: ">{t('common.yes', 'Yes')}<" },
  { from: /(?<![\w>"'])>No(?=<)/g, to: ">{t('common.no', 'No')}<" },
  {
    from: /(?<![\w>"'])>Loading...(?=<)/g,
    to: ">{t('common.loading', 'Loading...')}<",
  },
  {
    from: /(?<![\w>"'])>Loading(?=<)/g,
    to: ">{t('common.loading', 'Loading')}<",
  },
  { from: /(?<![\w>"'])>Error(?=<)/g, to: ">{t('common.error', 'Error')}<" },
  {
    from: /(?<![\w>"'])>Success(?=<)/g,
    to: ">{t('common.success', 'Success')}<",
  },
  {
    from: /(?<![\w>"'])>Delete All(?=<)/g,
    to: ">{t('common.delete_all', 'Delete All')}<",
  },
  {
    from: /(?<![\w>"'])>Select All(?=<)/g,
    to: ">{t('common.select_all', 'Select All')}<",
  },
  { from: /(?<![\w>"'])>Clear(?=<)/g, to: ">{t('common.clear', 'Clear')}<" },
  { from: /(?<![\w>"'])>Search(?=<)/g, to: ">{t('common.search', 'Search')}<" },
  { from: /(?<![\w>"'])>Filter(?=<)/g, to: ">{t('common.filter', 'Filter')}<" },
  {
    from: /(?<![\w>"'])>Refresh(?=<)/g,
    to: ">{t('common.refresh', 'Refresh')}<",
  },
  {
    from: /(?<![\w>"'])>Install(?=<)/g,
    to: ">{t('common.install', 'Install')}<",
  },
  { from: /(?<![\w>"'])>Remove(?=<)/g, to: ">{t('common.remove', 'Remove')}<" },
  { from: /(?<![\w>"'])>Enable(?=<)/g, to: ">{t('common.enable', 'Enable')}<" },
  {
    from: /(?<![\w>"'])>Disable(?=<)/g,
    to: ">{t('common.disable', 'Disable')}<",
  },
  {
    from: /(?<![\w>"'])>Generate(?=<)/g,
    to: ">{t('common.generate', 'Generate')}<",
  },
  {
    from: /(?<![\w>"'])>Copy All(?=<)/g,
    to: ">{t('common.copy_all', 'Copy All')}<",
  },
  {
    from: /(?<![\w>"'])>Cancel All(?=<)/g,
    to: ">{t('common.cancel_all', 'Cancel All')}<",
  },
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let originalContent = content;

    // Skip if already has useLanguage import
    if (!content.includes("useLanguage")) {
      // Add import after React imports
      if (content.includes("from 'react'")) {
        content = content.replace(
          /from ['"]react['"];(\s*)/,
          `from ['"]react['"];$1import { useLanguage } from '@/contexts/LanguageProvider';$1`,
        );
      }
    }

    // Apply replacements
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });

    // Also replace simple text nodes that are NOT in JSX attributes
    // Pattern: text between tags that's not part of attributes
    const textPatterns = [
      {
        pattern: />Control Center</g,
        replace: '>{t("nav.control_center", "Control Center")}<',
      },
      { pattern: />Peers</g, replace: '>{t("nav.peers", "Peers")}<' },
      {
        pattern: />Setup Keys</g,
        replace: '>{t("nav.setup_keys", "Setup Keys")}<',
      },
      { pattern: />Networks</g, replace: '>{t("nav.networks", "Networks")}<' },
      {
        pattern: />Network Routes</g,
        replace: '>{t("nav.network_routes", "Network Routes")}<',
      },
      {
        pattern: />Access Control</g,
        replace: '>{t("nav.access_control", "Access Control")}<',
      },
      { pattern: />Policies</g, replace: '>{t("nav.policies", "Policies")}<' },
      { pattern: />Groups</g, replace: '>{t("nav.groups", "Groups")}<' },
      {
        pattern: />Posture Checks</g,
        replace: '>{t("nav.posture_checks", "Posture Checks")}<',
      },
      { pattern: />DNS</g, replace: '>{t("nav.dns", "DNS")}<' },
      {
        pattern: />Nameservers</g,
        replace: '>{t("nav.nameservers", "Nameservers")}<',
      },
      { pattern: />Zones</g, replace: '>{t("nav.zones", "Zones")}<' },
      {
        pattern: />DNS Settings</g,
        replace: '>{t("nav.dns_settings", "DNS Settings")}<',
      },
      { pattern: />Team</g, replace: '>{t("nav.team", "Team")}<' },
      { pattern: />Users</g, replace: '>{t("nav.users", "Users")}<' },
      {
        pattern: />Service Users</g,
        replace: '>{t("nav.service_users", "Service Users")}<',
      },
      { pattern: />Activity</g, replace: '>{t("nav.activity", "Activity")}<' },
      { pattern: />Settings</g, replace: '>{t("nav.settings", "Settings")}<' },
      {
        pattern: />Documentation</g,
        replace: '>{t("nav.documentation", "Documentation")}<',
      },
      { pattern: />Beta</g, replace: '>{t("nav.beta", "Beta")}<' },
    ];

    textPatterns.forEach(({ pattern, replace }) => {
      content = content.replace(pattern, replace);
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    // Skip files with errors
    return false;
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and .git
      if (file !== "node_modules" && file !== ".git" && file !== ".next") {
        scanDirectory(fullPath);
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      // Skip certain files
      if (!file.includes(".test.") && !file.includes(".spec.")) {
        processFile(fullPath);
      }
    }
  });
}

console.log("Starting safe translation replacement...");
scanDirectory("src");
console.log("Done!");
