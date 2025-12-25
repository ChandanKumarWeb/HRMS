"use client";
import { useEffect } from "react";
class User {
  id: string;
  name: string;
  role: string;
  phone: string;
  isActive: boolean = true;

  constructor(id: string, name: string, role: string, phone: string) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.phone = phone;
  }
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
  userInfo(): string {
    if (this.isActive) {
      return `${this.name} (${this.role}) - ${this.phone} is Active`;
    } else {
      return `${this.name} (${this.role}) - ${this.phone} is Inactive`;
    }
  }
}
function Page() {
  useEffect(() => {
    const user = new User("1", "Alice", "Admin", "123-456-7890");
    console.log(`${user.userInfo()} User Class Example:`);
  }, []);

  return (
    <div>
      <h1>User Playground Page</h1>
      <button
        onClick={() => {
          const user = new User("2", "Bob", "User", "098-765-4321");
          console.log(`${user.userInfo()} User Class Example:`);
          user.toggleActive();
          console.log(`${user.userInfo()} After Toggling Active Status:`);
        }}
      >
        refresh
      </button>
    </div>
  );
}

export default Page;
