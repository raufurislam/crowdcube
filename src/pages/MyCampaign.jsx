import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProviders";
import Swal from "sweetalert2";

const MyCampaign = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's info
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myCampaigns?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCampaigns(data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (campaigns.length === 0) {
    return <p>No campaigns found for your account.</p>;
  }

  const handleUpdate = (id) => {
    // Redirect to an update page or show a modal for editing
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
        fetch(`http://localhost:5000/campaigns/${id}`, {
          method: "DELETE",
        })
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
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">My Campaigns</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Minimum Donation</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{campaign.title}</td>
              <td className="border px-4 py-2">{campaign.type}</td>
              <td className="border px-4 py-2">{campaign.minimumDonation}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleUpdate(campaign._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
  );
};

export default MyCampaign;
