import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center mt-10 space-y-6">
      <h1 className="text-4xl font-bold">Welcome to the React Auth App</h1>
      <p className="text-lg text-gray-600">
        Register, login, and explore user features with role-based access.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
