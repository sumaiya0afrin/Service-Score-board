import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
// import { Card, HStack, Stack, Text } from "@chakra-ui/react";
import { Rating } from "@/components/ui/rating";
// import { Avatar } from "@/components/ui/avatar";

const TopReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    beforeChange: (current, next) => setCenterIndex(next),
    responsive: [
      {
        breakpoint: 1024, // Large screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    fetch("https://service-score-board-server.vercel.app/review")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching review:", error));
  }, []);

  const topReviews = reviews.filter((review) => review.rating >= 3);

  return (
    <div className="space-y-12 mt-12 md:mt-20">
      <div className=" space-y-3 max-w-screen-lg mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center lg:text-left">
          <em>Top Reviews</em>
        </h2>
        <p className="text-base md:text-lg text-center lg:text-left">
          See what our customers are saying about their experiences
        </p>
      </div>

      <Slider {...settings}>
        {topReviews.map((review, index) => (
          <div
            key={index}
            className={`transition-transform duration-500 ${
              index === centerIndex
                ? "scale-105 opacity-100 z-10"
                : "scale-90 opacity-60 z-0"
            } flex items-center justify-center px-4`}
          >
            <div
              className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto flex flex-col justify-between"
              style={{ height: "250px" }} // Fixed height for all cards
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.userPhoto}
                  alt={review.userMail}
                  className="w-12 h-12 rounded-full border border-gray-700"
                />
                <div className="ml-4">
                  <h4 className="text-white font-semibold text-lg capitalize">
                    {review.userName}
                  </h4>
                  <Rating
                    colorPalette="orange"
                    readOnly
                    size="xs"
                    value={review.rating}
                  />
                </div>
              </div>
              <p className="text-gray-300 text-sm overflow-hidden line-clamp-4">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopReviews;
