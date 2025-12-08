"use client"
import React, { JSX, useState } from 'react';
import { Printer, Plus, Trash2, Package, MapPin, User } from 'lucide-react';
import Image from 'next/image';

interface Pengirim {
    nama: string;
    alamat: string;
    telp: string;
}

interface Penerima {
    nama: string;
    alamat: string;
    telp: string;
}

interface FormData {
    nomorNota: string;
    tanggal: string;
    pengirim: Pengirim;
    penerima: Penerima;
    kotaAsal: string;
    kotaTujuan: string;
}

interface Barang {
    id: number;
    jenis: string;
    ukuran: string;
    berat: string;
    harga: number;
}

interface TarifKota {
    [key: string]: number;
}

export default function NotaEkspedisi(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        nomorNota: `EKS-${Date.now().toString().slice(-8)}`,
        tanggal: new Date().toISOString().split('T')[0],
        pengirim: { nama: '', alamat: '', telp: '' },
        penerima: { nama: '', alamat: '', telp: '' },
        kotaAsal: '',
        kotaTujuan: ''
    });

    const [barang, setBarang] = useState<Barang[]>([
        { id: 1, jenis: '', ukuran: '', berat: '', harga: 0 }
    ]);

    const [biayaKirim, setBiayaKirim] = useState<number>(0);

    // Daftar tarif antar kota (contoh)
    const tarifKota: TarifKota = {
        'Jakarta-Bandung': 25000,
        'Jakarta-Surabaya': 45000,
        'Jakarta-Yogyakarta': 35000,
        'Jakarta-Semarang': 40000,
        'Bandung-Surabaya': 50000,
        'Bandung-Yogyakarta': 40000,
        'Surabaya-Bali': 30000,
        'Surabaya-Malang': 20000,
    };

    const kota: string[] = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Bali', 'Malang', 'Medan', 'Makassar'];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        category?: 'pengirim' | 'penerima',
        field?: string
    ): void => {
        if (category && field) {
            setFormData({
                ...formData,
                [category]: { ...formData[category], [field]: e.target.value }
            });
        } else if (field) {
            setFormData({ ...formData, [field]: e.target.value });
        }
    };

    const handleBarangChange = (id: number, field: keyof Barang, value: string): void => {
        setBarang(barang.map(b =>
            b.id === id ? { ...b, [field]: field === 'harga' ? parseFloat(value) || 0 : value } : b
        ));
    };

    const tambahBarang = (): void => {
        setBarang([...barang, { id: Date.now(), jenis: '', ukuran: '', berat: '', harga: 0 }]);
    };

    const hapusBarang = (id: number): void => {
        if (barang.length > 1) {
            setBarang(barang.filter(b => b.id !== id));
        }
    };

    const hitungBiayaKirim = (): void => {
        const rute = `${formData.kotaAsal}-${formData.kotaTujuan}`;
        const ruteBalik = `${formData.kotaTujuan}-${formData.kotaAsal}`;

        let tarif = tarifKota[rute] || tarifKota[ruteBalik] || 0;

        // Tambahan biaya berdasarkan total berat
        const totalBerat = barang.reduce((sum, b) => {
            const berat = parseFloat(b.berat) || 0;
            return sum + berat;
        }, 0);

        if (totalBerat > 10) {
            tarif += (totalBerat - 10) * 2000; // Rp 2000 per kg tambahan
        }

        setBiayaKirim(tarif);
    };

    const totalHargaBarang = barang.reduce((sum, b) => sum + b.harga, 0);
    const grandTotal = totalHargaBarang + biayaKirim;

    const handleCetak = (): void => {
        window.print();
    };

    return (
        <div className="min-h-screen  p-4">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8 print:shadow-none">
                {/* Header */}
                <div className="border-b-2 border-blue-600 pb-4 mb-6 print:border-black">
                    <div className="flex items-center gap-3 mb-2">
                        {/* <Package className="text-blue-600 print:text-black" size={36} /> */}
                        <Image src={'/assets/logo2.png'} alt='logo' width={50} height={50} />
                        <h1 className="text-3xl font-bold text-blue-600 print:text-black">NOTA PENGIRIMAN EKSPEDISI</h1>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                        <div>
                            <p className="font-semibold text-black">No. Nota: {formData.nomorNota}</p>
                            <p>Tanggal: <input
                                type="date"
                                value={formData.tanggal}
                                onChange={(e) => handleInputChange(e, undefined, 'tanggal')}
                                className="border-b border-gray-300 px-1 print:border-none text-black"
                            /></p>
                        </div>
                    </div>
                </div>

                {/* Data Pengirim & Penerima */}
                <div className="grid grid-cols-2 gap-6 mb-6 print:gap-4">
                    <div className="border p-4 rounded print:border-black">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="text-blue-600 print:text-black" size={20} />
                            <h3 className="font-bold text-lg text-blue-600 print:text-black">PENGIRIM</h3>
                        </div>
                        <input
                            type="text"
                            placeholder="Nama"
                            value={formData.pengirim.nama}
                            onChange={(e) => handleInputChange(e, 'pengirim', 'nama')}
                            className="w-full border-b mb-2 p-1 print:border-none"
                        />
                        <textarea
                            placeholder="Alamat"
                            value={formData.pengirim.alamat}
                            onChange={(e) => handleInputChange(e, 'pengirim', 'alamat')}
                            className="w-full border-b mb-2 p-1 print:border-none"
                            rows={2}
                        />
                        <input
                            type="text"
                            placeholder="No. Telp"
                            value={formData.pengirim.telp}
                            onChange={(e) => handleInputChange(e, 'pengirim', 'telp')}
                            className="w-full border-b p-1 print:border-none"
                        />
                    </div>

                    <div className="border p-4 rounded print:border-black">
                        <div className="flex items-center gap-2 mb-2">
                            <User className="text-blue-600 print:text-black" size={20} />
                            <h3 className="font-bold text-lg text-blue-600 print:text-black">PENERIMA</h3>
                        </div>
                        <input
                            type="text"
                            placeholder="Nama"
                            value={formData.penerima.nama}
                            onChange={(e) => handleInputChange(e, 'penerima', 'nama')}
                            className="w-full border-b mb-2 p-1 print:border-none"
                        />
                        <textarea
                            placeholder="Alamat"
                            value={formData.penerima.alamat}
                            onChange={(e) => handleInputChange(e, 'penerima', 'alamat')}
                            className="w-full border-b mb-2 p-1 print:border-none"
                            rows={2}
                        />
                        <input
                            type="text"
                            placeholder="No. Telp"
                            value={formData.penerima.telp}
                            onChange={(e) => handleInputChange(e, 'penerima', 'telp')}
                            className="w-full border-b p-1 print:border-none"
                        />
                    </div>
                </div>

                {/* Rute Pengiriman */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="flex items-center gap-2 font-semibold mb-1">
                            <MapPin size={18} className="text-blue-600 print:text-black" />
                            Kota Asal:
                        </label>
                        <select
                            value={formData.kotaAsal}
                            onChange={(e) => handleInputChange(e, undefined, 'kotaAsal')}
                            className="w-full border rounded p-2 print:border-black"
                        >
                            <option value="">Pilih Kota</option>
                            {kota.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 font-semibold mb-1">
                            <MapPin size={18} className="text-blue-600 print:text-black" />
                            Kota Tujuan:
                        </label>
                        <select
                            value={formData.kotaTujuan}
                            onChange={(e) => handleInputChange(e, undefined, 'kotaTujuan')}
                            className="w-full border rounded p-2 print:border-black"
                        >
                            <option value="">Pilih Kota</option>
                            {kota.map(k => <option key={k} value={k}>{k}</option>)}
                        </select>
                    </div>
                </div>

                {/* Detail Barang */}
                <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">DETAIL BARANG</h3>
                    <table className="w-full border-collapse border print:border-black">
                        <thead>
                            <tr className="bg-blue-600 text-white print:bg-gray-300 print:text-black">
                                <th className="border p-2 print:border-black">No</th>
                                <th className="border p-2 print:border-black">Jenis Barang</th>
                                <th className="border p-2 print:border-black">Ukuran (cm)</th>
                                <th className="border p-2 print:border-black">Berat (kg)</th>
                                <th className="border p-2 print:border-black">Harga (Rp)</th>
                                <th className="border p-2 print:hidden">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barang.map((b, index) => (
                                <tr key={b.id}>
                                    <td className="border p-2 text-center print:border-black">{index + 1}</td>
                                    <td className="border p-2 print:border-black ">
                                        <input
                                            type="text"
                                            value={b.jenis}
                                            onChange={(e) => handleBarangChange(b.id, 'jenis', e.target.value)}
                                            className="w-full p-1 print:border-none text-black"
                                            placeholder="Contoh: Pakaian"
                                        />
                                    </td>
                                    <td className="border p-2 print:border-black">
                                        <input
                                            type="text"
                                            value={b.ukuran}
                                            onChange={(e) => handleBarangChange(b.id, 'ukuran', e.target.value)}
                                            className="w-full p-1 print:border-none text-black"
                                            placeholder="30x20x10"
                                        />
                                    </td>
                                    <td className="border p-2 print:border-black">
                                        <input
                                            type="number"
                                            value={b.berat}
                                            onChange={(e) => handleBarangChange(b.id, 'berat', e.target.value)}
                                            className="w-full p-1 print:border-none text-black"
                                            placeholder="5"
                                            step="0.1"
                                        />
                                    </td>
                                    <td className="border p-2 print:border-black">
                                        <input
                                            type="number"
                                            value={b.harga}
                                            onChange={(e) => handleBarangChange(b.id, 'harga', e.target.value)}
                                            className="w-full p-1 print:border-none text-black"
                                            placeholder="100000"
                                        />
                                    </td>
                                    <td className="border p-2 text-center print:hidden">
                                        <button
                                            onClick={() => hapusBarang(b.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        onClick={tambahBarang}
                        className="mt-3 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden"
                    >
                        <Plus size={18} /> Tambah Barang
                    </button>
                </div>

                {/* Perhitungan Biaya */}
                <div className="border-t-2 pt-4 print:border-black">
                    <button
                        onClick={hitungBiayaKirim}
                        className="mb-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 print:hidden"
                    >
                        Hitung Biaya Pengiriman
                    </button>

                    <div className="flex justify-end">
                        <div className="w-80">
                            <div className="flex justify-between py-2 border-b">
                                <span className="font-semibold">Total Harga Barang:</span>
                                <span>Rp {totalHargaBarang.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="font-semibold">Biaya Pengiriman:</span>
                                <span>Rp {biayaKirim.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between py-3 text-xl font-bold bg-blue-100 px-3 mt-2 print:bg-gray-200">
                                <span>TOTAL:</span>
                                <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tombol Cetak */}
                <div className="mt-6 flex justify-end print:hidden">
                    <button
                        onClick={handleCetak}
                        className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 text-lg font-semibold"
                    >
                        <Printer size={20} /> Cetak Nota
                    </button>
                </div>

                {/* Footer untuk Cetak */}
                <div className="hidden print:block mt-8 pt-4 border-t border-black">
                    <div className="flex justify-between">
                        <div className="text-center">
                            <p className="mb-12">Pengirim</p>
                            <p className="border-t border-black inline-block px-8 pt-1">(...................)</p>
                        </div>
                        <div className="text-center">
                            <p className="mb-12">Penerima</p>
                            <p className="border-t border-black inline-block px-8 pt-1">(...................)</p>
                        </div>
                        <div className="text-center">
                            <p className="mb-12">Petugas</p>
                            <p className="border-t border-black inline-block px-8 pt-1">(...................)</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @media print {
          body { margin: 0; }
          @page { margin: 1cm; }
        }
      `}</style>
        </div>
    );
}