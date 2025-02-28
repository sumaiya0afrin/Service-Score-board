import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaUsers } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { MdReviews } from "react-icons/md";

const Counter = () => {
  const [userCount, setUserCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    fetch("https://service-score-board-server.vercel.app/service")
      .then((response) => response.json())
      .then((data) => {
        setServiceCount(data.length || 0);
      })
      .catch((error) => console.error("Error fetching service count:", error));
  }, []);

  useEffect(() => {
    fetch("https://service-score-board-server.vercel.app/review")
      .then((response) => response.json())
      .then((data) => {
        setReviewCount(data.length || 0);
      })
      .catch((error) => console.error("Error fetching service count:", error));
  }, []);

  useEffect(() => {
    fetch("https://service-score-board-server.vercel.app/user")
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length || 0);
      })
      .catch((error) => console.error("Error fetching service count:", error));
  }, []);
  return (
    <div className="mb-14 md:mb-20 lg:mb-24 bg-gray-900 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4">
        <CountUp start={0} end={userCount} delay={0}>
          {({ countUpRef }) => (
            <div className="justify-items-center">
              <FaUsers className="text-4xl md:text-5xl text-primaryColor" />
              <h4 className="uppercase text-white text-xl md:text-3xl font-medium">
                users
              </h4>
              <span ref={countUpRef} className="md:text-2xl text-white" />
            </div>
          )}
        </CountUp>

        <CountUp start={0} end={reviewCount} delay={0}>
          {({ countUpRef }) => (
            <div className="justify-items-center">
              <MdReviews className="text-4xl md:text-5xl text-primaryColor" />
              <h4 className="uppercase text-white text-xl md:text-3xl font-medium">
                reviews
              </h4>
              <span ref={countUpRef} className="md:text-2xl text-white" />
            </div>
          )}
        </CountUp>

        <CountUp start={0} end={serviceCount} delay={0}>
          {({ countUpRef }) => (
            <div className="justify-items-center col-span-2 md:col-span-1">
              <GrServices className="text-4xl md:text-5xl text-primaryColor" />
              <h4 className="uppercase text-white text-xl md:text-3xl font-medium">
                Services
              </h4>
              <span ref={countUpRef} className="md:text-2xl text-white" />
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default Counter;
