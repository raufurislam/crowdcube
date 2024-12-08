import { useState } from "react";
import Swal from "sweetalert2";

const Faq = () => {
  const [thought, setThought] = useState("");

  const handleSend = () => {
    if (thought.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please write your thought before submitting!",
      });
      return;
    }

    // Clear the input and show a success alert
    setThought("");
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your thought has been submitted successfully.",
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-2 flex flex-col gap-3">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-secondary text-center lg:mb-6 mb-3 mt-10">
        Frequently Asked Questions
      </h1>
      <div className="collapse collapse-plus bg-base-300 shadow-sm">
        <input type="radio" name="faq-accordion" defaultChecked />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          How can I donate to a campaign?
        </div>
        <div className="collapse-content">
          <p className="text-sm">
            Click the "Donate Now" button on the campaign page and follow the
            instructions to complete your donation.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-300 shadow-sm">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          Is my donation secure?
        </div>
        <div className="collapse-content">
          <p className="text-sm">
            Yes, all donations are processed through a secure payment gateway,
            ensuring your data is safe and private.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-300 shadow-sm">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          How can I track the progress of my donations?
        </div>
        <div className="collapse-content">
          <p className="text-sm">
            You can track all your donations in the "My Donations" section,
            including campaign details and contribution history.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-300 shadow-sm">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          What happens if a campaign doesn't reach its goal?
        </div>
        <div className="collapse-content">
          <p className="text-sm">
            If a campaign doesn’t reach its goal, the funds raised will still be
            used for the campaign’s cause, ensuring they make an impact.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-300 shadow-sm">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title lg:text-xl text-lg font-medium">
          Can I edit my campaign after submitting it?
        </div>
        <div className="collapse-content">
          <p className="text-sm">
            Yes, you can edit your campaign details from the "My Campaigns"
            section.
          </p>
        </div>
      </div>
      {/* Extra Questions */}
      <div className="grid grid-cols-1 mt-5 shadow-sm">
        <div>
          <h3 className="lg:text-xl text-lg font-semibold">
            Have more questions? Share your thoughts with us!
          </h3>
        </div>
        <div className="join mt-3">
          <textarea
            className="textarea textarea-bordered h-20 join-item w-full"
            placeholder="Your thought"
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          />
          <button className="btn join-item w-28 h-auto" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faq;
