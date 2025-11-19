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
import { useMutation, useQuery } from "@tanstack/react-query";
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
            <EditFN
              id={row.original.id}
              name={row.original.name}
              role={row.original.role}
              phone={row.original.phone}
              refetch={() => {
                window.location.reload();
              }}
            />
            <Trash2 width={18} />
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
  id,
  name,
  role,
  phone,
  refetch,
}: {
  id: number;
  name: string;
  role: string;
  phone: string;
  refetch: () => void;
}) {
  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return fetch(`/api/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: formData.get("name"),
          role: formData.get("role"),
          phone: Number(formData.get("phone")),
        }),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      refetch(); // 🔥 refresh table immediately
    },
  });

  function handleSubmit(e: any) {
    e.preventDefault();

    const form = new FormData(e.target);
    updateMutation.mutate(form);

    document.getElementById(`close-dialog-${id}`)?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
          <UserPen width={18} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes here and save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input name="name" defaultValue={name} />
            </div>

            <div className="grid gap-3">
              <Label>Role</Label>
              <Input name="role" defaultValue={role} />
            </div>

            <div className="grid gap-3">
              <Label>Phone</Label>
              <Input name="phone" defaultValue={phone} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" id={`close-dialog-${id}`}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export interface User {
  id: number;
  name: string;
  role: string;
  phone: string;
}
