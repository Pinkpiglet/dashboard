import SidebarItem from "@components/SidebarItem";
import * as React from "react";
import NetworkRoutesIcon from "@/assets/icons/NetworkRoutesIcon";
import { useLanguage } from "@/contexts/LanguageProvider";
import { usePermissions } from "@/contexts/PermissionsProvider";

export const NetworkNavigation = () => {
  const { permission } = usePermissions();
  const { t } = useLanguage();
  return (
    <>
      <SidebarItem
        icon={<NetworkRoutesIcon />}
        label={t("nav.networks", "Networks")}
        href={"/networks"}
        visible={permission.networks.read}
      />
      <SidebarItem
        icon={<NetworkRoutesIcon />}
        href={"/network-routes"}
        label={t("nav.network_routes", "Network Routes")}
        visible={permission.routes.read}
      />
    </>
  );
};
