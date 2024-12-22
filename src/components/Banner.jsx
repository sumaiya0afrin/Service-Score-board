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
    autoplay: true,
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
                  <p className="md:w-3/4 text-sm md:text-base">{slide.desc}</p>
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
  );
};

export default Banner;
