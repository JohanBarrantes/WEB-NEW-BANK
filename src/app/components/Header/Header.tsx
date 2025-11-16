import Link from "next/link";

export default function Header() {
  return (
    <header className="p-4 flex gap-4 bg-gray-100 dark:bg-gray-800">
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </header>
  );
}
