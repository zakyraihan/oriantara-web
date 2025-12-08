"use client"
import React, { useState, useEffect } from 'react';
import { Printer, Plus, Trash2 } from 'lucide-react';

interface ItemNota {
    id: number;
    banyaknya: number;
    namaBarang: string;
    harga: number;
    jumlah: number;
}

export default function NotaToko() {
    const [tanggal, setTanggal] = useState('');
    const [tuan, setTuan] = useState('');
    const [toko, setToko] = useState('');
    const [notaNo, setNotaNo] = useState('');
    const [items, setItems] = useState<ItemNota[]>([
        { id: 1, banyaknya: 0, namaBarang: '', harga: 0, jumlah: 0 }
    ]);

    const namaBarangOptions = ['500 UP', '300 UP', '200 UP', 'BS'];
    const hargaOptions = [280, 230, 150, 110];

    useEffect(() => {
        // Set tanggal otomatis
        const today = new Date();
        const formatted = today.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).replace(/\//g, '/');
        setTanggal(formatted);
    }, []);

    const handleItemChange = (id: number, field: keyof ItemNota, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const updated = { ...item, [field]: value };
                // Auto calculate jumlah
                if (field === 'banyaknya' || field === 'harga') {
                    updated.jumlah = updated.banyaknya * updated.harga;
                }
                return updated;
            }
            return item;
        }));
    };

    const tambahItem = () => {
        setItems([...items, {
            id: Date.now(),
            banyaknya: 0,
            namaBarang: '',
            harga: 0,
            jumlah: 0
        }]);
    };

    const hapusItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const totalJumlah = items.reduce((sum, item) => sum + item.jumlah, 0);

    const handleCetak = () => {
        window.print();
    };

    return (
        <div className="text-black min-h-screen bg-gray-100 p-4 print:p-0 print:bg-white">
            {/* Tombol Cetak - Hidden saat print */}
            <div className="text-black max-w-4xl mx-auto mb-4 print:hidden">
                <button
                    onClick={handleCetak}
                    className=" flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Printer size={20} />
                    Cetak Nota
                </button>
            </div>

            {/* Nota - Ukuran A5 landscape saat print */}
            <div className="text-black max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:w-full print:max-w-none">
                <div className="text-black p-8 print:p-6" style={{ minHeight: '148mm' }}>
                    {/* Header */}
                    <div className="text-black border-b-2 border-black pb-2 mb-4">
                        <div className="text-black flex justify-between items-start">
                            <div className="text-black text-sm">
                                <div className="text-black flex gap-2 mb-2">
                                    <span className="text-black w-16">Tanggal:</span>
                                    <input
                                        type="text"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                        className="text-black border-b border-dotted border-black px-1 w-32 print:border-none"
                                        placeholder="DD/MM/YY"
                                    />
                                </div>
                                <div className="text-black flex gap-2 mb-1">
                                    <span className="text-black w-16">Tuan</span>
                                    <input
                                        type="text"
                                        value={tuan}
                                        onChange={(e) => setTuan(e.target.value)}
                                        className="text-black border-b border-dotted border-black px-1 w-64 print:border-none"
                                        placeholder="Nama"
                                    />
                                </div>
                                <div className="text-black flex gap-2">
                                    <span className="text-black w-16">Toko</span>
                                    <input
                                        type="text"
                                        value={toko}
                                        onChange={(e) => setToko(e.target.value)}
                                        className="text-black border-b border-dotted border-black px-1 w-64 print:border-none"
                                        placeholder="Nama Toko"
                                    />
                                </div>
                            </div>
                            <div className="text-black text-sm">
                                <div className="text-black flex gap-2">
                                    <span className="text-black font-medium">NOTA NO.</span>
                                    <input
                                        type="text"
                                        value={notaNo}
                                        onChange={(e) => setNotaNo(e.target.value)}
                                        className="text-black border-b border-dotted border-black px-1 w-24 print:border-none"
                                        placeholder="..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="text-black w-full border-collapse border border-black text-sm">
                        <thead>
                            <tr className="text-black border-b border-black">
                                <th className="text-black border-r border-black p-2 text-left w-24">BANYAKNYA</th>
                                <th className="text-black border-r border-black p-2 text-left">NAMA BARANG</th>
                                <th className="text-black border-r border-black p-2 text-left w-24">HARGA</th>
                                <th className="text-black border-r border-black p-2 text-left w-32">JUMLAH</th>
                                <th className="text-black p-2 w-16 print:hidden">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id} className="text-black border-b border-black">
                                    <td className="text-black border-r border-black p-2">
                                        <input
                                            type="number"
                                            value={item.banyaknya || ''}
                                            onChange={(e) => handleItemChange(item.id, 'banyaknya', parseFloat(e.target.value) || 0)}
                                            className="text-black w-full px-1 print:border-none focus:outline-none"
                                            placeholder="0"
                                            min="0"
                                            step="0.1"
                                        />
                                    </td>
                                    <td className="text-black border-r border-black p-2">
                                        <select
                                            value={item.namaBarang}
                                            onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)}
                                            className="text-black w-full px-1 print:border-none print:appearance-none focus:outline-none bg-white"
                                        >
                                            <option value="">Pilih barang...</option>
                                            {namaBarangOptions.map(barang => (
                                                <option key={barang} value={barang}>{barang}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="text-black border-r border-black p-2">
                                        <select
                                            value={item.harga || ''}
                                            onChange={(e) => handleItemChange(item.id, 'harga', parseFloat(e.target.value) || 0)}
                                            className="text-black w-full px-1 print:border-none print:appearance-none focus:outline-none bg-white"
                                        >
                                            <option value="">-</option>
                                            {hargaOptions.map(harga => (
                                                <option key={harga} value={harga}>{harga}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="text-black border-r border-black p-2">
                                        <div className="text-black px-1 font-medium">
                                            {item.jumlah > 0 ? item.jumlah.toLocaleString('id-ID', {
                                                minimumFractionDigits: 3,
                                                maximumFractionDigits: 3
                                            }) : ''}
                                        </div>
                                    </td>
                                    <td className="text-black p-2 text-center print:hidden">
                                        <button
                                            onClick={() => hapusItem(item.id)}
                                            className="text-black text-red-600 hover:text-red-800"
                                            disabled={items.length === 1}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {/* Empty rows for printing */}
                            {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, i) => (
                                <tr key={`empty-${i}`} className="text-black border-b border-black">
                                    <td className="text-black border-r border-black p-2 h-8">&nbsp;</td>
                                    <td className="text-black border-r border-black p-2">&nbsp;</td>
                                    <td className="text-black border-r border-black p-2">&nbsp;</td>
                                    <td className="text-black border-r border-black p-2">&nbsp;</td>
                                    <td className="text-black p-2 print:hidden">&nbsp;</td>
                                </tr>
                            ))}

                            {/* Total Row */}
                            <tr className="text-black border-b-2 border-black bg-gray-50 print:bg-white">
                                <td colSpan={3} className="text-black border-r border-black p-2 text-right font-bold">
                                    Jumlah Rp.
                                </td>
                                <td className="text-black border-r border-black p-2 font-bold text-lg">
                                    {totalJumlah > 0 ? totalJumlah.toLocaleString('id-ID', {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3
                                    }) : ''}
                                </td>
                                <td className="text-black p-2 print:hidden"></td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Tombol Tambah - Hidden saat print */}
                    <button
                        onClick={tambahItem}
                        className="text-black mt-3 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden"
                    >
                        <Plus size={18} />
                        Tambah Baris
                    </button>

                    {/* Footer */}
                    <div className="text-black mt-8 flex justify-between text-sm">
                        <div className="text-black text-center">
                            <p className="text-black mb-16">Tanda Terima</p>
                            <div className="text-black border-t border-black pt-1 w-48">
                                (....................................)
                            </div>
                        </div>
                        <div className="text-black text-center">
                            <p className="text-black mb-16">Hormat kami,</p>
                            <div className="text-black border-t border-black pt-1 w-48">
                                (....................................)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          @page {
            size: A5 landscape;
            margin: 0.5cm;
          }
          
          body {
            margin: 0;
            padding: 0;
          }

          .print\\:hidden {
            display: none !important;
          }

          input, select {
            border: none !important;
            background: transparent !important;
            -webkit-appearance: none;
            appearance: none;
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          select {
            color: black !important;
          }

          table {
            border-collapse: collapse !important;
          }

          td, th {
            border: 1px solid black !important;
          }
        }
      `}</style>
        </div>
    );
}