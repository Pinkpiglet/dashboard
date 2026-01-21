import Button from "@components/Button";
import ButtonGroup from "@components/ButtonGroup";
import InlineLink from "@components/InlineLink";
import SquareIcon from "@components/SquareIcon";
import { DataTable } from "@components/table/DataTable";
import DataTableHeader from "@components/table/DataTableHeader";
import DataTableRefreshButton from "@components/table/DataTableRefreshButton";
import { DataTableRowsPerPage } from "@components/table/DataTableRowsPerPage";
import GetStartedTest from "@components/ui/GetStartedTest";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { IconCirclePlus } from "@tabler/icons-react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import useFetchApi from "@utils/api";
import { ExternalLinkIcon, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useSWRConfig } from "swr";
import { useLanguage } from "@/contexts/LanguageProvider";
import { usePermissions } from "@/contexts/PermissionsProvider";
import { Policy } from "@/interfaces/Policy";
import { PostureCheck } from "@/interfaces/PostureCheck";
import PostureCheckModal from "@/modules/posture-checks/modal/PostureCheckModal";
import { PostureCheckActionCell } from "@/modules/posture-checks/table/cells/PostureCheckActionCell";
import { PostureCheckChecksCell } from "@/modules/posture-checks/table/cells/PostureCheckChecksCell";
import { PostureCheckNameCell } from "@/modules/posture-checks/table/cells/PostureCheckNameCell";
import { PostureCheckPolicyUsageCell } from "@/modules/posture-checks/table/cells/PostureCheckPolicyUsageCell";
import PoliciesProvider from "@/contexts/PoliciesProvider";

type Props = {
  isLoading: boolean;
  postureChecks: PostureCheck[] | undefined;
  headingTarget?: HTMLHeadingElement | null;
};

const Columns = (
  t: (key: string, fallback?: string) => string,
): ColumnDef<PostureCheck>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          {t("posture_checks.col_name", "Name")}
        </DataTableHeader>
      );
    },
    cell: ({ row }) => <PostureCheckNameCell check={row.original} />,
  },
  {
    id: "active",
    accessorKey: "active",
    sortingFn: "basic",
  },
  {
    id: "checks",
    accessorFn: (row) => Object.keys(row.checks).length,
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          {t("posture_checks.col_checks", "Checks")}
        </DataTableHeader>
      );
    },
    cell: ({ row }) => <PostureCheckChecksCell check={row.original} />,
  },
  {
    id: "access_control_usage",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          {t("networks.col_policies", "Policies")}
        </DataTableHeader>
      );
    },
    cell: ({ row }) => <PostureCheckPolicyUsageCell check={row.original} />,
  },

  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <PostureCheckActionCell check={row.original} />,
  },
];

