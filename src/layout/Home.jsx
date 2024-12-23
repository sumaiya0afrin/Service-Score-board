import Banner from "../components/Banner";
import Counter from "../components/Counter";
import Partner from "../components/Partner";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <Partner />
        <Counter />
      </div>
    </div>
  );
};

export default Home;
