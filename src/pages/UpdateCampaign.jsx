import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProviders";
import Swal from "sweetalert2";
import Loading from "./Loading";

const UpdateCampaign = () => {
  const { id } = useParams(); // Get the campaign ID from the route
  const { user } = useContext(AuthContext); // Get the logged-in user's info
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);

  // Fetch the campaign details
  useEffect(() => {
    fetch(`https://assignment-10-raufur-server.vercel.app/campaigns/${id}`)
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
      image: form.image.value,
      type: form.type.value,
      description: form.description.value,
      minimumDonation: parseInt(form.minimumDonation.value, 10),
      deadline: form.deadline.value,
    };

    fetch(`https://assignment-10-raufur-server.vercel.app/campaigns/${id}`, {
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
    return <Loading />;
  }

  return (
    <div className="max-w-screen-xl mx-auto lg:px-2 px-4 p-5">
      <div className="bg-base-300 p-8 rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-7 text-center text-secondary">
          Update Campaign
        </h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-bold">Title:</label>
            <input
              name="title"
              type="text"
              defaultValue={campaign.title}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-bold">PhotoUrl</label>
            <input
              name="image"
              type="text"
              defaultValue={campaign.image}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Type:</label>
            <input
              name="type"
              type="text"
              defaultValue={campaign.type}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Description:</label>
            <textarea
              name="description"
              defaultValue={campaign.description}
              className="input input-bordered w-full"
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-bold">Minimum Donation:</label>
            <input
              name="minimumDonation"
              type="number"
              defaultValue={campaign.minimumDonation}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-bold">Deadline:</label>
            <input
              name="deadline"
              type="date"
              defaultValue={campaign.deadline}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-bold">User Name:</label>
            <input
              type="text"
              value={campaign.userName}
              className="input input-bordered w-full "
              readOnly
              disabled
            />
          </div>
          <div>
            <label className="block font-bold">User Email:</label>
            <input
              type="email"
              value={campaign.userEmail}
              className="input input-bordered w-full "
              disabled
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
    </div>
  );
};

export default UpdateCampaign;
