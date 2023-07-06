import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getData = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/products")
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
  }, []);
  const deleteproduct = (id) => {
    axios
      .delete(`http://localhost:8080/products/${id}`)
      .then((res) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",

          width: "50%",
          margin: "auto",
        }}
      >
        <h2 className="my-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Products
        </h2>
        <Link to="/admin/add-product">
          <button className="flex h-[30pxs] mt-[20px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add Product
          </button>
        </Link>
      </div>
      {loading ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <img
            src="https://media.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"
            alt="not found"
          />
        </div>
      ) : error ? (
        "something went wrong Retrying...."
      ) : (
        <div class="container m-auto mb-16 relative overflow-x-auto shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product name
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Brand
                </th>
                <th scope="col" class="px-6 py-3">
                  Stock
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((e) => (
                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {e.title}
                      </th>
                      <td class="px-6 py-4">{e.price} Rs</td>
                      <td class="px-6 py-4">{e.brand}</td>
                      <td class="px-6 py-4">{e.stock}</td>
                      <td class="px-6 py-4">
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteproduct(e.id);
                          }}
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  ))
                : "no product"}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Products;
