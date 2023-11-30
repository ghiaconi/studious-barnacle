import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 space-y-3">
      <h1 className="text-6xl font-semibold">404</h1>
      <p className="text-xl">Page not found</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
