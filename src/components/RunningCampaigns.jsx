/* eslint-disable react/prop-types */
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
    <div className="max-w-screen-xl lg:px-2 px-4 mx-auto py-10">
      <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-secondary text-center mb-6 md:mb-8">
        Running Campaigns
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign) => (
          <div key={campaign._id} className="card bg-base-300 shadow-md">
            <figure>
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body px-5">
              <h3 className="card-title font-semibold">{campaign.title}</h3>
              <p className="text-sm text-gray-500">{campaign.description}</p>
              <p className="text-sm font-semibold ">
                Deadline: {new Date(campaign.deadline).toLocaleDateString()}
              </p>
              <p className="font-medium">
                Minimum Donation: ${campaign.minimumDonation}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/campaign/${campaign._id}`}
                  className="btn btn-md btn-primary w-full mt-2"
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
