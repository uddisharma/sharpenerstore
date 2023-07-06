import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Products from "../Components/Products";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userLogin = localStorage.getItem("userlogin");
  const getData = () => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setLoading(false);
        setData(res.data);
        if (res.status !== 200) {
          return setError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  useEffect(() => {
    getData();
    localStorage.setItem("userlogin", userLogin == "true" ? true : false);
  }, []);

  if (userLogin == "false") {
    return <Navigate to="/login" />;
  } else {
    return (
      <div style={{ width: "100%" }}>
        <Swiper navigation={true} modules={[Navigation]} loop>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/28/6107d28b-2bcb-44e6-9743-655b54550b8f1659020199598-Workwear_Desk--1-.jpg"
              alt="not found"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg"
              alt="not found"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "60vh" }}
              src="https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk.jpg"
              alt="not found"
            />
          </SwiperSlide>
        </Swiper>
        <Products data={data} loading={loading} error={error} />
      </div>
    );
  }
};

export default Home;
