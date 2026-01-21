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

    // Users
    "users.invite_user": "Invite User",
    "users.create_user": "Create User",
    "users.invite_description":
      "Invite a user to your network and set their permissions.",
    "users.create_description":
      "Create a NetBird user account with email and password.",
    "users.name_placeholder": "John Doe",
    "users.email_placeholder": "hello@netbird.io",
    "users.auto_groups_label": "Auto-assigned groups",
    "users.auto_groups_help":
      "Groups will be assigned to peers added by this user.",
    "users.send_invitation": "Send Invitation",
    "users.resend_invite_title": "Resend Invite",
    "users.resend_invite_desc": "The invitation is being sent to %s",
    "users.sending_invite": "Sending invitation...",
    "users.sending": "Sending...",
    "users.resend_invite": "Resend Invite",
    "users.invitation_title": "User Invitation",
    "users.invitation_desc": "%s was invited to join your network.",

    // Users Table Columns
    "users.col_name": "Name",
    "users.col_role": "Role",
    "users.col_status": "Status",
    "users.col_groups": "Groups",
    "users.col_block_user": "Block User",
    "users.col_last_login": "Last Login",
    "users.last_login_on": "Last login on",

    // Setup Keys Table Columns
    "setup_keys.col_name": "Name & Key",
    "setup_keys.col_usage": "Usage",
    "setup_keys.col_last_used": "Last used",
    "setup_keys.last_used_on": "Last used on",
    "setup_keys.col_groups": "Groups",
    "setup_keys.col_expires": "Expires",

    // Peers Table
    "peers.col_name": "Name",
    "peers.col_address": "Address",
    "peers.col_groups": "Groups",
    "peers.col_last_seen": "Last seen",
    "peers.col_os": "OS",
    "peers.col_serial": "Serial number",
    "peers.col_version": "Version",
    "peers.online": "Online",
    "peers.offline": "Offline",
    "peers.browser_peers_tooltip":
      "Show temporary peers created by the NetBird browser client. These peers are ephemeral and will be deleted automatically after a short period of time.",
    "users.pending_approvals": "Pending Approvals",

    // Networks Table
    "networks.col_network": "Network",
    "networks.col_resources": "Resources",
    "networks.col_policies": "Policies",
    "networks.col_routing_peers": "Routing Peers",

    // Groups Table
    "groups.col_name": "Name",
    "groups.col_peers": "Peers",
    "groups.col_users": "Users",
    "groups.col_resources": "Resources",
    "groups.col_routes": "Routes",
    "groups.col_policies": "Policies",
    "groups.col_access_control": "Access Control",
    "groups.col_in_use": "In Use",

    // Access Control Table
    "access_control.col_name": "Name",
    "access_control.col_active": "Active",
    "access_control.col_sources": "Sources",
    "access_control.col_direction": "Direction",
    "access_control.col_destinations": "Destinations",
    "access_control.col_protocol": "Protocol",
    "access_control.col_ports": "Ports",
    "access_control.col_posture_checks": "Posture Checks",

    // Peers
    "peers.search_placeholder": "Search by name, IP, owner or group...",

    // Peers Get Started
    "peers.get_started_title": "Get Started with NetBird",
    "peers.get_started_description":
      "It looks like you don't have any connected machines.\nGet started by adding one to your network.",
    "peers.getting_started_guide": "Getting Started Guide",

    // User Status
    "users.status_pending_approval": "Pending Approval",
    "users.status_blocked": "Blocked",
    "users.status_pending": "Pending",
    "users.status_active": "Active",
    "users.approval_required_tooltip":
      "This user needs to be approved by an administrator before it can join your organization.",
    "users.disable_approval_hint":
      "If you want to disable approval for new users, go to ",
    "users.disable_approval_and": "and disable ",
    "users.user_approval": "User Approval",

    // Setup Keys
    "setup_keys.created_success_title": "Setup key created successfully!",
    "setup_keys.created_success_desc":
      "This key will not be shown again, so be sure to copy it and store in a secure location.",
    "setup_keys.copied": "Setup-Key was copied to your clipboard!",
    "setup_keys.create_failed": "Setup key could not be created...",
    "setup_keys.close": "Close",
    "setup_keys.install_netbird": "Install NetBird",
    "setup_keys.unlimited": "Unlimited",
    "setup_keys.creating_title": "Create Setup Key",
    "setup_keys.creating_desc":
      "Setup key created successfully. You can now enroll peers with your new key.",
    "setup_keys.creating": "Creating your setup key...",
    "setup_keys.create_title": "Create New Setup Key",
    "setup_keys.create_description":
      "Use this key to register new machines in your network",
    "setup_keys.name_label": "Name",
    "setup_keys.name_help": "Set an easily identifiable name for your key",
    "setup_keys.name_placeholder": "e.g., AWS Servers",
    "setup_keys.reusable": "Make this key reusable",
    "setup_keys.reusable_help": "Use this type to enroll multiple peers",
    "setup_keys.usage_limit_label": "Usage limit",
    "setup_keys.usage_limit_help":
      "For example, set to 30 if you want to enroll 30 peers",
    "setup_keys.peers": "Peer(s)",
    "setup_keys.expires_label": "Expires in",
    "setup_keys.expires_help":
      "Days until the key expires. Leave empty for no expiration.",
    "setup_keys.days": "Day(s)",
    "setup_keys.ephemeral_peers": "Ephemeral Peers",
    "setup_keys.ephemeral_help":
      "Peers that are offline for over 10 minutes will be removed automatically",
    "setup_keys.allow_dns_labels": "Allow Extra DNS Labels",
    "setup_keys.allow_dns_labels_help":
      "Enable multiple subdomain labels when enrolling peers (e.g., host.dev.example.com).",
    "setup_keys.auto_groups_label": "Auto-assigned groups",
    "setup_keys.auto_groups_help":
      "These groups will be automatically assigned to peers enrolled with this key",

    // Groups
    "groups.name_exists_error":
      "This group already exists. Please choose another name.",
    "groups.rename_title": "Rename Group",
    "groups.rename_description":
      "Set an easily identifiable name for your group.",

    // Peers
    "peers.add_peer": "Add Peer",

    // Setup Modal
    "setup.greeting_name": "there",
    "setup.greeting": "Hello %s! 👋",
    "setup.add_first_device": "It's time to add your first device.",
    "setup.install_with_key": "Install NetBird with Setup Key",
    "setup.install_title": "Install NetBird",
    "setup.install_with_key_desc":
      "To get started, install and run NetBird with the setup key as a parameter.",
    "setup.install_desc":
      "To get started, install NetBird and log in with your email account.",
    "setup.os_linux": "Linux",
    "setup.os_windows": "Windows",
    "setup.os_macos": "macOS",
    "setup.os_ios": "iOS",
    "setup.os_android": "Android",
    "setup.os_docker": "Docker",
    "setup.after_install":
      "After that you should be connected. Add more devices to your network or manage your existing devices in the admin panel. If you have further questions check out our ",
    "setup.installation_guide": "Installation Guide",
    "setup.key_usage_limit":
      "This setup key can be used only once within the next 24 hours.",
    "setup.key_expired": "When expired, the same key can not be used again.",

    // Service Users
    "service_users.create_title": "Create Service User",
    "service_users.description":
      "Service users are non-login users that are not associated with any specific person.",
    "service_users.created_title": "Service user created",
    "service_users.created_desc": "%s was successfully created.",
    "service_users.creating": "Creating service user...",
    "service_users.name_placeholder": "John Doe",
    "service_users.link_text": "Service Users",
    "service_users.create_button": "Create Service User",

    // Common
    "common.unknown": "Unknown",
    "common.system": "System",
    "common.netbird": "NetBird",

    // Route
    "route.create_new": "Create New Route",
    "route.set_up_exit_node": "Set Up Exit Node",
    "route.add_exit_node": "Add Exit Node",
    "route.add_route": "Add Route",
    "route.type": "Route Type",
    "route.type_help":
      "Select your route type to add either a network range or a list of domains.",
    "route.network_range": "Network Range",
    "route.domains": "Domains",
    "route.network_range_help": "Add a private IPv4 address range",
    "route.domains_help":
      "Add domains that dynamically resolve to one or more IPv4 addresses. A maximum of 32 domains can be added.",
    "route.add_domain": "Add Domain",
    "route.keep_routes": "Keep Routes",
    "route.keep_routes_help":
      "Retain previously resolved routes after IP address updates to maintain stable connections.",
    "route.routing_peer": "Routing Peer",
    "route.peer_group": "Peer Group",
    "route.routing_peer_help":
      "Assign a single peer as a routing peer for the {type}.",
    "route.peer_group_help":
      "Assign a peer group with machines to be used as {type}.",
    "route.exit_node": " exit node.",
    "route.network_route": " network route.",
    "route.exit_nodes": " exit nodes.",
    "route.routing_peers": " routing peers.",
    "route.distribution_groups": "Distribution Groups",
    "route.distribution_groups_help_exit":
      "{action} internet traffic through {peer} for the following groups",
    "route.route_all_traffic_peer":
      "Route all internet traffic through this peer for the following groups",
    "route.route_all_traffic_peers":
      "Route all internet traffic through the peer(s) for the following groups",
    "route.advertise_route":
      "Advertise this route to peers that belong to the following groups",
    "route.access_control_groups": "Access Control Groups (optional)",
    "route.access_control_groups_help":
      "These groups allow you to limit access to this route. Simply use these groups as a destination when creating access policies.",
    "route.network_identifier": "Network Identifier",
    "route.network_identifier_help":
      "Add a unique network identifier that is assigned to each device.",
    "route.description_optional": "Description (optional)",
    "route.description_help":
      "Write a short description to add more context to this route.",
    "route.enable_route": "Enable Route",
    "route.enable_route_help":
      "Use this switch to enable or disable the route.",
    "route.auto_apply_route": "Auto Apply Route",
    "route.auto_apply_route_help":
      "Automatically apply this exit node to your distribution groups. This requires NetBird client v0.55.0 or higher.",
    "route.metric": "Metric",
    "route.metric_help": "A lower metric indicates higher priority routes.",
    "route.cidr_error": "Please enter a valid CIDR, e.g., 192.168.1.0/24",
    "route.identifier_error":
      "Network Identifier must be less than 40 characters",
    "route.metric_error": "Metric must be between 1 and 9999",
    "route.create_policy_title":
      "Do you want to create a new access control policy for the route '{network}'?",
    "route.create_policy_desc":
      "You have one or more access control groups added to this route. These groups allow you to limit access to this route by using them in access policies.",
    "route.create_policy": "Create Policy",
    "route.later": "Later",
    "route.access_lans_vpc": "Access LANs and VPC by adding a network route.",
    "route.name_description": "Name & Description",
    "route.additional_settings": "Additional Settings",
    "route.continue": "Continue",
    "route.name_and_description": "Name & Description",

    // Nameservers
    "nameservers.search_placeholder":
      "Search by name, domains or nameservers...",
    "nameservers.add_nameserver": "Add Nameserver",
    "nameservers.create_nameserver": "Create Nameserver",
    "nameservers.no_nameservers":
      "It looks like you don't have any nameservers. Get started by adding one to your network. Select a predefined or add your custom nameservers.",
    "nameservers.enabled": "Enabled",
    "nameservers.all": "All",
    "nameservers.active": "Active",
    "nameservers.inactive": "Inactive",
    "nameservers.col_name": "Name",
    "nameservers.col_active": "Active",
    "nameservers.col_match_domains": "Match Domains",
    "nameservers.col_nameservers": "Nameservers",
    "nameservers.col_distribution_groups": "Distribution Groups",
    "nameservers.group_not_used":
      "This group is not used within any nameservers yet",
    "nameservers.group_not_used_desc":
      "Assign this group as a distribution group in your nameservers to see them listed here.",
    "nameservers.learn_more_dns": "Learn more about DNS",

    // DNS Zones
    "dns_zones.search_placeholder": "Search by domain, ip, content or group...",
    "dns_zones.add_zone": "Add Zone",
    "dns_zones.create_new_zone": "Create New Zone",
    "dns_zones.no_zones":
      "It looks like you don't have any zones. Control domain name resolution for your network by adding a zone.",
    "dns_zones.col_zone": "Zone",
    "dns_zones.col_records": "Records",
    "dns_zones.col_search_domain": "Search Domain",
    "dns_zones.group_not_used": "This group is not used within any zones yet",
    "dns_zones.group_not_used_desc":
      "Assign this group as a distribution group in your zones to see them listed here.",
    "dns_zones.learn_more_zones": "Learn more about DNS Zones",

    // Settings - Clients
    "settings.clients_title": "Clients",
    "settings.automatic_updates": "Automatic Updates",
    "settings.automatic_updates_help":
      "Select how NetBird clients handle automatic updates by choosing the latest version, a custom version, or disabling updates altogether.",
    "settings.disabled": "Disabled",
    "settings.latest_version": "Latest Version",
    "settings.custom_version": "Custom Version",
    "settings.experimental": "Experimental",
    "settings.lazy_connections": "Lazy Connections",
    "settings.lazy_connections_desc":
      "Lazy connections are an experimental feature. Functionality and behavior may evolve. Instead of maintaining always-on connections, NetBird activates them on-demand based on activity or signaling.",
    "settings.enable_lazy_connections": "Enable Lazy Connections",
    "settings.enable_lazy_connections_help":
      "Allow to establish connections between peers only when required. This requires NetBird client v0.45 or higher. Changes will only take effect after restarting the clients.",
    "settings.updating_client_settings": "Updating client settings...",
    "settings.client_settings": "Client Settings",
    "settings.client_updated": "Client settings successfully updated.",
    "settings.updating_lazy_connections":
      "Updating Lazy Connections setting...",
    "settings.lazy_enabled": "Lazy Connections successfully enabled.",
    "settings.lazy_disabled": "Lazy Connections successfully disabled.",
    "settings.version_placeholder": "e.g., 0.52.2",
    "settings.version_error":
      "Please enter a valid version, e.g., 0.2, 0.2.0, 0.2.0.1",

    // Settings - Identity Providers
    "settings.idp_title": "Identity Providers",
    "settings.idp_description":
      "Configure identity providers for user authentication in your network.",
    "settings.add_idp": "Add Identity Provider",
    "settings.search_idp": "Search by name or type...",
    "settings.no_idp":
      "Configure an identity provider to enable SSO authentication for your users.",
    "settings.idp_name": "Name",
    "settings.idp_type": "Type",
    "settings.delete_idp": "Delete Identity Provider",
    "settings.delete_idp_confirm":
      "Are you sure you want to delete this identity provider? This action cannot be undone.",
    "settings.deleting_idp": "Deleting identity provider...",
    "settings.idp_deleted": "Identity provider was deleted successfully.",
    "settings.edit": "Edit",

    // Posture Checks
    "posture_checks.search_placeholder": "Search by name or check...",
    "posture_checks.add_check": "Add Check",
    "posture_checks.create_check": "Create Check",
    "posture_checks.no_checks":
      "It looks like you don't have any posture checks. Get started by adding one to create rules for peer compliance.",
    "posture_checks.learn_more_checks": "Learn more about Posture Checks",
    "posture_checks.col_name": "Name",
    "posture_checks.col_checks": "Checks",
    "posture_checks.col_policy_usage": "Policy Usage",
    "posture_checks.col_location": "Location",

    // Access Control
    "access_control.search_placeholder":
      "Search by name, source, destination...",
    "access_control.add_policy": "Add Policy",
    "access_control.create_policy": "Create Policy",
    "access_control.no_policies":
      "It looks like you don't have any policies. Get started by creating one to manage network access.",
    "access_control.learn_more_policies": "Learn more about Access Control",
    "access_control.enabled": "Enabled",
    "access_control.all": "All",
    "access_control.group_not_used":
      "This group is not used within any policies yet",
    "access_control.group_not_used_desc":
      "Assign this group as a source or destination in your policies to see them listed here.",

    // Groups Detail
    "groups.detail_users": "Users",
    "groups.detail_peers": "Peers",
    "groups.detail_resources": "Resources",
    "groups.detail_routes": "Routes",
    "groups.detail_policies": "Policies",
    "groups.detail_access_control": "Access Control",

    // Activity / Events
    "activity.search_placeholder": "Search by action, email or IP...",
    "activity.col_action": "Action",
    "activity.col_actor": "Actor",
    "activity.col_target": "Target",
    "activity.col_date": "Date",
    "activity.col_code": "Code",
    "activity.no_events": "No events to display",
    "activity.loading_events": "Loading events...",
    "activity.failed_load": "Failed to load events",
    "activity.retry": "Retry",
    "activity.canceled": "Canceled",
    "activity.completed": "Completed",
    "activity.failed": "Failed",
    "activity.success": "Success",
    "activity.external": "External",
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

    // Peers
    "peers.online": "在线",
    "peers.offline": "离线",
    "peers.browser_peers_tooltip":
      "显示由 NetBird 浏览器客户端创建的临时节点。这些节点是临时的，将在短时间后自动删除。",
    "users.pending_approvals": "待批准",

    // Groups
    "groups.search_placeholder": "按名称搜索分组...",
    "groups.used": "已使用",
    "groups.unused": "未使用",
    "groups.users_count": "用户",
    "groups.peers_count": "节点",
    "groups.policies_one": "策略",
    "groups.policies_many": "策略",
    "groups.resources_count": "网络资源",
    "groups.routes_count": "网络路由",
    "groups.nameservers_count": "域名服务器",
    "groups.zones_count": "区域",
    "groups.setup_keys_count": "设置密钥",

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
    "route.create_new": "创建新路由",
    "route.set_up_exit_node": "设置退出节点",
    "route.add_exit_node": "添加退出节点",
    "route.add_route": "添加路由",
    "route.type": "路由类型",
    "route.type_help": "选择您的路由类型，添加网络范围或域名列表。",
    "route.network_range": "网络范围",
    "route.domains": "域名",
    "route.network_range_help": "添加私有 IPv4 地址范围",
    "route.domains_help":
      "添加动态解析到一个或多个 IPv4 地址的域名。最多可添加 32 个域名。",
    "route.add_domain": "添加域名",
    "route.keep_routes": "保留路由",
    "route.keep_routes_help":
      "在 IP 地址更新后保留之前解析的路由，以保持连接稳定。",
    "route.routing_peer": "路由节点",
    "route.peer_group": "节点分组",
    "route.routing_peer_help": "为 {type} 分配单个节点作为路由节点。",
    "route.peer_group_help": "分配包含机器的节点分组作为 {type}。",
    "route.exit_node": "退出节点。",
    "route.network_route": "网络路由。",
    "route.exit_nodes": "退出节点。",
    "route.routing_peers": "路由节点。",
    "route.distribution_groups": "分发分组",
    "route.distribution_groups_help_exit":
      "{action} 以下分组的 {peer} 互联网流量",
    "route.route_all_traffic_peer": "通过此节点路由以下分组的互联网流量",
    "route.route_all_traffic_peers": "通过节点路由以下分组的互联网流量",
    "route.advertise_route": "向属于以下分组的节点通告此路由",
    "route.access_control_groups": "访问控制分组（可选）",
    "route.access_control_groups_help":
      "这些分组允许您限制对此路由的访问。只需在创建访问策略时将这些分组用作目标。",
    "route.network_identifier": "网络标识符",
    "route.network_identifier_help": "添加分配给每个设备的唯一网络标识符。",
    "route.description_optional": "描述（可选）",
    "route.description_help": "写一个简短的描述来为该路由添加更多上下文。",
    "route.enable_route": "启用路由",
    "route.enable_route_help": "使用此开关启用或禁用路由。",
    "route.auto_apply_route": "自动应用路由",
    "route.auto_apply_route_help":
      "自动将此退出节点应用到您的分发分组。这需要 NetBird 客户端 v0.55.0 或更高版本。",
    "route.metric": "度量值",
    "route.metric_help": "较低的度量值表示优先级较高的路由。",
    "route.cidr_error": "请输入有效的 CIDR，例如 192.168.1.0/24",
    "route.identifier_error": "网络标识符必须少于 40 个字符",
    "route.metric_error": "度量值必须在 1 到 9999 之间",
    "route.create_policy_title":
      "您要为路由 '{network}' 创建新的访问控制策略吗？",
    "route.create_policy_desc":
      "您已向此路由添加了一个或多个访问控制分组。这些分组允许您通过在访问策略中使用它们来限制对此路由的访问。",
    "route.create_policy": "创建策略",
    "route.later": "稍后",
    "route.access_lans_vpc": "通过添加网络路由访问 LAN 和 VPC。",
    "route.name_description": "名称和描述",
    "route.additional_settings": "其他设置",
    "route.continue": "继续",
    "route.name_and_description": "名称和描述",

    // Nameservers
    "nameservers.search_placeholder": "按名称、域名或域名服务器搜索...",
    "nameservers.add_nameserver": "添加域名服务器",
    "nameservers.create_nameserver": "创建域名服务器",
    "nameservers.no_nameservers":
      "您还没有域名服务器。通过添加一个来开始使用。选择预定义的或添加自定义域名服务器。",
    "nameservers.enabled": "已启用",
    "nameservers.all": "全部",
    "nameservers.active": "活跃",
    "nameservers.inactive": "未活跃",
    "nameservers.col_name": "名称",
    "nameservers.col_active": "活跃",
    "nameservers.col_match_domains": "匹配域名",
    "nameservers.col_nameservers": "域名服务器",
    "nameservers.col_distribution_groups": "分发分组",
    "nameservers.group_not_used": "此分组尚未在任何域名服务器中使用",
    "nameservers.group_not_used_desc":
      "在您的域名服务器中将此分组分配为分发分组，以在此处查看它们。",
    "nameservers.learn_more_dns": "了解更多关于 DNS",

    // DNS Zones
    "dns_zones.search_placeholder": "按域名、IP、内容或分组搜索...",
    "dns_zones.add_zone": "添加区域",
    "dns_zones.create_new_zone": "创建新区域",
    "dns_zones.no_zones": "您还没有区域。通过添加区域来控制网络的域名解析。",
    "dns_zones.col_zone": "区域",
    "dns_zones.col_records": "记录",
    "dns_zones.col_search_domain": "搜索域名",
    "dns_zones.group_not_used": "此分组尚未在任何区域中使用",
    "dns_zones.group_not_used_desc":
      "在您的区域中将此分组分配为分发分组，以在此处查看它们。",
    "dns_zones.learn_more_zones": "了解更多关于 DNS 区域",

    // Settings - Clients
    "settings.clients_title": "客户端",
    "settings.automatic_updates": "自动更新",
    "settings.automatic_updates_help":
      "通过选择最新版本、自定义版本或禁用更新来选择 NetBird 客户端处理自动更新的方式。",
    "settings.disabled": "已禁用",
    "settings.latest_version": "最新版本",
    "settings.custom_version": "自定义版本",
    "settings.experimental": "实验性功能",
    "settings.lazy_connections": "延迟连接",
    "settings.lazy_connections_desc":
      "延迟连接是一个实验性功能。功能和行为可能会演变。NetBird 不会维护始终在线的连接，而是根据活动或信令按需激活它们。",
    "settings.enable_lazy_connections": "启用延迟连接",
    "settings.enable_lazy_connections_help":
      "仅在需要时建立节点之间的连接。这需要 NetBird 客户端 v0.45 或更高版本。更改将在重启客户端后生效。",
    "settings.updating_client_settings": "正在更新客户端设置...",
    "settings.client_settings": "客户端设置",
    "settings.client_updated": "客户端设置更新成功。",
    "settings.updating_lazy_connections": "正在更新延迟连接设置...",
    "settings.lazy_enabled": "延迟连接已成功启用。",
    "settings.lazy_disabled": "延迟连接已成功禁用。",
    "settings.version_placeholder": "例如：0.52.2",
    "settings.version_error": "请输入有效的版本号，例如 0.2、0.2.0、0.2.0.1",

    // Settings - Identity Providers
    "settings.idp_title": "身份提供商",
    "settings.idp_description": "配置身份提供商以进行网络中的用户身份验证。",
    "settings.add_idp": "添加身份提供商",
    "settings.search_idp": "按名称或类型搜索...",
    "settings.no_idp": "配置身份提供商以为用户启用 SSO 身份验证。",
    "settings.idp_name": "名称",
    "settings.idp_type": "类型",
    "settings.delete_idp": "删除身份提供商",
    "settings.delete_idp_confirm":
      "您确定要删除此身份提供商吗？此操作无法撤消。",
    "settings.deleting_idp": "正在删除身份提供商...",
    "settings.idp_deleted": "身份提供商删除成功。",
    "settings.edit": "编辑",

    // Posture Checks
    "posture_checks.search_placeholder": "按名称或检查搜索...",
    "posture_checks.add_check": "添加检查",
    "posture_checks.create_check": "创建检查",
    "posture_checks.no_checks":
      "您还没有姿态检查。通过添加一个来创建节点合规性规则。",
    "posture_checks.learn_more_checks": "了解更多关于姿态检查",
    "posture_checks.col_name": "名称",
    "posture_checks.col_checks": "检查",
    "posture_checks.col_policy_usage": "策略使用",
    "posture_checks.col_location": "位置",

    // Access Control
    "access_control.search_placeholder": "按名称、源、目标搜索...",
    "access_control.add_policy": "添加策略",
    "access_control.create_policy": "创建策略",
    "access_control.no_policies": "您还没有策略。通过创建一个来管理网络访问。",
    "access_control.learn_more_policies": "了解更多关于访问控制",
    "access_control.col_name": "名称",
    "access_control.col_active": "活跃",
    "access_control.col_sources": "源",
    "access_control.col_destinations": "目标",
    "access_control.col_protocol": "协议",
    "access_control.col_ports": "端口",
    "access_control.col_posture_checks": "姿态检查",
    "access_control.col_direction": "方向",
    "access_control.enabled": "已启用",
    "access_control.all": "全部",
    "access_control.group_not_used": "此分组尚未在任何策略中使用",
    "access_control.group_not_used_desc":
      "在您的策略中将此分组分配为源或目标，以在此处查看它们。",

    // Groups Detail
    "groups.detail_users": "用户",
    "groups.detail_peers": "节点",
    "groups.detail_resources": "资源",
    "groups.detail_routes": "路由",
    "groups.detail_policies": "策略",
    "groups.detail_access_control": "访问控制",

    // Activity / Events
    "activity.search_placeholder": "按操作、电子邮件或 IP 搜索...",
    "activity.col_action": "操作",
    "activity.col_actor": "执行者",
    "activity.col_target": "目标",
    "activity.col_date": "日期",
    "activity.no_events": "暂无事件",
    "activity.loading_events": "正在加载事件...",
    "activity.failed_load": "加载事件失败",
    "activity.retry": "重试",
    "activity.canceled": "已取消",
    "activity.completed": "已完成",
    "activity.failed": "失败",
    "activity.success": "成功",
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
