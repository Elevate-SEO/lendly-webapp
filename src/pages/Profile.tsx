import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  phone: string;
  address: string;
  district: string;
  state: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [profile, setProfile] = useState<UserProfile>({
    phone: "",
    address: "",
    district: "",
    state: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const uname = parsedUser.user.username;

    setUsername(uname);

    fetchProfile(uname);
  }, [navigate]);

  const fetchProfile = async (uname: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/profile/${uname}`);

      if (res.data.user) {
        setProfile({
          phone: res.data.user.phone || "",
          address: res.data.user.address || "",
          district: res.data.user.district || "",
          state: res.data.user.state || "",
        });

        if (
          res.data.user.phone ||
          res.data.user.address ||
          res.data.user.district ||
          res.data.user.state
        ) {
          setIsNewUser(false);
        }
      }
    } catch (err) {
      console.log("Profile not found");
      setIsNewUser(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:3000/api/profile", {
        username,
        ...profile,
      });

      setIsNewUser(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading Profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex justify-center py-16 px-4">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8">

          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            {isNewUser ? "Complete Your Profile" : "Your Profile"}
          </h1>

          {/* Username */}
          <div className="mb-8 text-center">
            <p className="text-sm text-gray-500">Username</p>
            <p className="text-xl font-semibold text-gray-800">{username}</p>
          </div>

          {isNewUser ? (
            <form onSubmit={handleSubmit} className="space-y-5">

              {["phone", "address", "district", "state"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize text-gray-700">
                    {field}
                  </label>

                  <input
                    type="text"
                    name={field}
                    value={profile[field as keyof UserProfile]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Save Profile
              </button>

            </form>
          ) : (
            <div className="space-y-10">

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-800">{profile.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">District</p>
                  <p className="font-semibold text-gray-800">{profile.district}</p>
                </div>

                <div className="">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-semibold text-gray-800">{profile.address}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">State</p>
                  <p className="font-semibold text-gray-800">{profile.state}</p>
                </div>

              </div>

              <button
                onClick={() => setIsNewUser(true)}
                className="w-full mt-6 bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-black transition"
              >
                Edit Profile
              </button>

            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;