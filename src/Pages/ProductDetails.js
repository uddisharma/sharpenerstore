import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "../Components/Details";
const ProductDetails = () => {
  const params = useParams();
  const [data,setData]= useState([])
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => [console.log(err)]);
  },[]);
  return <div>
    <Details data={data}/>
  </div>;
};

export default ProductDetails;
