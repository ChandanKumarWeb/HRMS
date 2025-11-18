"use client";

import DataTable from "@/components/table/dataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2, UserPen } from "lucide-react";
export default function UserAPIComponent() {
  const columns: ColumnDef<User>[] = [
    {
      id: "ID",
      header: "S.No",
      cell: ({ row }) => {
        return row.index + 1 + ".";
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
    {
      id: "phone",
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div className="w-max">{row.original.phone}</div>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="w-full flex justify-evenly">
            {" "}
            <EditFN
              name={row.original.name}
              role={row.original.role}
              phone={row.original.phone}
            />
            <Trash2 />
          </div>
        );
      },
    },
  ];

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

function EditFN({
  name,
  role,
  phone
}: {
  name: string;
  role: string;
  phone: number
}) {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>
              <UserPen />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue={name} 
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="role-1">Role</Label>
                <Input
                  id="role-1"
                  name="role"
                  defaultValue={role} 
                />
              </div>
              <div>
                <Label htmlFor="phone-1">Phone</Label>
                <Input
                  id="phone-1"
                  name="phone"
                  type="string"
                  defaultValue={phone}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}

export interface User {
  id: number;
  name: string;
  role: string;
  phone: number;
}
