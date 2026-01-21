import ButtonGroup from "@components/ButtonGroup";
import { DataTable } from "@components/table/DataTable";
import DataTableHeader from "@components/table/DataTableHeader";
import { DataTableRowsPerPage } from "@components/table/DataTableRowsPerPage";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { removeAllSpaces } from "@utils/helpers";
import { Layers3Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import AccessControlIcon from "@/assets/icons/AccessControlIcon";
import DNSIcon from "@/assets/icons/DNSIcon";
import NetworkRoutesIcon from "@/assets/icons/NetworkRoutesIcon";
import PeerIcon from "@/assets/icons/PeerIcon";
import SetupKeysIcon from "@/assets/icons/SetupKeysIcon";
import TeamIcon from "@/assets/icons/TeamIcon";
import { AddGroupButton } from "@/components/ui/AddGroupButton";
import { GroupProvider } from "@/contexts/GroupProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GroupsActionCell from "@/modules/groups/table/GroupsActionCell";
import GroupsCountCell from "@/modules/groups/table/GroupsCountCell";
import GroupsNameCell from "@/modules/groups/table/GroupsNameCell";
import useGroupsUsage, { GroupUsage } from "@/modules/groups/useGroupsUsage";
import DNSZoneIcon from "@/assets/icons/DNSZoneIcon";
import { useLanguage } from "@/contexts/LanguageProvider";

export const getGroupsTableColumns = (
  t: (key: string, fallback?: string) => string,
): ColumnDef<GroupUsage>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          {t("groups.col_name", "Name")}
        </DataTableHeader>
      );
    },
    cell: ({ row }) => {
      const in_use = !!row.getValue("in_use");
      return (
        <GroupsNameCell
          active={in_use}
          group={{
            id: row.original?.id,
            issued: row.original?.issued,
            name: row.original?.name,
          }}
        />
      );
    },
    sortingFn: "text",
  },
  {
    accessorKey: "users_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("groups.col_users", "Users")}
            </div>
          }
        >
          <TeamIcon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<TeamIcon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=users`}
        hidden={row.original.name === "All"}
        text={t("groups.users_count", "User(s)")}
        count={row.original.users_count}
      />
    ),
  },
  {
    accessorKey: "peers_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("groups.col_peers", "Peers")}
            </div>
          }
        >
          <PeerIcon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<PeerIcon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=peers`}
        hidden={row.original.name === "All"}
        text={t("groups.peers_count", "Peer(s)")}
        count={row.original.peers_count}
      />
    ),
  },
  {
    accessorKey: "policies_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("groups.col_policies", "Policies")}
            </div>
          }
        >
          <AccessControlIcon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<AccessControlIcon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=policies`}
        text={
          row.original.policies_count === 1
            ? t("groups.policies_one", "Policy")
            : t("groups.policies_many", "Policies")
        }
        count={row.original.policies_count}
      />
    ),
  },
  {
    accessorKey: "resources_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("groups.col_resources", "Network Resources")}
            </div>
          }
        >
          <Layers3Icon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<Layers3Icon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=resources`}
        text={t("groups.resources_count", "Network Resource(s)")}
        count={row.original.resources_count}
      />
    ),
  },
  {
    accessorKey: "routes_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("groups.col_routes", "Network Routes")}
            </div>
          }
        >
          <NetworkRoutesIcon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<NetworkRoutesIcon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=network-routes`}
        text={t("groups.routes_count", "Network Route(s)")}
        count={row.original.routes_count}
      />
    ),
  },
  {
    accessorKey: "nameservers_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("nameservers.col_nameservers", "Nameservers")}
            </div>
          }
        >
          <DNSIcon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<DNSIcon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=nameservers`}
        text={t("groups.nameservers_count", "Nameserver(s)")}
        count={row.original.nameservers_count}
      />
    ),
  },
  {
    accessorKey: "zones_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("dns_zones.col_zone", "Zones")}
            </div>
          }
        >
          <DNSZoneIcon size={16} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<DNSZoneIcon size={14} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=zones`}
        text={t("groups.zones_count", "Zone(s)")}
        count={row.original.zones_count}
      />
    ),
  },
  {
    accessorKey: "setup_keys_count",
    header: ({ column }) => {
      return (
        <DataTableHeader
          column={column}
          center={true}
          tooltip={
            <div className={"text-xs normal-case"}>
              {t("setup_keys.col_name", "Setup Keys")}
            </div>
          }
        >
          <SetupKeysIcon size={12} />
        </DataTableHeader>
      );
    },
    cell: ({ row }) => (
      <GroupsCountCell
        icon={<SetupKeysIcon size={10} />}
        groupName={row.original.name}
        href={`/group?id=${row.original.id}&tab=setup-keys`}
        hidden={row.original.name === "All"}
        text={t("groups.setup_keys_count", "Setup Key(s)")}
        count={row.original.setup_keys_count}
      />
    ),
  },
  {
    id: "in_use",
    header: ({ column }) => {
      return (
        <DataTableHeader column={column}>
          {t("groups.col_in_use", "In Use")}
        </DataTableHeader>
      );
    },
    sortingFn: "basic",
    accessorFn: (row) => {
      return (
        row.peers_count > 0 ||
        row.nameservers_count > 0 ||
        row.policies_count > 0 ||
        row.routes_count > 0 ||
        row.setup_keys_count > 0 ||
        row.users_count > 0 ||
        row.resources_count > 0 ||
        row.zones_count
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => (
      <GroupProvider group={row.original} isDetailPage={false}>
        <GroupsActionCell group={row.original} inUse={row.getValue("in_use")} />
      </GroupProvider>
    ),
  },
  {
    accessorKey: "search",
    accessorFn: (row) => removeAllSpaces(row.name),
    filterFn: "fuzzy",
  },
];

type Props = {
  headingTarget?: HTMLHeadingElement | null;
};

export default function GroupsTable({ headingTarget }: Readonly<Props>) {
  const { t } = useLanguage();
  const { data: groups, isLoading } = useGroupsUsage();
  const path = usePathname();

  // Default sorting state of the table
  const [sorting, setSorting] = useLocalStorage<SortingState>(
    "netbird-table-sort" + path,
    [
      {
        id: "in_use",
        desc: true,
      },
      {
        id: "name",
        desc: false,
      },
    ],
  );

  return (
    <DataTable
      headingTarget={headingTarget}
      text={t("nav.groups", "Groups")}
      sorting={sorting}
      isLoading={isLoading}
      setSorting={setSorting}
      columns={getGroupsTableColumns(t)}
      data={groups}
      searchPlaceholder={t(
        "groups.search_placeholder",
        "Search group by name...",
      )}
      rightSide={() => <AddGroupButton />}
      columnVisibility={{
        in_use: false,
        search: false,
      }}
    >
      {(table) => (
        <>
          <ButtonGroup disabled={groups?.length == 0}>
            <ButtonGroup.Button
              onClick={() =>
                table.getColumn("in_use")?.setFilterValue(undefined)
              }
              disabled={groups?.length == 0}
              variant={
                table.getColumn("in_use")?.getFilterValue() === undefined
                  ? "tertiary"
                  : "secondary"
              }
            >
              {t("common.all", "All")}
            </ButtonGroup.Button>
            <ButtonGroup.Button
              onClick={() => table.getColumn("in_use")?.setFilterValue(true)}
              disabled={groups?.length == 0}
              variant={
                table.getColumn("in_use")?.getFilterValue() === true
                  ? "tertiary"
                  : "secondary"
              }
            >
              {t("groups.used", "Used")}
            </ButtonGroup.Button>
            <ButtonGroup.Button
              disabled={groups?.length == 0}
              onClick={() => table.getColumn("in_use")?.setFilterValue(false)}
              variant={
                table.getColumn("in_use")?.getFilterValue() === false
                  ? "tertiary"
                  : "secondary"
              }
            >
              {t("groups.unused", "Unused")}
            </ButtonGroup.Button>
          </ButtonGroup>
          <DataTableRowsPerPage table={table} disabled={groups?.length == 0} />
        </>
      )}
    </DataTable>
  );
}
