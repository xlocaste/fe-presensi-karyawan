'use client'
import { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [dateTime, setDateTime] = useState<string>("");

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

  return (
    <div>
      <h1>Tanggal dan Waktu Saat Ini: {dateTime}</h1>
    </div>
  );
};

export default RealTimeClock;
