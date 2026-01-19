import Button from "@components/Button";
import HelpText from "@components/HelpText";
import InlineLink from "@components/InlineLink";
import { Input } from "@components/Input";
import { Label } from "@components/Label";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@components/modal/Modal";
import { ExternalLinkIcon, FolderGit2Icon, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { usePermissions } from "@/contexts/PermissionsProvider";
import { useLanguage } from "@/contexts/LanguageProvider";
import { Group } from "@/interfaces/Group";
import { useApiCall } from "@/utils/api";
import ModalHeader from "../modal/ModalHeader";
import { notify } from "../Notification";
import Paragraph from "../Paragraph";
import Separator from "../Separator";

export const AddGroupButton = () => {
  const create = useApiCall<Group>("/groups", true).post;
  const { mutate } = useSWRConfig();
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { permission } = usePermissions();
  const { t } = useLanguage();

  const createGroup = () => {
    notify({
      title: t("groups.create_title", "Create Group"),
      description: t(
        "groups.created_success",
        `Group '${name}' successfully created`,
      ),
      loadingMessage: t("groups.creating", "Creating group..."),
      promise: create({ name }).then((g) => {
        setOpen(false);
        setName("");
        mutate("/groups");
        router.push(`/group?id=${g?.id}`);
      }),
    });
  };

  return (
    permission?.groups?.create && (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button
            variant={"primary"}
            size={"sm"}
            className={"ml-auto h-[42px]"}
          >
            <PlusCircle size={16} />
            {t("groups.create_button", "Create Group")}
          </Button>
        </ModalTrigger>
        <ModalContent maxWidthClass={"max-w-xl"}>
          <ModalHeader
            icon={<FolderGit2Icon size={18} />}
            title={t("groups.create_title", "Create Group")}
            description={t(
              "groups.create_description",
              "Create a group to manage and organize access in your network",
            )}
            color="netbird"
          />
          <Separator />
          <div className={"px-8 flex-col flex gap-6 py-6"}>
            <div>
              <Label>{t("groups.name_label", "Name")}</Label>
              <HelpText>
                {t(
                  "groups.name_help",
                  "Set an easily identifiable name for your group",
                )}
              </HelpText>
              <Input
                tabIndex={0}
                placeholder={t("groups.name_placeholder", "e.g., Developers")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <ModalFooter className={"items-center"}>
            <div className={"w-full"}>
              <Paragraph className={"text-sm mt-auto"}>
                {t("groups.learn_more", "Learn more about")}
                <InlineLink
                  href={"https://docs.netbird.io/how-to/manage-network-access"}
                  target={"_blank"}
                >
                  {t("groups.link_text", "Groups")}
                  <ExternalLinkIcon size={12} />
                </InlineLink>
              </Paragraph>
            </div>
            <div className={"flex gap-3 w-full justify-end"}>
              <ModalClose asChild={true}>
                <Button variant={"secondary"}>
                  {t("common.cancel", "Cancel")}
                </Button>
              </ModalClose>

              <Button
                variant={"primary"}
                data-cy={"submit-route"}
                disabled={!name}
                onClick={createGroup}
              >
                <PlusCircle size={16} />
                {t("groups.create_button", "Create Group")}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );
};
