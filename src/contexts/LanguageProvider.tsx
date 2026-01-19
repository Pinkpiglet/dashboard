"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = string;

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

// Translation data
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    "nav.control_center": "Control Center",
    "nav.peers": "Peers",
    "nav.setup_keys": "Setup Keys",
    "nav.networks": "Networks",
    "nav.network_routes": "Network Routes",
    "nav.access_control": "Access Control",
    "nav.policies": "Policies",
    "nav.groups": "Groups",
    "nav.posture_checks": "Posture Checks",
    "nav.routes": "Routes",
    "nav.dns": "DNS",
    "nav.nameservers": "Nameservers",
    "nav.zones": "Zones",
    "nav.dns_settings": "DNS Settings",
    "nav.team": "Team",
    "nav.users": "Users",
    "nav.service_users": "Service Users",
    "nav.activity": "Activity",
    "nav.settings": "Settings",
    "nav.documentation": "Documentation",
    "nav.beta": "Beta",

    // Common actions
    "common.save_changes": "Save Changes",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.close": "Close",
    "common.confirm": "Confirm",
    "common.submit": "Submit",
    "common.update": "Update",
    "common.create": "Create",
    "common.download": "Download",
    "common.copy": "Copy",
    "common.back": "Back",
    "common.next": "Next",
    "common.yes": "Yes",
    "common.no": "No",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.delete_all": "Delete All",
    "common.select_all": "Select All",
    "common.clear": "Clear",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.refresh": "Refresh",
    "common.install": "Install",
    "common.remove": "Remove",
    "common.enable": "Enable",
    "common.disable": "Disable",
    "common.generate": "Generate",
    "common.copy_all": "Copy All",
    "common.cancel_all": "Cancel All",

    // Language
    "lang.toggle": "Switch Language",
    "lang.current": "Current Language",

    // User
    "user.profile": "Profile",
    "user.settings": "Settings",
    "user.logout": "Logout",
    "user.login": "Login",
    "user.service_user_created": "Service user created",
    "user.creating_service_user": "Creating service user...",
    "user.service_user_description":
      "Service users are non-login users that are not associated with any specific person.",
    "user.create_service_user": "Create Service User",
    "user.service_users": "Service Users",

    // Messages
    "msg.saved_successfully": "Saved successfully",
    "msg.deleted_successfully": "Deleted successfully",
    "msg.updated_successfully": "Updated successfully",
    "msg.operation_failed": "Operation failed",
    "msg.network_error": "Network error",
    "msg.unauthorized": "Unauthorized",
    "msg.loading": "Loading...",
    "msg.no_results": "No results found",
    "msg.success": "Success",
    "msg.error": "Error",
    "msg.confirm": "Are you sure?",
    "msg.confirm_delete": "Are you sure you want to delete this?",
    "msg.network_updated": "Network updated successfully.",
    "msg.updating_network": "Updating network...",
    "msg.network_created": "Network created successfully.",
    "msg.creating_network": "Creating network...",
    "msg.resource_created": "Resource created successfully.",
    "msg.creating_resource": "Creating resource...",
    "msg.resource_updated": "Resource updated successfully.",
    "msg.updating_resource": "Updating resource...",

    // Network
    "nav.add_network": "Add Network",
    "nav.update_network": "Update Network",
    "network.name": "Network Name",
    "network.description": "Description",
    "network.name_help": "Provide a unique name for the network.",
    "network.description_help": "Optional description for the network.",
    "network.description_text":
      "Access internal resources in LANs and VPC by adding a network.",
    "network.page_description":
      "Networks allow you to access internal resources in LANs and VPCs without installing NetBird on every machine.",

    // Route
    "route.page_description":
      "Network routes allow you to access other networks like LANs and VPCs without installing NetBird on every resource.",
    "route.recommendation":
      "We recommend using the new Networks concept to easier visualise and manage access to your resources.",
    "route.go_to_networks": "Go to Networks",

    // Peers
    "peers.page_description":
      "A list of all machines and devices connected to your private network. Use this view to manage peers.",
    "peers.add_device_title": "Add new device to your network",
    "peers.add_device_description":
      "To get started, install NetBird and log in using your email account. After that you should be connected.",
    "peers.check_guide": "If you have further questions check out our",
    "peers.installation_guide": "Installation Guide",

    // DNS
    "dns.nameservers_description":
      "Add nameservers for domain name resolution in your NetBird network.",
    "dns.dns_zones": "DNS Zones",
    "dns.zones_description":
      "Manage DNS zones to control domain name resolution for your network.",

    // Users
    "users.page_description":
      "Manage users and their permissions. Same-domain email users are added automatically on first sign-in.",
    "users.service_users_description":
      "Use service users to create API tokens and avoid losing automated access.",

    // Groups
    "groups.page_description":
      "Here is the overview of the groups of your organization. You can delete the unused ones.",

    // Setup Keys
    "setup_keys.page_description":
      "Setup keys are pre-authentication keys that allow to register new machines in your network.",

    // Settings
    "settings.authentication": "Authentication",
    "settings.identity_providers": "Identity Providers",
    "settings.permissions": "Permissions",
    "settings.clients": "Clients",
    "settings.danger_zone": "Danger zone",

    // Common
    "common.learn_more": "Learn more about",
    "common.in_documentation": "in our documentation.",
    "common.select": "Select",
    "common.selected": "Selected",
    "common.enabled": "Enabled",
    "common.disabled": "Disabled",
    "common.active": "Active",
    "common.inactive": "Inactive",
    "common.required": "Required",
    "common.optional": "Optional",
    "common.view": "View",
    "common.upload": "Upload",
    "common.paste": "Paste",
    "common.finish": "Finish",
    "common.reset": "Reset",
    "common.all": "All",
    "common.none": "None",

    // Control Center
    "control_center.page_title": "Control Center",
    "control_center.all_networks": "All Networks",
    "control_center.search_peers": "Search peers of user...",
    "control_center.no_peers_title": "No peers yet",
    "control_center.no_peers_description": "Add a peer to get started",
    "control_center.policies": "Policies",
    "control_center.groups": "Groups",
    "control_center.peers": "Peers",
    "control_center.networks": "Networks",
    "control_center.users": "Users",
    "control_center.view_network": "View Network",
    "control_center.select_peer": "Select Peer",
    "control_center.select_group": "Select Group",
    "control_center.select_user": "Select User",
    "control_center.go_to_peer": "Go to Peer View",
    "control_center.go_to_group": "Go to Group View",
    "control_center.go_to_user": "Go to User View",

    // Posture Checks
    "posture_checks.title": "Posture Checks",
    "posture_checks.description":
      "Use posture checks to further restrict access in your network.",
    "posture_checks.learn_more": "Learn more about",
    "posture_checks.link_text": "Posture Checks",

    // Events
    "events.audit_events": "Audit Events",
    "events.title": "Audit Events",
    "events.description": "Here you can see all the audit activity events.",
    "events.learn_more": "Learn more about ",
    "events.link_text": "Audit Events",

    // Groups
    "groups.create_title": "Create Group",
    "groups.create_description":
      "Create a group to manage and organize access in your network",
    "groups.create_button": "Create Group",
    "groups.name_label": "Name",
    "groups.name_help": "Set an easily identifiable name for your group",
    "groups.name_placeholder": "e.g., Developers",
    "groups.learn_more": "Learn more about",
    "groups.link_text": "Groups",
    "groups.created_success": "Group '%s' successfully created",
    "groups.creating": "Creating group...",

    // Access Tokens
    "access_tokens.create_title": "Create Access Token",
    "access_tokens.description":
      "Use this token to access NetBird's public API",
    "access_tokens.create_button": "Create Token",
    "access_tokens.name_label": "Name",
    "access_tokens.name_help": "Set an easily identifiable name for your token",
    "access_tokens.name_placeholder": "e.g., Infra token",
    "access_tokens.expires_label": "Expires in",
    "access_tokens.expires_help": "Should be between 1 and 365 days.",
    "access_tokens.days": "Day(s)",
    "access_tokens.learn_more": "Learn more about",
    "access_tokens.link_text": "Access Tokens",
    "access_tokens.creating": "Creating access token",
    "access_tokens.created": "%s was created successfully",
    "access_tokens.created_success_title": "Access token created successfully!",
    "access_tokens.created_success_desc":
      "This token will not be shown again, so be sure to copy it and store in a secure location.",
    "access_tokens.copied": "Access token was copied to your clipboard!",
    "access_tokens.copy_clipboard": "Copy to clipboard",
    "access_tokens.create_failed": "Setup key could not be created...",

    // Search
    "search.modal_title": "Search for Networks and Resources",
    "search.modal_subtitle": "Quickly find networks and associated resources.",
    "search.modal_hint":
      "Start typing to search by name, description or address.",
    "search.not_found_title": "Could not find any results",
    "search.not_found_desc":
      "We couldn't find any results. Please try a different search term.",

    // Users
    "users.search_placeholder": "Search by name, email or role...",
    "users.add_users_title": "Add New Users",
    "users.add_users_description":
      "It looks like you don't have any users yet. Get started by inviting users to your account.",
    "users.link_text": "Users",

    // Setup Keys
    "setup_keys.search_placeholder": "Search by name, type or group...",
    "setup_keys.no_keys_title":
      "This group is not used within any setup keys yet",
    "setup_keys.no_keys_description":
      "Assign this group when creating a new setup key to see them listed here.",
    "setup_keys.create_button": "Create Setup Key",
    "setup_keys.get_started_title": "Create Setup Key",
    "setup_keys.get_started_description":
      "Add a setup key to register new machines in your network. The key links machines to your account during initial setup.",
    "setup_keys.link_text": "Setup Keys",
  },
  zh: {
    // Navigation
    "nav.control_center": "控制中心",
    "nav.peers": "节点",
    "nav.setup_keys": "设置密钥",
    "nav.networks": "网络",
    "nav.network_routes": "网络路由",
    "nav.access_control": "访问控制",
    "nav.policies": "策略",
    "nav.groups": "分组",
    "nav.posture_checks": "姿态检查",
    "nav.routes": "路由",
    "nav.dns": "DNS",
    "nav.nameservers": "域名服务器",
    "nav.zones": "区域",
    "nav.dns_settings": "DNS 设置",
    "nav.team": "团队",
    "nav.users": "用户",
    "nav.service_users": "服务用户",
    "nav.activity": "活动",
    "nav.settings": "设置",
    "nav.documentation": "文档",
    "nav.beta": "测试版",

    // Common actions
    "common.save_changes": "保存更改",
    "common.save": "保存",
    "common.cancel": "取消",
    "common.delete": "删除",
    "common.edit": "编辑",
    "common.add": "添加",
    "common.close": "关闭",
    "common.confirm": "确认",
    "common.submit": "提交",
    "common.update": "更新",
    "common.create": "创建",
    "common.download": "下载",
    "common.copy": "复制",
    "common.back": "返回",
    "common.next": "下一步",
    "common.yes": "是",
    "common.no": "否",
    "common.loading": "加载中...",
    "common.error": "错误",
    "common.success": "成功",
    "common.delete_all": "全部删除",
    "common.select_all": "全选",
    "common.clear": "清除",
    "common.search": "搜索",
    "common.filter": "筛选",
    "common.refresh": "刷新",
    "common.install": "安装",
    "common.remove": "移除",
    "common.enable": "启用",
    "common.disable": "禁用",
    "common.generate": "生成",
    "common.copy_all": "全部复制",
    "common.cancel_all": "全部取消",

    // Language
    "lang.toggle": "切换语言",
    "lang.current": "当前语言",

    // User
    "user.profile": "个人资料",
    "user.settings": "设置",
    "user.logout": "退出登录",
    "user.login": "登录",
    "user.service_user_created": "服务用户已创建",
    "user.creating_service_user": "正在创建服务用户...",
    "user.service_user_description":
      "服务用户是不与任何特定人员关联的非登录用户。",
    "user.create_service_user": "创建服务用户",
    "user.service_users": "服务用户",

    // Messages
    "msg.saved_successfully": "保存成功",
    "msg.deleted_successfully": "删除成功",
    "msg.updated_successfully": "更新成功",
    "msg.operation_failed": "操作失败",
    "msg.network_error": "网络错误",
    "msg.unauthorized": "未授权",
    "msg.loading": "加载中...",
    "msg.no_results": "未找到结果",
    "msg.success": "成功",
    "msg.error": "错误",
    "msg.confirm": "确定吗？",
    "msg.confirm_delete": "确定要删除吗？",
    "msg.network_updated": "网络更新成功。",
    "msg.updating_network": "正在更新网络...",
    "msg.network_created": "网络创建成功。",
    "msg.creating_network": "正在创建网络...",
    "msg.resource_created": "资源创建成功。",
    "msg.creating_resource": "正在创建资源...",
    "msg.resource_updated": "资源更新成功。",
    "msg.updating_resource": "正在更新资源...",

    // Network
    "nav.add_network": "添加网络",
    "nav.update_network": "更新网络",
    "network.name": "网络名称",
    "network.description": "描述",
    "network.name_help": "为网络提供唯一名称。",
    "network.description_help": "网络的可选描述。",
    "network.description_text": "通过添加网络来访问 LAN 和 VPC 中的内部资源。",
    "network.page_description":
      "网络允许您访问 LAN 和 VPC 中的内部资源，而无需在每台机器上安装 NetBird。",

    // Route
    "route.page_description":
      "网络路由允许您访问其他网络（如 LAN 和 VPC），而无需在每个资源上安装 NetBird。",
    "route.recommendation":
      "我们建议使用新的网络概念来更轻松地可视化和管理对资源的访问。",
    "route.go_to_networks": "前往网络",

    // Peers
    "peers.page_description":
      "连接到专用网络的所有机器和设备列表。使用此视图管理节点。",
    "peers.add_device_title": "将新设备添加到您的网络",
    "peers.add_device_description":
      "首先，安装 NetBird 并使用您的电子邮件账户登录。之后您应该已连接。",
    "peers.check_guide": "如果还有其他问题，请查看我们的",
    "peers.installation_guide": "安装指南",

    // DNS
    "dns.nameservers_description":
      "添加域名服务器以进行 NetBird 网络中的域名解析。",
    "dns.dns_zones": "DNS 区域",
    "dns.zones_description": "管理 DNS 区域以控制网络的域名解析。",

    // Users
    "users.page_description":
      "管理用户及其权限。同域电子邮件用户在首次登录时自动添加。",
    "users.service_users_description":
      "使用服务用户创建 API 令牌，避免自动化访问丢失。",

    // Groups
    "groups.page_description":
      "这是您所在组织的分组概览。您可以删除未使用的分组。",

    // Setup Keys
    "setup_keys.page_description":
      "设置密钥是预身份验证密钥，允许在您的网络中注册新计算机。",

    // Settings
    "settings.authentication": "身份验证",
    "settings.identity_providers": "身份提供商",
    "settings.permissions": "权限",
    "settings.clients": "客户端",
    "settings.danger_zone": "危险区域",

    // Common
    "common.learn_more": "了解更多",
    "common.in_documentation": "，请参阅我们的文档。",
    "common.select": "选择",
    "common.selected": "已选择",
    "common.enabled": "已启用",
    "common.disabled": "已禁用",
    "common.active": "活跃",
    "common.inactive": "未活跃",
    "common.required": "必填",
    "common.optional": "可选",
    "common.view": "查看",
    "common.upload": "上传",
    "common.paste": "粘贴",
    "common.finish": "完成",
    "common.reset": "重置",
    "common.all": "全部",
    "common.none": "无",

    // Control Center
    "control_center.page_title": "控制中心",
    "control_center.all_networks": "所有网络",
    "control_center.search_peers": "搜索用户节点...",
    "control_center.no_peers_title": "暂无节点",
    "control_center.no_peers_description": "添加一个节点以开始使用",
    "control_center.policies": "策略",
    "control_center.groups": "分组",
    "control_center.peers": "节点",
    "control_center.networks": "网络",
    "control_center.users": "用户",
    "control_center.view_network": "查看网络",
    "control_center.select_peer": "选择节点",
    "control_center.select_group": "选择分组",
    "control_center.select_user": "选择用户",
    "control_center.go_to_peer": "前往节点视图",
    "control_center.go_to_group": "前往分组视图",
    "control_center.go_to_user": "前往用户视图",

    // Posture Checks
    "posture_checks.title": "姿态检查",
    "posture_checks.description": "使用姿态检查来进一步限制网络中的访问。",
    "posture_checks.learn_more": "了解更多关于",
    "posture_checks.link_text": "姿态检查",

    // Events
    "events.audit_events": "审计事件",
    "events.title": "审计事件",
    "events.description": "您可以在这里查看所有审计活动事件。",
    "events.learn_more": "了解更多关于",
    "events.link_text": "审计事件",

    // Groups
    "groups.create_title": "创建分组",
    "groups.create_description": "创建一个组来管理和组织网络中的访问",
    "groups.create_button": "创建分组",
    "groups.name_label": "名称",
    "groups.name_help": "为您的组设置一个易于识别的名称",
    "groups.name_placeholder": "例如：开发者",
    "groups.learn_more": "了解更多关于",
    "groups.link_text": "分组",
    "groups.created_success": "组 '%s' 创建成功",
    "groups.creating": "正在创建组...",

    // Access Tokens
    "access_tokens.create_title": "创建访问令牌",
    "access_tokens.description": "使用此令牌访问 NetBird 的公共 API",
    "access_tokens.create_button": "创建令牌",
    "access_tokens.name_label": "名称",
    "access_tokens.name_help": "为您的令牌设置一个易于识别的名称",
    "access_tokens.name_placeholder": "例如：基础设施令牌",
    "access_tokens.expires_label": "过期时间",
    "access_tokens.expires_help": "应在 1 到 365 天之间。",
    "access_tokens.days": "天",
    "access_tokens.learn_more": "了解更多关于",
    "access_tokens.link_text": "访问令牌",
    "access_tokens.creating": "正在创建访问令牌",
    "access_tokens.created": "%s 创建成功",
    "access_tokens.created_success_title": "访问令牌创建成功！",
    "access_tokens.created_success_desc":
      "此令牌将不再显示，请务必复制并存储在安全的位置。",
    "access_tokens.copied": "访问令牌已复制到剪贴板！",
    "access_tokens.copy_clipboard": "复制到剪贴板",
    "access_tokens.create_failed": "设置密钥无法创建...",

    // Search
    "search.modal_title": "搜索网络和资源",
    "search.modal_subtitle": "快速查找网络和关联资源。",
    "search.modal_hint": "开始输入以按名称、描述或地址搜索。",
    "search.not_found_title": "未找到任何结果",
    "search.not_found_desc": "未找到任何结果。请尝试其他搜索词。",

    // Users
    "users.search_placeholder": "按名称、电子邮件或角色搜索...",
    "users.add_users_title": "添加新用户",
    "users.add_users_description": "您还没有用户。开始邀请用户加入您的账户。",
    "users.link_text": "用户",

    // Setup Keys
    "setup_keys.search_placeholder": "按名称、类型或分组搜索...",
    "setup_keys.no_keys_title": "此分组尚未在任何设置密钥中使用",
    "setup_keys.no_keys_description":
      "创建新的设置密钥时分配此分组，以在此处查看它们。",
    "setup_keys.create_button": "创建设置密钥",
    "setup_keys.get_started_title": "创建设置密钥",
    "setup_keys.get_started_description":
      "添加设置密钥以在您的网络中注册新计算机。该密钥在初始设置期间将计算机链接到您的账户。",
    "setup_keys.link_text": "设置密钥",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("netbird-language");
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLanguage = navigator.language.split("-")[0];
      if (translations[browserLanguage]) {
        setCurrentLanguage(browserLanguage);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      localStorage.setItem("netbird-language", language);

      // Update document lang attribute
      document.documentElement.lang = language;
    }
  };

  const t = (key: string, fallback?: string): string => {
    const translation = translations[currentLanguage]?.[key];
    return translation || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
