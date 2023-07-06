import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  let orders = JSON.parse(localStorage.getItem("order"));
  orders =
    orders &&
    orders.filter((e) => {
      return e.email == user.email;
    });
  // console.log(orders);
  return (
    <div style={{ width: "80%", margin: "auto", paddingTop: "50px" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="px-4 sm:px-0"
      >
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Personal details
          </p>
        </div>
        <img style={{ height: "100px", width: "100px" }} src={user?.photo} />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.fullname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email Address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email}
            </dd>
          </div>
        </dl>
      </div>
      <br />
      <br />
      <h3 className="text-2xl font-semibold leading-7 text-gray-900">Orders</h3>
      <br />
      {orders
        ? orders.map((e) => (
            <div
              style={{
                border: "1px solid gray",
                borderRadius: "10px",
                margin: "20px",
              }}
            >
              {/* <div
                style={{
                  width: "50%",
                  margin: "auto",
                }}
                className="mt-6 border-t border-gray-100"
              >
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {e.name}
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Amount
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {e.amount}Rs
                    </dd>
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {e.address + e.zipcode + e.state}
                    </dd>
                  </div>
                </dl>
              </div> */}
              <h3>Total Amount : {e.amount}</h3>
              {e.order
                ? e.order.map((o) => (
                    <Link to={`/product/${o.id}`}>
                      <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                        <img
                          style={{ height: "70px", width: "70px" }}
                          src={o.images[0]}
                          alt="product-image"
                          class="w-full rounded-lg sm:w-40"
                        />
                        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div class="mt-5 sm:mt-0">
                            <h2 class="text-lg font-bold text-gray-900">
                              {o.title.slice(0, 15) + "..."}
                            </h2>
                            <p class="mt-1 text-4xs text-gray-700">{o.brand}</p>
                          </div>
                          <div class="mt-5 sm:mt-0">
                            <h2 class="text-lg font-bold text-gray-900">
                              Quantity
                            </h2>
                            <p class="mt-1 text-4xs text-gray-700">
                              {o.quantity}
                            </p>
                          </div>
                          <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {e.address}
                            </span>
                            <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {e.zipcode}
                            </span>

                            <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                              {e.state}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                : ""}
            </div>
          ))
        : "no orders till now"}
    </div>
  );
}