export default function PostureCheckTable({
  postureChecks,
  isLoading,
  headingTarget,
}: Props) {
  const { t } = useLanguage();
  const { permission } = usePermissions();
  const { data: policies } = useFetchApi<Policy[]>("/policies");
  const { mutate } = useSWRConfig();
  const path = usePathname();

  const data = useMemo(() => {
    if (!postureChecks) return [];
    return postureChecks?.map((check) => {
      const checkId = check.id;
      if (!policies) return check;
      const usage = policies?.filter((policy) => {
        if (!policy.source_posture_checks) return false;
        let checks = policy.source_posture_checks as string[];
        return checks.includes(checkId);
      });
      const isOnePolicyEnabled = usage.some((policy) => policy.enabled);
      return {
        ...check,
        policies: usage || [],
        active: isOnePolicyEnabled,
      };
    });
  }, [postureChecks, policies]);

  // Default sorting state of the table
  const [sorting, setSorting] = useLocalStorage<SortingState>(
    "netbird-table-sort" + path,
    [
      {
        id: "active",
        desc: true,
      },
    ],
  );

  const [postureCheckModal, setPostureCheckModal] = useState(false);
  const [currentRow, setCurrentRow] = useState<PostureCheck>();
  const [, setCurrentCellClicked] = useState("");

  return (
    <div className={""}>
      {postureCheckModal && (
        <PostureCheckModal
          open={postureCheckModal}
          key={currentRow ? 1 : 0}
          onOpenChange={setPostureCheckModal}
          onSuccess={() => setPostureCheckModal(false)}
          postureCheck={currentRow}
        />
      )}
      <PoliciesProvider>
        <DataTable
          headingTarget={headingTarget}
          isLoading={isLoading}
          text={t("nav.posture_checks", "Posture Checks")}
          sorting={sorting}
          wrapperClassName={""}
          setSorting={setSorting}
          columns={Columns(t)}
          showHeader={true}
          columnVisibility={{
            active: false,
          }}
          onRowClick={(row, cell) => {
            setCurrentRow(row.original);
            setPostureCheckModal(true);
            setCurrentCellClicked(cell);
          }}
          data={data}
          searchPlaceholder={t(
            "posture_checks.search_placeholder",
            "Search by name and description...",
          )}
          rightSide={() => (
            <>
              {data && data?.length > 0 && (
                <Button
                  variant={"primary"}
                  className={"ml-auto"}
                  disabled={
                    !permission.policies.create || !permission.policies.update
                  }
                  onClick={() => {
                    setCurrentRow(undefined);
                    setPostureCheckModal(true);
                  }}
                >
                  <IconCirclePlus size={16} />
                  {t("posture_checks.add_check", "Add Posture Check")}
                </Button>
              )}
            </>
          )}
          getStartedCard={
            <GetStartedTest
              icon={
                <SquareIcon
                  icon={<ShieldCheck size={23} />}
                  color={"gray"}
                  size={"large"}
                />
              }
              title={t("posture_checks.create_check", "Create Posture Check")}
              description={t(
                "posture_checks.no_checks",
                "Add posture checks to further restrict access in your network. E.g., only clients with a specific NetBird client version, operating system or location are allowed to connect.",
              )}
              button={
                <Button
                  variant={"primary"}
                  className={"ml-auto"}
                  disabled={
                    !permission.policies.create || !permission.policies.update
                  }
                  onClick={() => setPostureCheckModal(true)}
                >
                  <IconCirclePlus size={16} />
                  {t("posture_checks.create_check", "Create Posture Check")}
                </Button>
              }
              learnMore={
                <>
                  {t(
                    "posture_checks.learn_more_checks",
                    "Learn more about Posture Checks",
                  )}
                  <InlineLink
                    href={
                      "https://docs.netbird.io/how-to/manage-posture-checks"
                    }
                    target={"_blank"}
                  >
                    {t("posture_checks.link_text", "Posture Checks")}
                    <ExternalLinkIcon size={12} />
                  </InlineLink>
                </>
              }
            />
          }
        >
          {(table) => {
            return (
              <>
                <ButtonGroup disabled={data?.length == 0}>
                  <ButtonGroup.Button
                    onClick={() => {
                      table.setPageIndex(0);
                      table.getColumn("active")?.setFilterValue(true);
                    }}
                    disabled={data?.length == 0}
                    variant={
                      table.getColumn("active")?.getFilterValue() == true
                        ? "tertiary"
                        : "secondary"
                    }
                  >
                    {t("access_control.enabled", "Active")}
                  </ButtonGroup.Button>
                  <ButtonGroup.Button
                    onClick={() => {
                      table.setPageIndex(0);
                      table.getColumn("active")?.setFilterValue("");
                    }}
                    disabled={data?.length == 0}
                    variant={
                      table.getColumn("active")?.getFilterValue() != true
                        ? "tertiary"
                        : "secondary"
                    }
                  >
                    {t("common.all", "All")}
                  </ButtonGroup.Button>
                </ButtonGroup>
                <DataTableRowsPerPage
                  table={table}
                  disabled={data?.length == 0}
                />
                <DataTableRefreshButton
                  isDisabled={data?.length == 0}
                  onClick={() => {
                    mutate("/posture-checks");
                  }}
                />
              </>
            );
          }}
        </DataTable>
      </PoliciesProvider>
    </div>
  );
}
