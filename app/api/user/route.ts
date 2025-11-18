export async function GET() {
  const users = [
    {
      id: 1,
      name: "Chandan",
      role: "Frontend Developer",
      phone: "+91 8257083748",
    },
    {
      id: 2,
      name: "Aakash",
      role: "Backend Developer",
      phone: "+91 9487493751",
    },
    { id: 3, name: "Rahul", role: "UI/UX Designer", phone: "+91 84037489374" },
  ];

  return Response.json(users);
}
