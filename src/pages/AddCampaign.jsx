import { useContext } from "react";
import { AuthContext } from "../provider/AuthProviders";
import Swal from "sweetalert2";

const AddCampaign = () => {
  const { user } = useContext(AuthContext);

  const handleAddCampaign = async (e) => {
    e.preventDefault();

    const image = e.target.image.value;
    const title = e.target.title.value;
    const type = e.target.type.value;
    const description = e.target.description.value;
    const minimumDonation = parseFloat(e.target.minimumDonation.value);
    const deadline = e.target.deadline.value;
    const userEmail = e.target.userEmail.value;
    const userName = e.target.userName.value;

    const newCampaign = {
      image,
      title,
      type,
      description,
      minimumDonation,
      deadline,
      userEmail,
      userName,
    };
    console.log(newCampaign);

    // send data to the server and database
    fetch("https://assignment-10-raufur-server.vercel.app/campaigns", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("successfully added");
          Swal.fire({
            title: "Success!",
            text: "Coffee added successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          e.target.reset();
        }
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-10 lg:px-2 px-4">
      <div className=" bg-base-300 p-8 rounded-lg shadow-lg">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-7 text-center text-secondary">
          Add New Campaign
        </h1>
        <form className="space-y-4" onSubmit={handleAddCampaign}>
          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block font-medium">
              Campaign Image/Thumbnail URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Campaign Title */}
          <div>
            <label htmlFor="title" className="block font-medium">
              Campaign Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter campaign title"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label htmlFor="type" className="block font-medium">
              Campaign Type
            </label>
            <select
              id="type"
              name="type"
              className="select select-bordered w-full"
              required
            >
              <option value="Personal Issue">Personal Issue</option>
              <option value="Startup">Startup</option>
              <option value="Business">Business</option>
              <option value="Creative Ideas">Social Development</option>
              <option value="Creative Ideas">Creative Ideas</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter campaign description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* Minimum Donation */}
          <div>
            <label htmlFor="minimumDonation" className="block font-medium">
              Minimum Donation Amount
            </label>
            <input
              type="number"
              id="minimumDonation"
              name="minimumDonation"
              placeholder="Enter minimum donation amount"
              className="input input-bordered w-full"
              min="1"
              step="0.01"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label htmlFor="deadline" className="block font-medium">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* User Email (Read Only) */}
          <div>
            <label htmlFor="userEmail" className="block font-medium">
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full"
              disabled
            />
          </div>

          {/* User Name (Read Only) */}
          <div>
            <label htmlFor="userName" className="block font-medium">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user?.displayName || "Anonymous"}
              readOnly
              className="input input-bordered w-full"
              disabled
            />
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Add Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
