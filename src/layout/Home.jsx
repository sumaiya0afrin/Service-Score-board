import Banner from "../components/Banner";
import Partner from "../components/Partner";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <Partner />
      </div>
    </div>
  );
};

export default Home;
