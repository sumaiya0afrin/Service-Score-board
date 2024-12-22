import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
const Partner = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetch("partner.json")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          <em>Our Trusted Partners</em>
        </h2>
        <p className="text-base md:text-lg text-center">
          Collaborating with innovators and industry leaders to bring you the
          best.
        </p>
      </div>

      <Marquee className="space-x-3">
        <div className=" w-full">
          <div className="card max-w-7xl mx-auto">
            <div className="grid grid-cols-5 gap-3">
              {partners.map((partner, idx) => (
                <div key={idx} className="card bg-secondaryColor">
                  <figure className="px-4 pt-8">
                    <img src={partner.logo} className="w-28" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-white">{partner.name}</h2>
                    <p className="text-justify whitespace-normal overflow-hidden hyphens-auto md:text-base text-sm">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default Partner;
