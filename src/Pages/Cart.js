import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../Store/CartReducer";
import { Link } from "react-router-dom";

const Cart = () => {
  let cartdata = useSelector((state) => state.cartitems);
  const user = localStorage.getItem("user");
  cartdata = cartdata.filter((e) => {
    return e.user === user;
  });

  const dispatch = useDispatch();
  let subTotal = useMemo(() => {
    return cartdata.reduce((total, val) => total + val.quantity * val.price, 0);
  }, [cartdata]);

  return (
    <div>
      <body>
        <div class="h-screen bg-gray-100 pt-20">
          <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="rounded-lg md:w-2/3">
              {cartdata.length > 0
                ? cartdata.map((e) => (
                    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                      <img
                        src={e.images && e.images[0]}
                        alt="product"
                        class="w-full rounded-lg sm:w-40"
                      />
                      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div class="mt-5 sm:mt-0">
                          <h2 class="text-lg font-bold text-gray-900">
                            {e.title}
                          </h2>
                          <p class="mt-1 text-xs text-gray-700">{e.brand}</p>
                        </div>
                        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div class="flex items-center border-gray-100">
                            <span
                              onClick={() => {
                                if (e.quantity > 1) {
                                  dispatch(decrementQuantity(e.id));
                                }
                              }}
                              class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              -{" "}
                            </span>
                            {/* <input
                              class="h-8 w-8 border bg-white text-center text-xs outline-none"
                              type="number"
                              value="2"
                              min="1"
                            /> */}
                            <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {e.quantity}
                            </span>
                            <span
                              onClick={() => {
                                dispatch(incrementQuantity(e.id));
                              }}
                              class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                          <div class="flex items-center space-x-4">
                            <p class="text-sm">₹{e.price * e.quantity}</p>
                            <div
                              onClick={() => [
                                dispatch(removeFromCart(e.idMeal)),
                              ]}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : "no items in cart"}
            </div>
            {cartdata.length > 0 && (
              <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div class="mb-2 flex justify-between">
                  <p class="text-gray-700">Subtotal</p>
                  <p class="text-gray-700">₹{subTotal}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-700">Shipping</p>
                  <p class="text-gray-700">₹ 60</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                  <p class="text-lg font-bold">Total</p>
                  <div class="">
                    <p class="mb-1 text-lg font-bold">₹{subTotal + 60}</p>
                  </div>
                </div>
                <Link to="/checkout">
                  <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                    Check out
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </body>
    </div>
  );
};

export default Cart;
