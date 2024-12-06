import { useLoaderData } from "react-router-dom";

const DetailsPage = () => {
  const campaign = useLoaderData();

  const handleDonate = () => {
    const donationData = {
      campaignId: campaign._id,
      userEmail: "user@example.com", // Replace with logged-in user email
      username: "John Doe", // Replace with logged-in user name
    };

    fetch("http://localhost:5000/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          alert("Donation successful!");
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
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
