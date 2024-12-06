import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AllCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/campaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl text-center font-bold mb-8">All Campaigns</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Deadline</th>
              <th>Minimum Donation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={campaign._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{campaign.title}</td>
                <td>{campaign.type}</td>
                <td>{new Date(campaign.deadline).toLocaleDateString()}</td>
                <td>${campaign.minimumDonation}</td>
                <td>
                  <Link
                    to={`/campaign/${campaign._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    See More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCampaign;
