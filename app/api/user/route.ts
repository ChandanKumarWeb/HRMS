export async function GET() {
  const users = [
    { id: 1, name: "Chandan", role: "Frontend Developer" },
    { id: 2, name: "Amit", role: "Backend Developer" },
    { id: 3, name: "Rahul", role: "UI/UX Designer" },
  ];

  return Response.json(users);
}
