import { Camera, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-blue-50">
            <img
              src="https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTQxMjk5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => toast.info("Photo upload feature")}
            className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl mb-1">Sarah Anderson</h1>
          <p className="text-gray-600">sarah.anderson@gmail.com</p>
          <p className="text-sm text-gray-500 mt-1">Member since March 2024</p>
        </div>

        {/* Edit Profile Button */}
        <Button
          onClick={() => navigate("/edit-profile")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}