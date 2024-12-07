import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProviders";
import Swal from "sweetalert2";

const UpdateCampaign = () => {
  const { id } = useParams(); // Get the campaign ID from the route
  const { user } = useContext(AuthContext); // Get the logged-in user's info
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);

  // Fetch the campaign details
  useEffect(() => {
    fetch(`http://localhost:5000/campaigns/${id}`)
      .then((res) => res.json())
      .then((data) => setCampaign(data))
      .catch((error) => console.error(error));
  }, [id]);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCampaign = {
      title: form.title.value,
      type: form.type.value,
      description: form.description.value,
      minimumDonation: parseInt(form.minimumDonation.value, 10),
      deadline: form.deadline.value,
    };

    fetch(`http://localhost:5000/campaigns/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", "Campaign updated successfully!", "success");
          navigate("/myCampaign");
        }
      })
      .catch((error) => console.error(error));
  };

  if (!campaign) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Update Campaign</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-bold">Title:</label>
          <input
            name="title"
            type="text"
            defaultValue={campaign.title}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Type:</label>
          <input
            name="type"
            type="text"
            defaultValue={campaign.type}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Description:</label>
          <textarea
            name="description"
            defaultValue={campaign.description}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold">Minimum Donation:</label>
          <input
            name="minimumDonation"
            type="number"
            defaultValue={campaign.minimumDonation}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">Deadline:</label>
          <input
            name="deadline"
            type="date"
            defaultValue={campaign.deadline}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold">User Name:</label>
          <input
            type="text"
            value={campaign.userName}
            className="w-full border p-2 rounded bg-gray-100"
            readOnly
          />
        </div>
        <div>
          <label className="block font-bold">User Email:</label>
          <input
            type="email"
            value={campaign.userEmail}
            className="w-full border p-2 rounded bg-gray-100"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
