/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [dateTime, setDateTime] = useState<string>("");
//   const [waktu_presensi, setPresensi] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [daftarKaryawan, setDaftarKaryawan] = useState([]);
  const [selectedKaryawan, setSelectedKaryawan] = useState<
    number | null
  >(null);
  const router = useRouter();
  useEffect(() => {
    // Fungsi untuk memperbarui tanggal dan waktu
    const updateDateTime = () => {
      const now = new Date();

      // Mendapatkan tanggal dalam format DD/MM/YYYY
      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Bulan di JavaScript dimulai dari 0
      const year = now.getFullYear();

      // Mendapatkan waktu dalam format HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      // Menggabungkan tanggal dan waktu
      setDateTime(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`);
    };

    // Set interval untuk memperbarui waktu setiap detik
    const intervalId = setInterval(updateDateTime, 1000);

    // Panggil updateDateTime segera setelah komponen dirender
    updateDateTime();

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/karyawan`)
      .then((daftarKaryawan) =>
        setDaftarKaryawan(daftarKaryawan.data.data)
      )
      .catch((error) =>
        console.error("Error fetching Masjid items:", error)
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/presensi", {
        waktu_presensi: dateTime,
        keterangan,
        karyawan_id: selectedKaryawan,
      });
      router.push("/presensi");
    } catch (error) {
      console.error("Error creating presensi:", error);
    }
  };

//   console.log('daftarKaryawan', daftarKaryawan);
//   console.log('daftarKaryawan lenght', daftarKaryawan.length);
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Presensi
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="waktu_presensi"
              className="block text-gray-700 font-medium mb-1"
            >
              Waktu Presensi
            </label>
            <input
              id="waktu_presensi"
              type="datetime"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              placeholder="Waktu Presensi"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="keterangan"
              className="block text-gray-700 font-medium mb-1"
            >
              Keterangan
            </label>
            <input
              id="keterangan"
              type="text"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Keterangan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
          <label
              htmlFor="Karyawan"
              className="block text-gray-700 font-medium mb-1"
            >
             Silahkan Pilih Karyawan 
            </label>
            <select
              value={selectedKaryawan || ""}
              onChange={(e) =>
                setSelectedKaryawan(Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Karyawan</option>
              {daftarKaryawan.length > 0 ? (
                daftarKaryawan.map((karyawan: any) => {
                //   console.log("karyawan", karyawan);

                  return (
                    <option
                      key={karyawan.id}
                      value={karyawan.id}
                    >
                      {karyawan.nama}
                    </option>
                  );
                })
              ) : (
                <option value="">Tidak Ada Daftar Karyawan</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;