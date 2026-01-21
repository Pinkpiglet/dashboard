"use client";

import InlineLink from "@components/InlineLink";
import { ModalContent, ModalFooter } from "@components/modal/Modal";
import Paragraph from "@components/Paragraph";
import SmallParagraph from "@components/SmallParagraph";
import { Tabs, TabsList, TabsTrigger } from "@components/Tabs";
import { cn } from "@utils/helpers";
import { ExternalLinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import AndroidIcon from "@/assets/icons/AndroidIcon";
import AppleIcon from "@/assets/icons/AppleIcon";
import DockerIcon from "@/assets/icons/DockerIcon";
import IOSIcon from "@/assets/icons/IOSIcon";
import ShellIcon from "@/assets/icons/ShellIcon";
import WindowsIcon from "@/assets/icons/WindowsIcon";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useOperatingSystem from "@/hooks/useOperatingSystem";
import { useLanguage } from "@/contexts/LanguageProvider";
import { OperatingSystem } from "@/interfaces/OperatingSystem";
import AndroidTab from "@/modules/setup-netbird-modal/AndroidTab";
import DockerTab from "@/modules/setup-netbird-modal/DockerTab";
import IOSTab from "@/modules/setup-netbird-modal/IOSTab";
import LinuxTab from "@/modules/setup-netbird-modal/LinuxTab";
import MacOSTab from "@/modules/setup-netbird-modal/MacOSTab";
import WindowsTab from "@/modules/setup-netbird-modal/WindowsTab";

type OidcUserInfo = {
  given_name?: string;
};

type Props = {
  showClose?: boolean;
  user?: OidcUserInfo;
  setupKey?: string;
  showOnlyRoutingPeerOS?: boolean;
  className?: string;
};

export default function SetupModal({
  showClose = true,
  user,
  setupKey,
  showOnlyRoutingPeerOS = false,
  className,
}: Readonly<Props>) {
  return (
    <ModalContent showClose={showClose} className={className}>
      <SetupModalContent
        user={user}
        setupKey={setupKey}
        showOnlyRoutingPeerOS={showOnlyRoutingPeerOS}
      />
    </ModalContent>
  );
}

type SetupModalContentProps = {
  user?: OidcUserInfo;
  header?: boolean;
  footer?: boolean;
  tabAlignment?: "center" | "start" | "end";
  setupKey?: string;
  showOnlyRoutingPeerOS?: boolean;
  title?: string;
  hostname?: string;
  hideDocker?: boolean;
};

export function SetupModalContent({
  user,
  header = true,
  footer = true,
  tabAlignment = "center",
  setupKey,
  showOnlyRoutingPeerOS,
  title,
  hostname,
  hideDocker = false,
}: Readonly<SetupModalContentProps>) {
  const os = useOperatingSystem();
  const [isFirstRun] = useLocalStorage<boolean>("netbird-first-run", true);
  const pathname = usePathname();
  const isInstallPage = pathname === "/install";
  const { t } = useLanguage();

  const titleMessage = useMemo(() => {
    if (title) return title;

    if (isFirstRun && !isInstallPage) {
      let name = user?.given_name || t("setup.greeting_name", "there");
      return (
        <>
          {t("setup.greeting", `Hello ${name}! 👋`)} <br />{" "}
          {t("setup.add_first_device", "It's time to add your first device.")}
        </>
      );
    }

    return setupKey
      ? t("setup.install_with_key", "Install NetBird with Setup Key")
      : t("setup.install_title", "Install NetBird");
  }, [isFirstRun, isInstallPage, setupKey, title, user?.given_name, t]);

  return (
    <>
      {header && (
        <div className={"text-center pb-5 pt-4 px-8"}>
          <h2
            className={cn(
              "max-w-lg mx-auto",
              setupKey ? "text-2xl" : "text-3xl",
            )}
          >
            {titleMessage}
          </h2>
          <Paragraph
            className={cn("mx-auto mt-3", setupKey ? "max-w-sm" : "max-w-xs")}
          >
            {setupKey
              ? t(
                  "setup.install_with_key_desc",
                  "To get started, install and run NetBird with the setup key as a parameter.",
                )
              : t(
                  "setup.install_desc",
                  "To get started, install NetBird and log in with your email account.",
                )}
          </Paragraph>
        </div>
      )}

      <Tabs defaultValue={String(setupKey ? OperatingSystem.LINUX : os)}>
        <TabsList justify={tabAlignment} className={"pt-2 px-3"}>
          <TabsTrigger value={String(OperatingSystem.LINUX)}>
            <ShellIcon
              className={
                "fill-nb-gray-500 group-data-[state=active]/trigger:fill-netbird transition-all"
              }
            />
            {t("setup.os_linux", "Linux")}
          </TabsTrigger>

          <TabsTrigger value={String(OperatingSystem.WINDOWS)}>
            <WindowsIcon
              className={
                "fill-nb-gray-500 group-data-[state=active]/trigger:fill-netbird transition-all"
              }
            />
            {t("setup.os_windows", "Windows")}
          </TabsTrigger>
          <TabsTrigger value={String(OperatingSystem.APPLE)}>
            <AppleIcon
              className={
                "fill-nb-gray-500 group-data-[state=active]/trigger:fill-netbird transition-all"
              }
            />
            {t("setup.os_macos", "macOS")}
          </TabsTrigger>

          {!setupKey && (
            <>
              <TabsTrigger value={String(OperatingSystem.IOS)}>
                <IOSIcon
                  className={
                    "fill-nb-gray-500 group-data-[state=active]/trigger:fill-netbird transition-all"
                  }
                />
                {t("setup.os_ios", "iOS")}
              </TabsTrigger>
              <TabsTrigger value={String(OperatingSystem.ANDROID)}>
                <AndroidIcon
                  className={
                    "fill-nb-gray-500 group-data-[state=active]/trigger:fill-netbird transition-all"
                  }
                />
                {t("setup.os_android", "Android")}
              </TabsTrigger>
            </>
          )}

          {!hideDocker && (
            <TabsTrigger value={String(OperatingSystem.DOCKER)}>
              <DockerIcon
                className={
                  "fill-nb-gray-500 group-data-[state=active]/trigger:fill-netbird transition-all"
                }
              />
              {t("setup.os_docker", "Docker")}
            </TabsTrigger>
          )}
        </TabsList>

        <LinuxTab
          setupKey={setupKey}
          showSetupKeyInfo={showOnlyRoutingPeerOS}
          hostname={hostname}
        />
        <WindowsTab
          setupKey={setupKey}
          showSetupKeyInfo={showOnlyRoutingPeerOS}
          hostname={hostname}
        />
        <MacOSTab
          setupKey={setupKey}
          showSetupKeyInfo={showOnlyRoutingPeerOS}
          hostname={hostname}
        />

        {!setupKey && (
          <>
            <AndroidTab />
            <IOSTab />
          </>
        )}

        {!hideDocker && (
          <DockerTab
            setupKey={setupKey}
            showSetupKeyInfo={showOnlyRoutingPeerOS}
            hostname={hostname}
          />
        )}
      </Tabs>
      {footer && (
        <ModalFooter variant={"setup"}>
          <div>
            <SmallParagraph>
              {t(
                "setup.after_install",
                "After that you should be connected. Add more devices to your network or manage your existing devices in the admin panel. If you have further questions check out our ",
              )}
              <InlineLink
                href={
                  "https://docs.netbird.io/how-to/getting-started#installation"
                }
                target={"_blank"}
              >
                {t("setup.installation_guide", "Installation Guide")}
                <ExternalLinkIcon size={12} />
              </InlineLink>
            </SmallParagraph>
          </div>
        </ModalFooter>
      )}
    </>
  );
}

type SetupKeyParameterProps = {
  setupKey?: string;
};

export const SetupKeyParameter = ({ setupKey }: SetupKeyParameterProps) => {
  return (
    setupKey && (
      <>
        {" "}
        --setup-key <span className={"text-netbird"}>{setupKey}</span>
      </>
    )
  );
};

export const HostnameParameter = ({ hostname }: { hostname?: string }) => {
  return (
    hostname && (
      <>
        {" "}
        --hostname{" "}
        <span className={"text-netbird"}>
          {"'"}
          {hostname}
          {"'"}
        </span>
      </>
    )
  );
};

export const RoutingPeerSetupKeyInfo = () => {
  const { t } = useLanguage();
  return (
    <div
      className={
        "flex gap-2 mt-1 items-center text-xs text-nb-gray-300 font-normal mb-1"
      }
    >
      {t(
        "setup.key_usage_limit",
        "This setup key can be used only once within the next 24 hours.",
      )}
      <br />
      {t(
        "setup.key_expired",
        "When expired, the same key can not be used again.",
      )}
    </div>
  );
};
