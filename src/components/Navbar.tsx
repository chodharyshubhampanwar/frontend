import { FC } from "react";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const NavBar: FC = () => {
  const { user, signOut, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(() => {
        navigate("/signin");
      });
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Add your logo or brand name here */}
          </div>
          <div className="flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {loading ? "Signing out..." : "Sign out"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
