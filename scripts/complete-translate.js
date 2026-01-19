#!/usr/bin/env node

/**
 * Complete page translation script
 * Adds useLanguage import and translates common UI elements
 */

const fs = require("fs");
const path = require("path");

const translations = {
  // Button and action text
  "Save Changes": "t('common.save_changes', 'Save Changes')",
  Save: "t('common.save', 'Save')",
  Cancel: "t('common.cancel', 'Cancel')",
  Delete: "t('common.delete', 'Delete')",
  Edit: "t('common.edit', 'Edit')",
  Add: "t('common.add', 'Add')",
  Close: "t('common.close', 'Close')",
  Confirm: "t('common.confirm', 'Confirm')",
  Submit: "t('common.submit', 'Submit')",
  Update: "t('common.update', 'Update')",
  Create: "t('common.create', 'Create')",
  Download: "t('common.download', 'Download')",
  Copy: "t('common.copy', 'Copy')",
  Back: "t('common.back', 'Back')",
  Next: "t('common.next', 'Next')",
  Yes: "t('common.yes', 'Yes')",
  No: "t('common.no', 'No')",
  "Loading...": "t('common.loading', 'Loading...')",
  Loading: "t('common.loading', 'Loading')",
  Error: "t('common.error', 'Error')",
  Success: "t('common.success', 'Success')",
  "Delete All": "t('common.delete_all', 'Delete All')",
  "Select All": "t('common.select_all', 'Select All')",
  Clear: "t('common.clear', 'Clear')",
  Search: "t('common.search', 'Search')",
  Filter: "t('common.filter', 'Filter')",
  Refresh: "t('common.refresh', 'Refresh')",
  Install: "t('common.install', 'Install')",
  Remove: "t('common.remove', 'Remove')",
  Enable: "t('common.enable', 'Enable')",
  Disable: "t('common.disable', 'Disable')",
  Generate: "t('common.generate', 'Generate')",

  // Table headers and common UI
  Name: "t('common.name', 'Name')",
  Role: "t('common.role', 'Role')",
  Status: "t('common.status', 'Status')",
  Email: "t('common.email', 'Email')",
  ID: "t('common.id', 'ID')",
  Date: "t('common.date', 'Date')",
  Time: "t('common.time', 'Time')",
  Description: "t('common.description', 'Description')",
  Action: "t('common.action', 'Action')",
  Actions: "t('common.actions', 'Actions')",
  Type: "t('common.type', 'Type')",
  Value: "t('common.value', 'Value')",
  Enabled: "t('common.enabled', 'Enabled')",
  Disabled: "t('common.disabled', 'Disabled')",
  Active: "t('common.active', 'Active')",
  Inactive: "t('common.inactive', 'Inactive')",
  Required: "t('common.required', 'Required')",
  Optional: "t('common.optional', 'Optional')",
  All: "t('common.all', 'All')",
  None: "t('common.none', 'None')",
  Select: "t('common.select', 'Select')",
  Selected: "t('common.selected', 'Selected')",
  Pending: "t('common.pending', 'Pending')",
  Approved: "t('common.approved', 'Approved')",
  Rejected: "t('common.rejected', 'Rejected')",
  "Block User": "t('user.block_user', 'Block User')",
  "Unblock User": "t('user.unblock_user', 'Unblock User')",
  "Last Login": "t('user.last_login', 'Last Login')",
  "Last login on": "t('user.last_login_on', 'Last login on')",
  Block: "t('common.block', 'Block')",
  Unblock: "t('common.unblock', 'Unblock')",
  "Invite User": "t('user.invite_user', 'Invite User')",
  Invite: "t('common.invite', 'Invite')",
  Approve: "t('common.approve', 'Approve')",
  Reject: "t('common.reject', 'Reject')",

  // Page specific
  "Manage users and their permissions.":
    "t('user.manage_permissions', 'Manage users and their permissions.')",
  "Same-domain email users are added automatically on first sign-in.":
    "t('user.auto_add_description', 'Same-domain email users are added automatically on first sign-in.')",
  "Learn more about": "t('common.learn_more', 'Learn more about')",
  Users: "t('nav.users', 'Users')",
  Team: "t('nav.team', 'Team')",
  "in our documentation.":
    "t('common.in_documentation', 'in our documentation.')",
};

function addImport(content) {
  // Already has useLanguage
  if (content.includes("useLanguage")) return content;

  // Add import after React import
  if (content.includes("from 'react'")) {
    content = content.replace(
      /(['"])react['"];(\s*)/,
      `$1react['"];$2import { useLanguage } from '@/contexts/LanguageProvider';$2`,
    );
  }

  return content;
}

function translateContent(content) {
  let translated = content;

  // Replace text in JSX (simple pattern)
  Object.entries(translations).forEach(([english, translation]) => {
    // Only replace if not already translated
    if (!translated.includes(translation.split("'")[1])) {
      // Replace text content (not in attributes)
      const pattern = new RegExp(`>([^<]*)${english}([^>]*)<`, "g");
      translated = translated.replace(pattern, `>$1${translation}$2<`);
    }
  });

  return translated;
}

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let originalContent = content;

    // Add import
    content = addImport(content);

    // Translate content
    content = translateContent(content);

    // Add t() usage in component
    if (
      content.includes("useLanguage") &&
      !content.includes("const { t } = useLanguage()")
    ) {
      // Find the component function and add t usage
      content = content.replace(
        /(export default function \w+\([^)]*\)\s*\{)/,
        `$1\n  const { t } = useLanguage();`,
      );
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`Updated: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
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
      if (
        file !== "node_modules" &&
        file !== ".git" &&
        file !== ".next" &&
        file !== "scripts"
      ) {
        scanDirectory(fullPath);
      }
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      // Skip test files and this script
      if (
        !file.includes(".test.") &&
        !file.includes(".spec.") &&
        file !== "complete-translate.js"
      ) {
        processFile(fullPath);
      }
    }
  });
}

console.log("Starting complete translation...");
scanDirectory("src");
console.log("Done!");
