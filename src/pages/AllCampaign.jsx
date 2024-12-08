import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const AllCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment-10-raufur-server.vercel.app/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Toggle sort order
  const handleSort = () => {
    const newSortOrder = !isAscending;
    setIsAscending(newSortOrder);

    // Sort campaigns array based on the new sort order
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      return newSortOrder
        ? a.minimumDonation - b.minimumDonation
        : b.minimumDonation - a.minimumDonation;
    });

    setCampaigns(sortedCampaigns);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="lg:text-4xl md:text-3xl text-2xl text-secondary text-center font-bold mb-5">
        All Campaigns
      </h1>
      <div className="flex text-center justify-center items-center">
        {/* <h1 className="text-lg font-semibold">Sort by:</h1> */}
        <button onClick={handleSort} className="btn btn-primary mb-6">
          Minimum donation amount {isAscending ? "↑" : "↓"}
        </button>
      </div>

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
              <th>Min. Donation</th>
              <th>Campaign Creator</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr key={campaign._id} className="hover:bg-base-300">
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
                <td>${campaign.userName}</td>

                <td className="text-right flex justify-end gap-2 mt-6">
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

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {campaigns.map((campaign, index) => (
          <div
            key={campaign._id}
            className=" shadow-md rounded-lg p-4 bg-base-300"
          >
            <div className="mb-2">
              <img
                src={campaign.image}
                alt=""
                className="w-full h-44 object-cover rounded-lg"
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
              <span className="font-bold">Deadline:</span>{" "}
              {new Date(campaign.deadline).toLocaleDateString()}
            </div>
            <div className="mb-2">
              <span className="font-bold">Minimum Donation:</span> $
              {campaign.minimumDonation}
            </div>
            <div className="mt-2 flex items-center">
              <Link
                to={`/campaign/${campaign._id}`}
                className="btn btn-sm btn-primary w-full"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCampaign;
