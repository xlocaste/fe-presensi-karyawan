'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface KaryawanId {
    id: number;
    nama: string;
    divisi: string;
    kelamin: string;
}

const Karyawan = () => {

    const [karyawan, setKaryawan] = useState<KaryawanId[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/karyawan`)
            .then(response => {
                setKaryawan(response.data.data);
            })
            .catch(error => console.error('Error fetching karyawan items:', error));
    }, []);

    const deleteKaryawan = (id: number) => {
        axios.delete(`http://localhost:8000/api/karyawan/${id}`)
            .then(() => setKaryawan(karyawan.filter(karyawan => karyawan.id !== id)))
            .catch(error => console.error('Error deleting karyawan:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Presensi Karyawan</h1>
                    <div className="mb-6">
                        <Link href="/karyawan/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Presensi Karyawan</button>
                        </Link>
                    </div>
                    <div className="mb-6">
                        <Link href="/presensi">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Presensi</button>
                        </Link>
                    </div>
                    {karyawan.length > 0 ? (
                        <ul>
                            {karyawan.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nama}</h2>
                                        <p className="text-gray-600">Divisi: {item.divisi}</p>
                                        <p className="text-gray-600">Kelamin: {item.kelamin}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/karyawan/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deleteKaryawan(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Karyawan;