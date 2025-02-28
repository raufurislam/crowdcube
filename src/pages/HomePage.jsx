import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import RunningCampaigns from "../components/RunningCampaigns";
import DonationCount from "../components/DonationCount";
import Faq from "../components/Faq";

const HomePage = () => {
  const campaigns = useLoaderData();

  // Filter running campaigns (those with future deadlines)
  const runningCampaigns = campaigns.filter((campaign) => {
    const currentDate = new Date();
    return new Date(campaign.deadline) >= currentDate;
  });

  return (
    <div className="lg:space-y-12 space-y-4">
      {/* Banner */}
      <Banner />
      {/* Running Campaigns */}
      <RunningCampaigns campaigns={runningCampaigns.slice(0, 6)} />{" "}
      {/* Limit to 6 */}
      <DonationCount></DonationCount>
      <Faq></Faq>
    </div>
  );
};

export default HomePage;
