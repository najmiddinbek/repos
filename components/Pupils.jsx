'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FilterOption from "./FilterOption";
import Link from "next/link";

const PupilsAddClient = () => {
    const [shaxs, setShaxs] = useState("");
    const [maktab, setMaktab] = useState("");
    const [sinf, setSinfi] = useState("");
    const [pupil, setPupil] = useState("");
    const [dars, setDars] = useState("");
    const [school, setSchool] = useState("");
    const [newSinfi, setNewSinfi] = useState("");
    const [newDarsQoldirish, setNewDarsQoldirish] = useState("");
    const [telephoneRaqami, setTelephoneRaqami] = useState("");
    const [newIsm, setNewIsm] = useState("");
    const [setShaxsi, setSetShaxsi] = useState("");

    const router = useRouter();
    const maktablar = Array.from({ length: 54 }, (_, index) => index + 1);
    const kun = Array.from({ length: 3 }, (_, index) => index + 1);
    const soat = Array.from({ length: 6 }, (_, index) => index + 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.API_URL

        try {
            const res = await fetch(`/api/topics`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    shaxs,
                    maktab,
                    sinf,
                    pupil,
                    dars,
                    school,
                    newSinfi,
                    newDarsQoldirish,
                    telephoneRaqami,
                    newIsm,
                    setShaxsi
                }),
            });

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.push("/pupilsAdd");
                toast.success("O`quvchi malumotlari muvaffaqiyatli qo`shildi!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                // Update the topic count after successful form submission
                const response = await fetch("/api/topics");
                if (response.ok) {
                    const data = await response.json();
                    setTopicCount(data.length);
                } else {
                    console.log("Failed to fetch topic data.");
                }
            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="container flex flex-col gap-3">
                <Link href={"/"}>Orqaga</Link>
                <label className="text-[18px] poppins font-bold" htmlFor="">
                    Maktabni tanlang
                </label>
                <select
                    onChange={(e) => setSchool(e.target.value)}
                    value={school}
                    className="px-2 py-3 cursor-pointer"
                >
                    <option>Bu yerdan tanlang</option>
                    {maktablar.map((maktab) => (
                        <option key={maktab} value={maktab}>
                            {maktab}-maktab
                        </option>
                    ))}
                </select>

                <label className="text-[18px] font-bold poppins" htmlFor="">
                    Sinfni tanlang
                </label>

                <FilterOption
                    shaxsiy={newIsm}
                    setShaxsiy={setNewIsm}
                    setSetIsimi={newSinfi}
                    setSetShaxs={setNewSinfi}
                />
                <label className="text-[18px] font-bold poppins" htmlFor="">
                    Qoldirilgan dars vaqti
                </label>
                <select onChange={(e) => setNewDarsQoldirish(e.target.value)} value={newDarsQoldirish} className="px-2 py-3 cursor-pointer">
                    <option>Soat bo`yicha</option>

                    {soat.map((watch) => (
                        <option key={watch}>{watch}-soat</option>
                    ))}

                    <option>Kun bo`yicha</option>
                    {kun.map((day) => (
                        <option key={day}>{day}-kun</option>
                    ))}
                </select>
                <label className="text-[18px] poppins font-bold" htmlFor="">
                    Telefon raqami
                </label>
                <input
                    className="w-full py-3 px-2 border outline-none"
                    onChange={(e) => setTelephoneRaqami(e.target.value)}
                    value={telephoneRaqami}
                    type="text"
                    placeholder="Telefon raqami"
                />





                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="green rounded-md font-bold text-white py-3 px-6 w-fit"
                    >
                        Qo`shish
                    </button>
                </div>
            </form>
        </>
    );
};

export default PupilsAddClient;