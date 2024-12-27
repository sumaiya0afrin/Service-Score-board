import Category from "@/components/Category";
import Banner from "../components/Banner";
import Counter from "../components/Counter";
import Partner from "../components/Partner";
import Feature from "@/components/Feature";
import TopReviews from "@/components/TopReviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="max-w-screen-xl mx-auto">
        <Category />
        <Feature />
        <Counter />
        <TopReviews />
        <Partner />
      </div>
    </div>
  );
};

export default Home;
