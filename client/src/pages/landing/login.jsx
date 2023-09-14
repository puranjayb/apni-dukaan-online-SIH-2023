import LoginNavbar from "../../components/navbar/LoginNavbar";
import Navbar from "../../components/navbar/LoginNavbar";

export default function LoginPage() {
  return (
    <div className="div">
      <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-[#333333]">
        <LoginNavbar/>
        <div className="flex h-full w-full">
          <div className="absolute z-0 bottom-0">
            <img src="loginbg.png" alt="" className="h-[70vh]" />
          </div>
          <div className="h-full z-20 w-3/5">
            <div className="mt-20 h-full w-full text-white font-oldenburg text-right text-4xl">
              Dak Ghar Niryat Kendra
            </div>
          </div>
          {/*Sign*/}
          <div className="z-0 flex h-fit w-2/5 mx-1 my-3 items-center justify-center">
            <div className="flex relative border-2 border-black h-[88%] w-[80%] flex-col rounded-3xl bg-[#c7c7c7] px-10 py-8">
              <form action="flex ">
                <div className="flex w-full justify-center text-4xl font-notoSans mb-3">
                  Sign Up
                </div>
                <div className="flex w-full justify-center text-xl font-notoSans">
                  Not a member?{" "}
                  <a href="">
                    <strong>&nbsp;Sign up now</strong>
                  </a>
                </div>
                <div className="w-full h-16 my-2">
                  <input
                    className="bg-transparent p-3 border-2 placeholder-black rounded-lg border-black text-black font-medium outline-none w-full text-2xl"
                    type="name"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="w-full h-16 my-2">
                  <input
                    className="bg-transparent p-3 border-2 placeholder-black rounded-lg border-black text-black font-medium outline-none w-full text-2xl"
                    type="email"
                    name="email"
                    placeholder="Email ID"
                  />
                </div>
                <div className="w-full h-16 my-2">
                  <input
                    className="bg-transparent p-3 border-2 placeholder-black rounded-lg border-black text-black font-medium outline-none w-full text-2xl"
                    type="phonenumber"
                    name="phonenumber"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="w-full h-16 my-2">
                  <input
                    className="bg-transparent p-3 border-2 placeholder-black rounded-lg border-black text-black font-medium outline-none w-full text-2xl"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <div className="w-full my-5">
                  <label class="md:w-2/3 block text-2xl font-bold">
                    <input
                      class="mr-2 leading-tight"
                      type="checkbox"
                      required
                    />
                    <span class="text-sm">
                      I agree to all Terms & Conditions
                    </span>
                  </label>
                </div>
                <div className="flex w-full my-5">
                  <button
                    type="submit"
                    onClick={() => {}}
                    class="text-white w-full mr-5 bg-black font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gray-700"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    class="flex justify-center text-black w-full mr-5 whitespace-nowrap bg-white font-medium rounded-lg text-sm px-2 py-2.5 hover:bg-blue-700"
                  >
                    <svg
                      class="h-4 w-4 mr-1 mt-[2px]"
                      xmlns="http://www.w3.org/2000/svg"
                      width="800px"
                      height="800px"
                      viewBox="0 0 48 48"
                    >
                      <g
                        id="Icons"
                        stroke="none"
                        stroke-width="1"
                        fill="none"
                        fill-rule="evenodd"
                      >
                        {" "}
                        <g
                          id="Color-"
                          transform="translate(-401.000000, -860.000000)"
                        >
                          {" "}
                          <g
                            id="Google"
                            transform="translate(401.000000, 860.000000)"
                          >
                            {" "}
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              id="Fill-1"
                              fill="#FBBC05"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              id="Fill-2"
                              fill="#EB4335"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              id="Fill-3"
                              fill="#34A853"
                            >
                              {" "}
                            </path>{" "}
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              id="Fill-4"
                              fill="#4285F4"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </svg>
                    <div className="">Signin with Google</div>
                  </button>
                </div>
                <div className="flex w-full justify-center text-xl font-notoSans">
                  Already have an account?
                  <a href="">
                    <strong>
                      <t />
                      &nbsp;Sign in
                    </strong>
                  </a>
                </div>
              </form>
            </div>
          </div>
          {/*Form*/}
        </div>
      </div>
    </div>
  );
}
