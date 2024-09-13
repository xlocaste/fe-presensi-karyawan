'use client'
import axios from "axios";
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [nama, setNama] = useState('');
    const [divisi, setDivisi] = useState('');
    const [kelamin, setKelamin] = useState('');
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/karyawan/${id}`)
                .then(response => {
                    const karyawan = response.data.data;
                    setNama(karyawan.nama);
                    setDivisi(karyawan.divisi);
                    setKelamin(karyawan.kelamin);
                })
                .catch(error => console.error('Error fetching Karyawan:', error));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/karyawan/${id}`, { nama, divisi, kelamin});
                router.push('/karyawan');
            } catch (error) {
                console.error('Error updating Karyawan:', error);
            }
        }
    };

    // console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
    // console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Masjid</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="nama">Nama</label>
                            <input
                                id="nama"
                                type="text"
                                value={nama}
                                onChange={e => setNama(e.target.value)}
                                placeholder="Nama"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Divisi</label>
                            <input
                                id="divisi"
                                type="text"
                                value={divisi}
                                onChange={e => setDivisi(e.target.value)}
                                placeholder="Divisi"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Kelamin</label>
                            <input
                                id="kelamin"
                                type="text"
                                value={kelamin}
                                onChange={e => setKelamin(e.target.value)}
                                placeholder="Kelamin"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;