'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface PresensiItem {
    id: number;
    waktu_presensi: Date;
    keterangan: string;
    karyawan_id: string;
    karyawan: {
        id:number
        nama:string
        divisi:string
        kelamin:string
        created_at:string
        updated_at:string
    };
}

const Presensi = () => {

    const [presensi, setPresensi] = useState<PresensiItem[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/presensi`)
            .then(response => {
                setPresensi(response.data.data);
            })
            .catch(error => console.error('Error fetching presensi items:', error));
    }, []);

    const deletePresensi = (id: number) => {
        axios.delete(`http://localhost:8000/api/presensi/${id}`)
            .then(() => setPresensi(presensi.filter(presensi => presensi.id !== id)))
            .catch(error => console.error('Error deleting presensi:', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Presensi Karyawan</h1>
                    <div className="mb-6">
                        <Link href="/presensi/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Presensi</button>
                        </Link>
                    </div>
                    {presensi.length > 0 ? (
                        <ul>
                            {presensi.map(item => (
                                <li key={item.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{new Date(item.waktu_presensi).toLocaleDateString()}</h2>
                                        <p className="text-gray-600">Nama Karyawan: {item.karyawan.nama}</p>
                                        <p className="text-gray-600">Keterangan: {item.keterangan}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                    <Link href={`/presensi/${item.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                        <button
                                            onClick={() => deletePresensi(item.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Daftar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Daftar Presensi kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Presensi;