import React, { useState, useEffect } from "react";

const EditHospitalComponent = ({ data, onSubmit }) => {
    const [formData, setFormData] = useState({
        nama_rs: "",
        alamat_rs: "",
        latitude_rs: "",
        longitude_rs: "",
        type_rs: "",
        photo_rs: "",
    });

    useEffect(() => {
        // Memperbarui formData saat data berubah
        if (data) {
            setFormData({
                ...data, // Menggunakan data yang diberikan untuk mengisi formData
            });
        }
    }, [data]);

    const handleChange = (e) => {
        // Memperbarui nilai formData saat input berubah
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna di sini
            return;
        }
    
        fetch(`http://gis_2105551148.local.net/api/tb_rs/${data.id_rs}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((updatedData) => {
            console.log("Update successful", updatedData);
            onSubmit(updatedData); 

        })
        .catch((err) => {
            console.error("Error:", err.message);
            // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna di sini
        });
    };
    
    return (
        <div className="max-w-lg mx-auto">
             <div className="text-center font-bold">
            <h2 className="text-2xl">Edit Hospital</h2>
        </div>
            <form onSubmit={handleSubmit} className="form-component max-w-sm mx-auto mb-5">
            <div className="mb-5">
                <label htmlFor="nama_rs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Rumah Sakit:
                </label>
                <input
                    type="text"
                    id="nama_rs"
                    name="nama_rs" // Tambahkan name untuk mengidentifikasi input
                    value={formData.nama_rs}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-5">
                <label htmlFor="alamat_rs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Alamat Rumah Sakit:
                </label>
                <input
                    type="text"
                    id="alamat_rs"
                    name="alamat_rs" // Tambahkan name untuk mengidentifikasi input
                    value={formData.alamat_rs}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            
            <div className="mb-5">
                <label htmlFor="type_rs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Type:
                </label>
                <input
                    type="text"
                    id="type_rs"
                    name="type_rs" // Tambahkan name untuk mengidentifikasi input
                    value={formData.type_rs}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="photo_rs" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Photo (online URL):
                </label>
                <input
                    type="text"
                    id="photo_rs"
                    name="photo_rs" // Tambahkan name untuk mengidentifikasi input
                    value={formData.photo_rs}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
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

export default EditHospitalComponent;
