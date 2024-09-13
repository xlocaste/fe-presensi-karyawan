'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
    const [dateTime, setDateTime] = useState<string>("");
    // const [waktu_presensi, setWaktuPresensi] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [daftarKaryawan, setDaftarKaryawan] = useState([]);
    const [selectedKaryawan, setSelectedKaryawan] = useState<
    number | null
  >(null);
    const params = useParams();
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
            console.error("Error fetching karyawan items:", error)
          );
      },[]);

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/presensi/${id}`)
                .then(response => {
                    const presensi = response.data.data;
                    // setWaktuPresensi(presensi.waktu_presensi);
                    setKeterangan(presensi.keterangan);
                })
                .catch(error => console.error('Error fetching Presensi:', error));
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/presensi/${id}`, { 
                    waktu_presensi: dateTime, 
                    keterangan, 
                    karyawan_id:selectedKaryawan});
                router.push('/presensi');
            } catch (error) {
                console.error('Error updating presensi:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Presensi</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="waktu_presensi">Waktu Presensi</label>
                            <input
                                id="waktu_presensi"
                                type="dateTime"
                                value={dateTime}
                                onChange={e => setDateTime(e.target.value)}
                                placeholder="Waktu Presensi"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Keterangan</label>
                            <input
                                id="keterangan"
                                type="text"
                                value={keterangan}
                                onChange={e => setKeterangan(e.target.value)}
                                placeholder="Keterangan"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Silahkan Pilih Karyawan</label>
                            <select
                            value={selectedKaryawan || ""}
                            onChange={(e) =>
                                setSelectedKaryawan(Number(e.target.value))
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            >
                            <option value="">Pilih Karyawan</option>
                            {daftarKaryawan.length > 0 ? (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                                <option value="">Tidak Ada Karyawan</option>
                            )}
                            </select>
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