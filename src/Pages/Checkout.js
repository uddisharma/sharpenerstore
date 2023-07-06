import React, { useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
// import Razorpay from 'razorpay';
const Checkout = () => {
  const cartdata = useSelector((state) => state.cartitems);
  const [delivery, setDelivery] = useState("regular");
  let extisingorders = JSON.parse(localStorage.getItem("order"));
  let orders = extisingorders ? extisingorders : [];
  const user = localStorage.getItem("user");

  let subTotal = useMemo(() => {
    return cartdata.reduce((total, val) => total + val.quantity * val.price, 0);
  }, [cartdata]);
  const [data, setData] = useState({
    email: user,
    phone: "",
    address: "",
    state: "",
    zipcode: "",
    amount: subTotal + 60,
    order: cartdata,
  });
  const { name, email, phone, address, state, zipcode, amount } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setData({ ...data, state: event.target.value });
  };
  //payment gateway
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const makePayment = async (amount) => {
    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      address == "" ||
      state == "" ||
      zipcode == ""
    ) {
      toast.error("All Fields are required");
    } else {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("tracsaction failed");
        return;
      }
      const options = {
        key: "rzp_test_1ZKrAXvsXDbLn3",
        currency: "INR",
        amount: amount * 100,
        name: "Sharpener Tech",
        description: "thanks for purchase",
        image:
          "https://media.licdn.com/dms/image/D560BAQGJPYxS_BWFig/company-logo_200_200/0/1667289399127?e=1696464000&v=beta&t=qrtojieoX3TXKktUK0AbiQtVEHHjoDq05PW9V810egg",
        handler: function (res) {
          console.log(res.razorpay_payment_id);
          if (res.razorpay_payment_id) {
            orders.push(data);
            localStorage.setItem("order", JSON.stringify(orders));
            toast.success("Successfully Orderd");
          } else {
            toast.error("Order Failed");
          }
        },
        prefill: {
          name: user.fullname,
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" class="text-2xl font-bold text-gray-800">
          sneekpeeks
        </a>
        <div class="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div class="relative">
            <ul class="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span class="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span class="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li class="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span class="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div class="px-4 pt-8">
          <p class="text-xl font-medium">Order Summary</p>
          <p class="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartdata
              ? cartdata.map((e) => (
                  <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img
                      class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={e.images[0]}
                      alt=""
                    />
                    <div class="flex w-full flex-col px-4 py-4">
                      <span class="font-semibold">{e.title}</span>
                      <span class="float-right text-gray-400">{e.brand}</span>
                      <p class="text-lg font-bold">₹{e.price}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>

          <p class="mt-8 text-lg font-medium">Shipping Methods</p>
          <form class="mt-5 grid gap-6">
            <div
              onClick={() => {
                setDelivery("premium");
                setData({
                  ...data,
                  amount: subTotal + 120,
                });
              }}
              class="relative"
            >
              <input
                class="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                checked
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_1"
              >
                <img
                  class="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Premium Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: Next Day
                  </p>
                </div>
              </label>
            </div>
            <div
              onClick={() => {
                setDelivery("regular");
                setData({
                  ...data,
                  amount: subTotal + 60,
                });
              }}
              class="relative"
            >
              <input
                class="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                for="radio_2"
              >
                <img
                  class="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div class="ml-5">
                  <span class="mt-2 font-semibold">Regular Delivery</span>
                  <p class="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p class="text-xl font-medium">Payment Details</p>
          <p class="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div class="">
            <label for="email" class="mt-4 mb-2 block text-sm font-medium">
              Email
            </label>
            <div class="relative">
              <input
                disabled
                value={user}
                onChange={handleChange}
                type="text"
                id="email"
                name="email"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              for="card-holder"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Your Name
            </label>
            <div class="relative">
              <input
                type="text"
                value={name}
                onChange={handleChange}
                id="name"
                name="name"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              for="card-holder"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <div class="relative">
              <input
                value={phone}
                onChange={handleChange}
                type="text"
                id="card-holder"
                name="phone"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full Phone Number here"
              />
              <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              for="billing-address"
              class="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div class="flex flex-col sm:flex-row">
              <div class="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  value={address}
                  onChange={handleChange}
                  id="billing-address"
                  name="address"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    class="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <select
                class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value="State">State</option>
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Utter Pardesh">Utter Pardesh</option>
                <option value="Himachal Pardesh">Himachal Pardesh</option>
              </select>

              <input
                value={zipcode}
                onChange={handleChange}
                type="text"
                name="zipcode"
                class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                <p class="font-semibold text-gray-900">₹{subTotal}</p>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Shipping</p>
                <p class="font-semibold text-gray-900">
                  ₹ {delivery == "regular" ? 60 : 120}
                </p>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">
                ₹{subTotal + (delivery == "regular" ? 60 : 120)}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              makePayment(subTotal + (delivery == "regular" ? 60 : 120));
            }}
            // onClick={() => {
            //   handlepayment();
            // }}
            class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
