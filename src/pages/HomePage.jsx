import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import RunningCampaigns from "../components/RunningCampaigns";

const HomePage = () => {
  const campaigns = useLoaderData();

  // Filter running campaigns (those with future deadlines)
  const runningCampaigns = campaigns.filter((campaign) => {
    const currentDate = new Date();
    return new Date(campaign.deadline) >= currentDate;
  });

  return (
    <div>
      {/* Banner */}
      <Banner />
      {/* Running Campaigns */}
      <RunningCampaigns campaigns={runningCampaigns.slice(0, 6)} />{" "}
      {/* Limit to 6 */}
    </div>
  );
};

export default HomePage;
