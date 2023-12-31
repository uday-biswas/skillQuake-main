//before return statement
//create a state for reviews and loading, fetch the reviews from the api and set the reviews state whenever the page loads
//during the return statement
//create a swiper component and pass each review as a swiper slide using map function

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import React, { useEffect, useState, useRef } from "react";
import { ratingsEndpoints } from "../../services/api";
import { apiConnector } from "../../services/apiConnector";
import RatingStars from "../common/RatingStars";

const RatingSlider = () => {
  const [Reviews, setReviews] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      //   setLoading(true);
      try {
        const res = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        setReviews(res.data.data);
        console.log("The reviews are: ", res);
      } catch (error) {
        console.log("review fetching error : ", error.message);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, []);

  if (Loading) {
    //if the reviews are still loading, then show loading , otherwise the swiper can't get the data correctly
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          // disableOnInteraction: true,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwipe"
      >
        {/* <SwiperSlide>slide 1</SwiperSlide>
        <SwiperSlide>slide 2</SwiperSlide>
        <SwiperSlide>slide 3</SwiperSlide>
        <SwiperSlide>slide 4</SwiperSlide>
        <SwiperSlide>slide 5</SwiperSlide>
        <SwiperSlide>slide 6</SwiperSlide>
        <SwiperSlide>slide 7</SwiperSlide> */}

        {Reviews?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="w-60 flex flex-col gap-3 min-h-[150px] bg-richblack-800 p-3 text-[14px] text-richblack-25">
              <div className="flex items-center gap-4">
                <img
                  src={review?.user?.image}
                  alt="user"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-richblack-5">
                    {review?.user?.firstName} {review?.user.lastName}
                  </h3>
                  <p className="text-[12px] font-medium text-richblack-500">
                    {review?.course?.courseName}
                  </p>
                </div>
              </div>
              <div className="font-medium text-richblack-25">
                {review?.review.slice(0, 50)}...
              </div>
              <RatingStars Review_Count={review?.rating} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RatingSlider;
