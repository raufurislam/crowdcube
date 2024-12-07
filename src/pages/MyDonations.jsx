import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProviders";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const MyDonations = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://assignment-10-raufur-server.vercel.app/myDonations?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setDonations(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (!donations.length) {
    return (
      <div className="text-center">
        <p className="text-2xl font-semibold mb-4 mt-6">No donations found.</p>
        <Link to="/campaigns" className="btn btn-accent">
          Donate Now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-6">My Donations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {donation.campaignTitle}
            </h2>
            <p className="text-gray-600 mt-2">
              <strong>Amount:</strong> ${donation.amount}
            </p>
            <p className="text-gray-600">
              <strong>Date:</strong>{" "}
              {new Date(donation.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Campaign:</strong> {donation.campaignName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
