import { Link } from "react-router-dom";
import error from "../assets/error.png";

const Error = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="flex items-center flex-col justify-center min-h-screen">
        <img src={error} alt="" />
        <h3 className="text-white uppercase text-4xl font_Cinzel">
          Page Not Found
        </h3>
        <p>
          Back to <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
