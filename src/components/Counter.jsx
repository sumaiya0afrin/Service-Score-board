import CountUp from "react-countup";
import { FaUsers } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { MdReviews } from "react-icons/md";

const Counter = () => {
  return (
    <div className="mt-12 md:mt-28">
      <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center gap-4">
        <CountUp start={0} end={100} delay={0}>
          {({ countUpRef }) => (
            <div className="justify-items-center">
              <FaUsers className="text-4xl md:text-5xl text-primaryColor" />
              <h4 className="uppercase text-gray-900 text-xl md:text-3xl font-medium">
                users
              </h4>
              <span ref={countUpRef} className="md:text-2xl" />
            </div>
          )}
        </CountUp>

        <CountUp start={0} end={800} delay={0}>
          {({ countUpRef }) => (
            <div className="justify-items-center">
              <MdReviews className="text-4xl md:text-5xl text-primaryColor" />
              <h4 className="uppercase text-gray-900 text-xl md:text-3xl font-medium">
                reviews
              </h4>
              <span ref={countUpRef} className="md:text-2xl" />
            </div>
          )}
        </CountUp>

        <CountUp start={0} end={40} delay={0}>
          {({ countUpRef }) => (
            <div className="justify-items-center col-span-2 md:col-span-1">
              <GrServices className="text-4xl md:text-5xl text-primaryColor" />
              <h4 className="uppercase text-gray-900 text-xl md:text-3xl font-medium">
                Services
              </h4>
              <span ref={countUpRef} className="md:text-2xl" />
            </div>
          )}
        </CountUp>
      </div>
    </div>
  );
};

export default Counter;
