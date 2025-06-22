import { useEffect, useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import ImageModal from "../components/ImageModel";

function Profile() {
  const [user, setUser] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
    } catch (err) {}
    navigate("/login");
  };

  const imageSrc = user?.profileImage
    ? `http://localhost:4000${user.profileImage.split("backend")[1]}`
    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQApwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcDBAUCAf/EADgQAAICAQIDBAcFCAMAAAAAAAABAgMEBREGIUESMVFxEyIyUmHB0VNigZGxFCNyk6Gy4fAzQmP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ALSABpkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY8i+rGqlbkWRrrj3ykyM53GVcW44OPKa6TtfZ38kBKgQVcYah2t3VQ14bP6nVwOMMe2ShnVSo35ekj60fx6oCSg81yjZCM65RnGS3Ti90z0AAAAAAAAAAAAAAAAAAAAxZN9WNj2X3y7NcI7yZlIjxznPenAg9l/yWfHpFfqwOHrOrX6pkuc240xf7qtd0V9TnAFQAAHY4e1qzTL1XbJyxJv14vn2X7yLCjJTipxalGSTTXc0VKTngrOeRgTxbJbyofqv7j+j3IqRAAAAAAAAAAAAAAAAAAAVxxPY7Ndym/+slFfgkWOVvxNDsa7l/Gaf9EBzAAaQAAA7/BVjhrEodJ1STXlscA7/BUO1rLfu1S+RlU8AAAAAAAAAAAAAAAAAADu5kI45xXVqFWQl6lsOzv96P8Agm5o6zp0NUwJ483tL2oS92S6gVkDLk41uJfOjJg4WQezi/l4oxFAABMCYcCYrVeTlyXJ/u4/Hbm/kRnTsC/UcqOPjxbb9qW3KC8WWVg4teDiVY1O6hXHbzfVvzIrO+8AAAAAAAAAAAAAAAAAAAABp6jpmJqVXYyqu017M09pR8mRzJ4Ll2t8TNTj7t0Of5r6EqvyKMePayLa614zkkc23iXSKns8vtv/AMq5S+QVHlwdn787sfb+J/Q3MXgtJ75mY5L3KYbf1f0N9cWaTv7d38lmxTxHpNz2jmRi/C2Lj+qCN3CwsbBpVWLUq4d78W/i+psHiqyu2PapnCcfGDTPYUAAQAAAAAAAAAAAAAADna1q1OlYvpJrt2y5V1p+18fIDYz87GwKHdlWqEOnjLyXUh+pcWZV7lXgr9nq7u33zf0OLn5uRn5DvybHKb5LwivBLoa4Hu6yy6bnbZKcn1k92eACoAAYMuPkXY01PHusqkusHsSPTOLrYNV6lD0kPtYLaS811IuARa2NkU5VMbseyNlcu6UXuZSstK1TI0vI9LRLeL9ut+zNf71LC03Po1LEjkY75PlKL74PwZFbYAAAAAAAAAAAADBm5VWFi2ZF72hWt3t1+H4laalnXajlzyb360nsku6K8Ed/jfUHZkV4Fb9StduzbrJ9y/BfqRcAACpQAFAAAAAAOhoeqWaVmRtW7plyth7y+qOeCVYtiuyFtcbK5KUJJOMl1R7IvwTqDsx7MCx+tV61f8PVfn+pKCAAAAAAAAAeZyjCMpS5KK3b+HU9HP1+10aJnTjyfonFPw35fMCuszIll5V2RN7u2blz+JhALCgAKgAAAAAAAAACUjoaDlfser41re0e32J+T5FllSNtLdPZ9GWvj2emx6rftK4y/NbhWQAEAAAAAAORxa2uH8rb7v8AcgAK7ABYgACgAAAAAAAAAAD7i0NHe+k4Tf2EP7UfASkbgAI0AAI//9k=";

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <img
          src={imageSrc}
          alt="Profile"
          onClick={() => setPreviewOpen(true)}
          className="w-28 h-28 mx-auto rounded-full object-cover shadow-md cursor-pointer"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <span className="inline-block mt-2 px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
          {user.role}
        </span>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>

      <ImageModal src={imageSrc} open={previewOpen} setOpen={setPreviewOpen} />
    </div>
  );
}

export default Profile;
