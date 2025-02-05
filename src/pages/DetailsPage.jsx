import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProviders";
import Swal from "sweetalert2";

const DetailsPage = () => {
  const campaign = useLoaderData(); // Fetch campaign details via loader
  const { user } = useContext(AuthContext); // Get logged-in user data

  const handleDonate = () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "You must log in to donate.",
      });
      return;
    }

    const currentDate = new Date();
    const deadlineDate = new Date(campaign.deadline);

    if (currentDate > deadlineDate) {
      Swal.fire({
        icon: "error",
        title: "Campaign Ended",
        text: "This campaign has ended and donations can no longer be made.",
      });
      return;
    }

    const donationData = {
      campaignId: campaign._id,
      campaignName: campaign.title,
      donorEmail: user.email,
      donorName: user.displayName,
      amount: campaign.minimumDonation, // Example donation amount
      date: new Date().toISOString(),
    };

    fetch("https://assignment-10-raufur-server.vercel.app/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            icon: "success",
            title: "Thank You!",
            text: "Your donation has been successfully added.",
          });
        }
      })
      .catch((error) => {
        console.error("Error donating:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 lg:px-2 px-4">
      <h1 className="text-4xl font-bold">{campaign.title}</h1>
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-64 object-cover my-4"
      />
      <p className="text-gray-700">{campaign.description}</p>
      <p className="font-semibold">Type: {campaign.type}</p>
      <p className="font-semibold">
        Minimum Donation: ${campaign.minimumDonation}
      </p>
      <p className="font-semibold">
        Deadline: {new Date(campaign.deadline).toLocaleDateString()}
      </p>
      <button onClick={handleDonate} className="mt-4 btn btn-primary">
        Donate
      </button>
    </div>
  );
};

export default DetailsPage;
