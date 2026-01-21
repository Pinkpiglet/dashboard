import Breadcrumbs from "@components/Breadcrumbs";
import Button from "@components/Button";
import FancyToggleSwitch from "@components/FancyToggleSwitch";
import HelpText from "@components/HelpText";
import InlineLink from "@components/InlineLink";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import { notify } from "@components/Notification";
import {
  SelectDropdown,
  SelectOption,
} from "@components/select/SelectDropdown";
import { useHasChanges } from "@hooks/useHasChanges";
import * as Tabs from "@radix-ui/react-tabs";
import { useApiCall } from "@utils/api";
import { validator } from "@utils/helpers";
import {
  ClockFadingIcon,
  ExternalLinkIcon,
  FlaskConicalIcon,
  Monitor,
  RotateCcw,
  SaveIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSWRConfig } from "swr";
import { useLanguage } from "@/contexts/LanguageProvider";
import { Account } from "@/interfaces/Account";
import { SmallBadge } from "@components/ui/SmallBadge";
import { usePermissions } from "@/contexts/PermissionsProvider";
import SettingsIcon from "@/assets/icons/SettingsIcon";

type Props = {
  account: Account;
};

export default function ClientSettingsTab({ account }: Readonly<Props>) {
  const { t } = useLanguage();
  const { permission } = usePermissions();

  const { mutate } = useSWRConfig();
  const saveRequest = useApiCall<Account>("/accounts/" + account.id, true);

  const latestOrCustomVersion = [
    {
      label: t("settings.disabled", "Disabled"),
      value: "disabled",
    },
    {
      label: t("settings.latest_version", "Latest Version"),
      value: "latest",
    },
    {
      label: t("settings.custom_version", "Custom Version"),
      value: "custom",
    },
  ] as SelectOption[];

  const [lazyConnection, setLazyConnection] = useState(
    account.settings?.lazy_connection_enabled ?? false,
  );

  const autoUpdateSetting = account.settings?.auto_update_version;
  const isAutoUpdateEnabled =
    !!autoUpdateSetting && autoUpdateSetting !== "disabled";
  const isCustomVersion = validator.isValidVersion(autoUpdateSetting);
  const [autoUpdateMethod, setAutoUpdateMethod] = useState(
    isAutoUpdateEnabled ? (isCustomVersion ? "custom" : "latest") : "disabled",
  );

  const [autoUpdateCustomVersion, setAutoUpdateCustomVersion] = useState(
    isCustomVersion ? autoUpdateSetting : "",
  );

  const { hasChanges, updateRef } = useHasChanges([
    autoUpdateMethod,
    autoUpdateCustomVersion,
  ]);

  const handleUpdateMethodChange = (value: string) => {
    setAutoUpdateMethod(value);
    if (value === "disabled" || value === "latest") {
      setAutoUpdateCustomVersion("");
    }
  };

  const versionError = useMemo(() => {
    const msg = "Please enter a valid version, e.g., 0.2, 0.2.0, 0.2.0-alpha.1";
    if (autoUpdateCustomVersion == "") return "";
    if (autoUpdateCustomVersion == "-") return "";
    const validSemver = validator.isValidVersion(autoUpdateCustomVersion);
    if (!validSemver) return msg;
    return "";
  }, [autoUpdateCustomVersion]);

  const canSaveCustomVersion =
    autoUpdateCustomVersion !== "" &&
    autoUpdateMethod === "custom" &&
    versionError === "";

  const isSaveButtonDisabled = useMemo(() => {
    return (
      !hasChanges ||
      !permission.settings.update ||
      (autoUpdateMethod === "custom" && !canSaveCustomVersion)
    );
  }, [
    hasChanges,
    permission.settings.update,
    autoUpdateMethod,
    canSaveCustomVersion,
  ]);

  const saveChanges = async () => {
    notify({
      title: "Client Settings",
      description: `Client settings successfully updated.`,
      promise: saveRequest
        .put({
          id: account.id,
          settings: {
            ...account.settings,
            auto_update_version: autoUpdateCustomVersion || autoUpdateMethod,
          },
        })
        .then(() => {
          mutate("/accounts");
          updateRef([autoUpdateMethod, autoUpdateCustomVersion]);
        }),
      loadingMessage: "Updating client settings...",
    });
  };

  const toggleLazyConnection = async (toggle: boolean) => {
    notify({
      title: "Lazy Connections",
      description: `Lazy Connections successfully ${
        toggle ? "enabled" : "disabled"
      }.`,
      promise: saveRequest
        .put({
          id: account.id,
          settings: {
            ...account.settings,
            lazy_connection_enabled: toggle,
          },
        })
        .then(() => {
          setLazyConnection(toggle);
          mutate("/accounts");
        }),
      loadingMessage: "Updating Lazy Connections setting...",
    });
  };

  return (
    <Tabs.Content value={"clients"}>
      <div className={"p-default py-6 max-w-xl"}>
        <Breadcrumbs>
          <Breadcrumbs.Item
            href={"/settings"}
            label={"Settings"}
            icon={<SettingsIcon size={13} />}
          />
          <Breadcrumbs.Item
            href={"/settings?tab=clients"}
            label={t("settings.clients_title", "Clients")}
            icon={<Monitor size={14} />}
            active
          />
        </Breadcrumbs>
        <div className={"flex items-start justify-between"}>
          <h1>{t("settings.clients_title", "Clients")}</h1>
          <Button
            variant={"primary"}
            disabled={isSaveButtonDisabled}
            onClick={saveChanges}
            data-cy={"save-clients-settings"}
          >
            <SaveIcon size={16} />
            {t("common.save_changes", "Save Changes")}
          </Button>
        </div>

        <div className={"flex flex-col gap-6 w-full mt-8"}>
          <div className={"flex flex-col relative"}>
            <Label>
              <RotateCcw size={15} />
              {t("settings.automatic_updates", "Automatic Updates")}
              <SmallBadge
                text={t("nav.beta", "Beta")}
                variant={"sky"}
                className={"text-[9px] leading-none py-[3px] px-[5px]"}
                textClassName={"top-0"}
              />
            </Label>
            <HelpText>
              {t(
                "settings.automatic_updates_help",
                "Select how NetBird clients handle automatic updates by choosing the latest version, a custom version, or disabling updates altogether.",
              )}
            </HelpText>
            <div className={"gap-4 items-center grid grid-cols-2"}>
              <SelectDropdown
                value={autoUpdateMethod}
                onChange={handleUpdateMethodChange}
                options={latestOrCustomVersion}
              />
              <Input
                value={autoUpdateCustomVersion}
                customPrefix={t("settings.custom_version", "Version")}
                placeholder={t("settings.version_placeholder", "e.g., 0.52.2")}
                error={versionError}
                errorTooltip={true}
                disabled={autoUpdateMethod !== "custom"}
                onChange={(v) => {
                  setAutoUpdateCustomVersion(v.target.value);
                }}
              />
            </div>
          </div>

          <div className={"mt-3"}>
            <h2 className={"text-lg font-medium"}>
              {t("settings.experimental", "Experimental")}
              <FlaskConicalIcon
                size={16}
                className={"inline ml-1.5 relative -top-[2px]"}
              />
            </h2>
            <div className={"text-sm text-gray-400"}>
              {t(
                "settings.lazy_connections_desc",
                "Lazy connections are an experimental feature. Functionality and behavior may evolve. Instead of maintaining always-on connections, NetBird activates them on-demand based on activity or signaling.",
              )}{" "}
              <InlineLink
                href={"https://docs.netbird.io/how-to/lazy-connection"}
                target={"_blank"}
              >
                {t("common.learn_more", "Learn more")}
                <ExternalLinkIcon size={12} />
              </InlineLink>
            </div>
          </div>
          <FancyToggleSwitch
            value={lazyConnection}
            onChange={toggleLazyConnection}
            label={
              <>
                <ClockFadingIcon size={15} />
                {t(
                  "settings.enable_lazy_connections",
                  "Enable Lazy Connections",
                )}
              </>
            }
            helpText={
              <>
                {t(
                  "settings.enable_lazy_connections_help",
                  "Allow to establish connections between peers only when required. This requires NetBird client v0.45 or higher. Changes will only take effect after restarting the clients.",
                )}
              </>
            }
            disabled={!permission.settings.update}
          />
        </div>
      </div>
    </Tabs.Content>
  );
}
