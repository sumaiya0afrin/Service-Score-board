import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../assets/banner/slide1.png";
import slide2 from "../assets/banner/slide2.png";
import slide3 from "../assets/banner/slide3.png";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    {
      image: slide1,
      text: "Your voice matters—share your experiences and help us improve.",
      desc: "This highlights the importance of user participation and feedback. It encourages individuals to share their experiences, emphasizing how their contributions can lead to meaningful improvements in the service or product being reviewed.",
    },
    {
      image: slide2,
      text: "Authentic feedback you can rely on to make the right choice.",
      desc: "This emphasizes the reliability and trustworthiness of the feedback provided on the platform. It reassures users that the reviews are genuine, helping them make informed and confident decisions when choosing a service or product.",
    },
    {
      image: slide3,
      text: "Building trust and transparency, one review at a time.",
      desc: "This reflects the platform's commitment to fostering a transparent and trustworthy environment. It underlines the idea that every review contributes to creating a reliable community where users can confidently engage and share their honest opinions.",
    },
  ];
  return (
    <div>
      <div className="bg-gray-900">
        <div className="max-w-screen-xl mx-auto w-full">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`flex items-center justify-center pt-40 content-end bg-gradient-to-r from-${slide.fromColor}-500 to-${slide.toColor}-600`}
              >
                <div className=" text-white px-4 flex flex-col lg:flex-row items-center justify-center">
                  <div className="space-y-4">
                    <h2 className="text-xl md:text-4xl font-bold">
                      {slide.text}
                    </h2>
                    <p className="md:w-3/4 text-sm md:text-base">
                      {slide.desc}
                    </p>
                    <button className="btn bg-transparent border-primaryColor text-primaryColor border-dashed uppercase hover:bg-gray-900 hover:text-white">
                      Learn More
                    </button>
                  </div>
                  <img src={slide.image} alt="" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="-mt-2 lg:-mt-14"
      >
        <path
          fill=" #111827"
          fillOpacity="1"
          d="M0,192L26.7,192C53.3,192,107,192,160,160C213.3,128,267,64,320,58.7C373.3,53,427,107,480,138.7C533.3,171,587,181,640,160C693.3,139,747,85,800,90.7C853.3,96,907,160,960,170.7C1013.3,181,1067,139,1120,117.3C1173.3,96,1227,96,1280,96C1333.3,96,1387,96,1413,96L1440,96L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

export default Banner;
