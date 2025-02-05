import { useEffect, useState } from "react";
import img from "../assets/sad_tiny_man_sitting_on_huge_lightbulb_flat_vector_illustration-05.png";

const DonationCount = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetch(`https://assignment-10-raufur-server.vercel.app/totalDonations`)
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce((sum, donation) => {
          const amount = parseFloat(donation.amount) || 0;
          return sum + amount;
        }, 0);
        setTotalAmount(total);
      })
      .catch((error) =>
        console.error("Error fetching total donations:", error)
      );
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-secondary text-center">
        Spread love to those <br />
        <span className="lg:text-4xl md:text-3xl text-2xl font-bold">
          who need it
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
        {/* Image Section */}
        <div className="md:ml-20 lg:ml-40">
          <img
            src={img}
            alt="Spread love"
            className="w-full max-w-md mx-auto"
          />
        </div>
        {/* Text Section */}
        <div className="md:mr-20 lg:mr-40 mt-5 md:mt-0">
          <div className="text-center ">
            <h2 className="lg:text-3xl text-2xl  font-bold">We Collected</h2>
            <h1 className="text-7xl font-extrabold text-primary mt-4">
              ${totalAmount.toFixed(2)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCount;
