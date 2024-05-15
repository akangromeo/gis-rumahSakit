import React, { useState } from "react";

const AddHospitalComponent = ({ onSubmit }) => {
    const [newMarker, setNewMarker] = useState({
        nama_rs: "",
        alamat_rs: "",
        type_rs: "",
        photo_rs: "",
        latitude_rs: "",
        longitude_rs: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewMarker((prevMarker) => ({
            ...prevMarker,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah perilaku default formulir

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token not found in localStorage");

            return;
        }
        fetch("http://api_2105551148.local.net/api/tb_rs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newMarker),
        })
            .then((res) => res.json())
            .then((data) => {
                // Panggil fungsi onSubmit untuk menambahkan rumah sakit baru ke state aplikasi utama
                onSubmit(data);
                console.log("Add New Hospital successful", data);
                // Reset form tambah rumah sakit
                setNewMarker({
                    nama_rs: "",
                    alamat_rs: "",
                    type_rs: "",
                    photo_rs: "",
                    latitude_rs: "",
                    longitude_rs: "",
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="form-component max-w-sm mx-auto mb-5"
            >
                <div className="mb-5">
                    <label
                        htmlFor="nama_rs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Nama Rumah Sakit:
                    </label>
                    <input
                        type="text"
                        id="nama_rs"
                        name="nama_rs"
                        value={newMarker.nama_rs}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="alamat_rs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Alamat Rumah Sakit:
                    </label>
                    <input
                        type="text"
                        id="alamat_rs"
                        name="alamat_rs"
                        value={newMarker.alamat_rs}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="type_rs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Type:
                    </label>
                    <input
                        type="text"
                        id="type_rs"
                        name="type_rs"
                        value={newMarker.type_rs}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="latitude_rs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Latitude:
                    </label>
                    <input
                        type="text"
                        id="latitude_rs"
                        name="latitude_rs"
                        value={newMarker.latitude_rs}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="longitude_rs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Longitude:
                    </label>
                    <input
                        type="text"
                        id="longitude_rs"
                        name="longitude_rs"
                        value={newMarker.longitude_rs}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="photo_rs"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Photo (online URL):
                    </label>
                    <input
                        type="text"
                        id="photo_rs"
                        name="photo_rs"
                        value={newMarker.photo_rs}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddHospitalComponent;
