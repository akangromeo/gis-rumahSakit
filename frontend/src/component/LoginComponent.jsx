import React, { useState } from "react";
import "../App.css";

export default function LoginComponent({ setLoggedIn, onClose}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kirim data ke backend untuk otentikasi
        try {
            const response = await fetch("http://gis_2105551148.local.net/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            // Handle respons dari backend sesuai kebutuhan aplikasi Anda
            console.log(data);
    
            // Periksa keberhasilan otentikasi dari respons
            if (data.success) {
                // Jika login berhasil, atur isLoggedIn menjadi true
                setLoggedIn(true);
                // Simpan token ke local storage
                localStorage.setItem("token", data.data.token);
                console.log(data.data.token)

                onClose();
            } else {
                // Jika login gagal, mungkin Anda ingin menampilkan pesan kesalahan
                console.error("Login failed:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="form-component max-w-sm mx-auto mb-5"
            >
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
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
}
