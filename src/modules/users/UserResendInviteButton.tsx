import Button from "@components/Button";
import { notify } from "@components/Notification";
import { useApiCall } from "@utils/api";
import { cn } from "@utils/helpers";
import { Loader2, MailIcon } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { usePermissions } from "@/contexts/PermissionsProvider";
import { useLanguage } from "@/contexts/LanguageProvider";
import { User } from "@/interfaces/User";

type Props = {
  user: User;
};
export const UserResendInviteButton = ({ user }: Props) => {
  const userRequest = useApiCall<User>("/users", true);
  const [isLoading, setIsLoading] = useState(false);
  const { permission } = usePermissions();
  const { t } = useLanguage();

  const inviteUser = async () => {
    setIsLoading(true);
    notify({
      title: t("users.resend_invite_title", "Resend Invite"),
      description: t(
        "users.resend_invite_desc",
        `The invitation is being sent to ${user.email}`,
      ),
      promise: userRequest
        .post("", `/${user.id}/invite`)
        .finally(() => setIsLoading(false)),
      loadingMessage: t("users.sending_invite", "Sending invitation..."),
    });
  };

  const LoadingMessage = () => (
    <>
      <Loader2 size={14} className={"animate-spin block"} />
      {t("users.sending", "Sending...")}
    </>
  );

  const DefaultMessage = () => (
    <>
      <MailIcon size={13} />
      {t("users.resend_invite", "Resend Invite")}
    </>
  );

  return (
    user.status == "invited" && (
      <Button
        disabled={!permission.users.create}
        variant={"secondary"}
        size={"xs"}
        onClick={inviteUser}
        className={cn("min-w-[160px]", isLoading && "animate-pulse")}
      >
        {isLoading ? <LoadingMessage /> : <DefaultMessage />}
      </Button>
    )
  );
};
