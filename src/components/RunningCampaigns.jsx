import { Link } from "react-router-dom";

const RunningCampaigns = ({ campaigns }) => {
  if (!campaigns || campaigns.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No campaigns are currently running.
      </p>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Running Campaigns</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="card bg-green-50 shadow-md">
            <figure>
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{campaign.title}</h3>
              <p className="text-sm text-gray-600">{campaign.description}</p>
              <p className="text-sm font-semibold text-gray-700">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Minimum Donation: ${campaign.minimumDonation}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/campaign/${campaign._id}`}
                  className="btn btn-sm btn-accent"
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right mt-10 ">
        <Link to="/campaigns" className="btn btn-primary w-full">
          See all Campaign
        </Link>
      </div>
    </div>
  );
};

export default RunningCampaigns;
