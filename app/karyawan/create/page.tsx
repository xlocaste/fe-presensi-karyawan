/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nama, setNama] = useState("");
  const [divisi, setDivisi] = useState("");
  const [kelamin, setKelamin] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/karyawan", {
        nama,
        divisi,
        kelamin,
      });
      router.push("/karyawan");
    } catch (error) {
      console.error("Error creating buku:", error);
    }
  };

//   console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
//   console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Karyawan
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="divisi"
              className="block text-gray-700 font-medium mb-1"
            >
              Divisi
            </label>
            <input
              id="divisi"
              type="text"
              value={divisi}
              onChange={(e) => setDivisi(e.target.value)}
              placeholder="Divisi"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Kelamin</label>
              <select id="kelamin" value={kelamin} onChange={(e => setKelamin(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
              <option>
                Laki-Laki
              </option>
              <option>
                Perempuan
              </option>
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