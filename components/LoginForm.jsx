'use client'

import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import Logtip from "../public/rams.png"

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin" && password === "12345") {
      router.replace("/adminMainPage");
      return;
    }

    if (email === "teacher" && password === "54321") {
      router.replace("/pupilsAdd");
      return;
    }

    if (!email || !password) {
      toast.error("Please enter valid credentials", {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      router.replace("dashboard");
      router.push("/pupilsAdd");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="container mx-auto">
      <div className="login_section flex justify-between items-center h-[100vh]">
        <div data-aos="fade-down" className="login_section_left w-[50%] border-r-2 mr-10 pr-">
          {/* Saqlangan matnni o'qib olish */}
          <h1 className="xl:text-[45px] login_text  text-[#293273] font-[700] leading-[80px] tracking-[2%]">
            Hurmatli foydalanuvchi <br /> Login parolingizni Kiriting.
          </h1>
          <div className="flex justify-center">
            <Image className="xl:my-10 login_image -ml-[100px]" src={Logtip} width={350} height={200} alt="Image" />
          </div>
        </div>
        <form data-aos="fade-up" onSubmit={handleSubmit} className="login_form flex flex-col rounded-[20px] w-[50%]">
          <h1 className="text-3xl  text-[#293273] font-[700] leading-[80px] tracking-[2%]">
            LOGIN BILAN KIRISH
          </h1>
          <p className="my-3 text-[15px] text-[#293273] font-[600]">
            Maktab mamuryati tomonidan berilgan elektron pochta hamda login parolni kiriting
          </p>
          <label className="my-3" htmlFor="">
            Elektron pochta
          </label>
          <input
            className="border-2 rounded-md outline-none py-4 px-3"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Elektron pochta kiriting..."
          />
          <label className="my-3" htmlFor="">
            Login parolni kiriting
          </label>
          <input
            className="border-2 rounded-md outline-none py-4 px-3"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Login parolni kiritish..."
          />
          <button className="green my-4 rounded-md text-white font-bold cursor-pointer px-6 py-4">
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
}

