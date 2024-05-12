import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, marker, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import LoginComponent from "../component/LoginComponent";
import RegisterComponent from "../component/RegisterComponent";
import EditHospitalComponent from "../component/EditHospitalComponent";
import AddHospitalComponent from "../component/addHospitalComponent";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
    const [isMapDraggable, setIsMapDraggable] = useState(true);

    const toggleMapDraggable = () => {
        setIsMapDraggable(!isMapDraggable);
    };

    const [data, setData] = useState([]);

    const [mapStyle, setMapStyle] = useState(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );

    useEffect(() => {
        fetch("http://gis_2105551148.local.net/api/tb_rs")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    }, []);

    const customIcon = new Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776000.png",
        iconSize: [38, 38],
    });

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class='cluster-icon'>${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: point(33, 33, true),
        });
    };

    const selectMapStyle = (styleUrl) => {
        setMapStyle(styleUrl);
    };

    const [selectedMarker, setSelectedMarker] = useState(null);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    const [showLoginForm, setShowLoginForm] = useState(false);

    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const [showAddForm, setShowAddForm] = useState(false);

    const [isLoggedIn, setLoggedIn] = useState(false);

    const toggleLoginForm = () => {
        setShowLoginForm(!showLoginForm);
        setShowRegisterForm(false);
    };

    const toggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setShowLoginForm(false);
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    function handleLogout() {
        // Ambil token dari local storage atau dari state, sesuai dengan cara Anda menyimpannya saat login
        const token = localStorage.getItem("token"); // Ubah 'token' sesuai dengan key yang Anda gunakan saat menyimpan token
        console.log(token);
        // Kirim permintaan ke backend untuk logout
        fetch("http://gis_2105551148.local.net/api/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Jika logout berhasil, atur isLoggedIn menjadi false
                    setLoggedIn(false);
                    alert("Logout Successful");
                    console.log("Logout successful");
                    const token = localStorage.setItem("token", "");
                    console.log(token);
                } else {
                    console.error("Logout failed");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const deleteMarker = (markerId) => {
        // Periksa jika token kosong
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found in localStorage");
            // Anda mungkin ingin menampilkan pesan kesalahan kepada pengguna di sini
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this marker?"
        );

        if (confirmDelete) {
            fetch(`http://gis_2105551148.local.net/api/tb_rs/${markerId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to delete marker");
                    }
                    // Hapus marker dari state data setelah berhasil dihapus dari server
                    setData(data.filter((marker) => marker.id_rs !== markerId));
                    console.log(marker.name + "successfully deleted.");
                })
                .catch((err) => {
                    console.log(err);
                    console.log("Failed to delete marker.");
                });
        }
    };

    const [showEditForm, setShowEditForm] = useState(false);

    const handleEditClick = (marker) => {
        setSelectedMarker(marker);
        setShowEditForm(true);
    };

    // Fungsi untuk menyembunyikan form edit
    const handleEditClose = () => {
        setShowEditForm(false);
    };

    const handleEditSubmit = (updatedData) => {
        // Cari indeks dari data yang diperbarui di state data
        const updatedIndex = data.findIndex(
            (item) => item.id_rs === updatedData.id_rs
        );
        if (updatedIndex !== -1) {
            // Dapatkan data terbaru dari state data dan perbarui data pada indeks yang sesuai
            const newData = [...data];
            newData[updatedIndex] = updatedData;
            // Perbarui state data dengan data yang diperbarui
            setData(newData);
        }
    };

    const handleAddHospital = (newHospital) => {
        setData([...data, newHospital]);
    };

    return (
        <div>
            <NavbarComponent
                toggleLoginForm={toggleLoginForm}
                toggleRegisterForm={toggleRegisterForm}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                
            />

            {showAddForm && (
                <AddHospitalComponent
                    onSubmit={handleAddHospital}
                />
            )}

            {showLoginForm && (
                <LoginComponent
                    setLoggedIn={setLoggedIn}
                    onClose={() => setShowLoginForm(false)}
                />
            )}
            {showRegisterForm && (
                <RegisterComponent setShowLoginForm={setShowLoginForm} />
            )}

            <div className="map-container">
                <MapContainer
                    center={[-8.793358, 115.181802]}
                    zoom={13}
                    onClick={(e) => handleMapClick(e)}
                >
                    <div className="map-style-buttons top-right">
                        <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <label
                                        htmlFor="list-radio-passport"
                                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Map Style
                                    </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input
                                        id="list-radio-license"
                                        type="radio"
                                        value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        name="list-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        checked={
                                            mapStyle ===
                                            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        }
                                        onChange={() =>
                                            selectMapStyle(
                                                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="lxist-radio-license"
                                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Open Street Map
                                    </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input
                                        id="list-radio-id"
                                        type="radio"
                                        value="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                        name="list-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        checked={
                                            mapStyle ===
                                            "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                        }
                                        onChange={() =>
                                            selectMapStyle(
                                                "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="list-radio-id"
                                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Open Todo Map
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url={mapStyle}
                    />

                    <MarkerClusterGroup
                        chunkedLoading
                        iconCreateFunction={createCustomClusterIcon}
                    >
                        {data.map((marker) => (
                            <Marker
                                key={marker.id_rs}
                                position={[
                                    parseFloat(marker.latitude_rs),
                                    parseFloat(marker.longitude_rs),
                                ]}
                                icon={customIcon}
                            >
                                <Popup className="popup-container">
                                    <div className="popup-content">
                                        {!showEditForm && (
                                            <div>
                                                <img
                                                    className="img-rs rounded-t-xl w-120 h-30"
                                                    src={marker.photo_rs}
                                                    alt=""
                                                />
                                                <h5 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                                                    {marker.nama_rs}
                                                </h5>
                                                <h5 className="font-bold text-red">
                                                    Type {marker.type_rs}
                                                </h5>
                                                <p>
                                                    {marker.alamat_rs} <br />
                                                </p>
                                                <button
                                                    type="button"
                                                    className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                                                    onClick={() =>
                                                        handleEditClick(marker)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                    onClick={() => {
                                                        console.log(
                                                            "Deleting marker with ID:",
                                                            marker.id_rs
                                                        );
                                                        deleteMarker(
                                                            marker.id_rs
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                        {showEditForm && (
                                            <div>
                                                <button
                                                    className="close-button"
                                                    onClick={() => {
                                                        setShowEditForm(false); // Reset state form di sini
                                                    }}
                                                >
                                                    <span>&#8592;</span> Cancel
                                                </button>
                                                <EditHospitalComponent
                                                    data={selectedMarker}
                                                    onSubmit={(updatedData) => {
                                                        // Lakukan sesuatu ketika formulir disubmit
                                                        // Misalnya, kirim data ke server
                                                        // Setelah itu, atur showEditForm menjadi false untuk menyembunyikan form
                                                        setShowEditForm(false);
                                                        handleEditSubmit(
                                                            updatedData
                                                        );
                                                    }}
                                                    onClose={handleEditClose}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                </MapContainer>

                <button
                    type="button"
                    onClick={toggleAddForm}
                    className=" button-over-map text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add Hospital
                </button>
            </div>
        </div>
    );
}

export default App;
