"use client";

import DataTable from "@/components/table/dataTable";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
export default function UserAPIComponent() {
const columns: ColumnDef<User>[] = [
    {
      id: "ID",
      header: "S.No",
      cell: ({ row }) => {
        return row.index + 1 + "."
      },
    },
    {
      id: "name",
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="w-max">{row.original.name}</div>,
    },
    {
      id: "role",
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div className="w-max">{row.original.role}</div>,
    },
  ]


  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/user");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">User List</h2>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
export interface User {
  id: number
  name: string
  role: string
}