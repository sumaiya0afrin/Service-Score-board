import loading from "../assets/loading.gif";
const Loading = () => {
  return (
    <div className="max-w-screen-xl mx-auto min-h-screen flex justify-center items-center">
      <img src={loading} alt="" className="w-1/2" />
    </div>
  );
};

export default Loading;
