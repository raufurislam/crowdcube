import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProviders";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const MyCampaign = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's info
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://assignment-10-raufur-server.vercel.app/myCampaigns?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCampaigns(data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center">
        <p className="text-2xl font-semibold mb-4 mt-6">
          No campaigns found for your account.
        </p>
        <Link to="/addCampaign" className="btn btn-accent">
          Add Campaign
        </Link>
      </div>
    );
  }

  const handleUpdate = (id) => {
    window.location.href = `/updateCampaign/${id}`;
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://assignment-10-raufur-server.vercel.app/campaigns/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Your campaign has been deleted.",
                "success"
              );
              setCampaigns(campaigns.filter((campaign) => campaign._id !== id));
            }
          })
          .catch((error) => console.error(error));
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto py-6 lg:px-2 px-4">
      <h1 className="lg:text-4xl md:text-3xl text-2xl text-secondary text-center font-bold mb-6">
        My Campaigns
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Minimum Donation</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={campaign._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={campaign.image}
                    alt=""
                    className="h-20 w-32 object-cover"
                  />
                </td>
                <td className="font-medium">{campaign.title}</td>
                <td>{campaign.type}</td>
                <td>{new Date(campaign.deadline).toLocaleDateString()}</td>
                <td>${campaign.minimumDonation}</td>
                <td className="text-right flex justify-end gap-2 mt-6">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdate(campaign._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(campaign._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {campaigns.map((campaign, index) => (
          <div
            key={campaign._id}
            className="bg-white shadow-md rounded-lg p-4 border"
          >
            <div className="mb-2">
              <img
                src={campaign.image}
                alt=""
                className="w-full h-44 object-cover"
              />
              {/* <span className="font-bold">Title:</span> */}
            </div>
            <div className="mt-4 mb-2 font-bold text-xl">
              <span className="">#</span> {index + 1}
            </div>
            <div className="mb-2">
              <span className="font-bold">Title:</span> {campaign.title}
            </div>
            <div className="mb-2">
              <span className="font-bold">Type:</span> {campaign.type}
            </div>
            <div className="mb-2">
              <span className="font-bold">Minimum Donation:</span> $
              {campaign.minimumDonation}
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4">
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={() => handleUpdate(campaign._id)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-error w-full"
                onClick={() => handleDelete(campaign._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampaign;
