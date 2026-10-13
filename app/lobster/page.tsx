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

const namaBarangOptions = ['500 UP', '300 UP', '200 UP', 'BS', 'STN 200/300 UP', 'STN 500 UP', 'STN 1000 UP'];
const hargaOptions = [470, 450, 330, 170, 200, 300, 180];

const formatJumlah = (n: number) =>
    n > 0
        ? n.toLocaleString('id-ID', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
        : '';

// text-base (16px) di HP supaya iOS tidak zoom otomatis saat input difokus
const fieldCls =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-base text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black';

export default function NotaToko() {
    const [tanggal, setTanggal] = useState('');
    const [tuan, setTuan] = useState('');
    const [toko, setToko] = useState('');
    const [notaNo, setNotaNo] = useState('');
    const [items, setItems] = useState<ItemNota[]>([
        { id: 1, banyaknya: 0, namaBarang: '', harga: 0, jumlah: 0 },
    ]);

    useEffect(() => {
        const today = new Date();
        setTanggal(
            today.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: '2-digit' })
        );
    }, []);

    const handleItemChange = (id: number, field: keyof ItemNota, value: string | number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;
                const updated = { ...item, [field]: value } as ItemNota;
                if (field === 'banyaknya' || field === 'harga') {
                    updated.jumlah = updated.banyaknya * updated.harga;
                }
                return updated;
            })
        );
    };

    const tambahItem = () => {
        setItems((prev) => [
            ...prev,
            { id: Date.now(), banyaknya: 0, namaBarang: '', harga: 0, jumlah: 0 },
        ]);
    };

    const hapusItem = (id: number) => {
        if (items.length > 1) setItems(items.filter((item) => item.id !== id));
    };

    const totalJumlah = items.reduce((sum, item) => sum + item.jumlah, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-3 text-black sm:p-4 print:bg-white print:p-0">
            {/* Tombol cetak */}
            <div className="mx-auto mb-3 max-w-4xl print:hidden sm:mb-4">
                <button
                    onClick={() => window.print()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 sm:w-auto"
                >
                    <Printer size={20} />
                    Cetak Nota
                </button>
            </div>

            {/* Lembar nota */}
            <div className="nota-sheet mx-auto max-w-4xl rounded-lg bg-white shadow-lg print:max-w-none print:rounded-none print:shadow-none">
                <div className="p-4 sm:p-8 sm:min-h-[148mm] print:min-h-[148mm] print:p-6">
                    {/* Header */}
                    <div className="mb-4 flex flex-col gap-3 border-b-2 border-black pb-3 sm:flex-row sm:items-start sm:justify-between print:flex-row print:items-start print:justify-between">
                        <div className="flex-1 space-y-2 text-sm">
                            <label className="flex items-center gap-2">
                                <span className="w-16 shrink-0">Tanggal:</span>
                                <input
                                    type="text"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    className="min-w-0 flex-1 border-b border-dotted border-black px-1 py-1.5 text-base sm:max-w-[8rem] sm:py-0.5 sm:text-sm print:border-none"
                                    placeholder="DD/MM/YY"
                                />
                            </label>
                            <label className="flex items-center gap-2">
                                <span className="w-16 shrink-0">Tuan</span>
                                <input
                                    type="text"
                                    value={tuan}
                                    onChange={(e) => setTuan(e.target.value)}
                                    className="min-w-0 flex-1 border-b border-dotted border-black px-1 py-1.5 text-base sm:max-w-[16rem] sm:py-0.5 sm:text-sm print:border-none"
                                    placeholder="Nama"
                                />
                            </label>
                            <label className="flex items-center gap-2">
                                <span className="w-16 shrink-0">Toko</span>
                                <input
                                    type="text"
                                    value={toko}
                                    onChange={(e) => setToko(e.target.value)}
                                    className="min-w-0 flex-1 border-b border-dotted border-black px-1 py-1.5 text-base sm:max-w-[16rem] sm:py-0.5 sm:text-sm print:border-none"
                                    placeholder="Nama Toko"
                                />
                            </label>
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <span className="shrink-0 font-medium">NOTA NO.</span>
                            <input
                                type="text"
                                value={notaNo}
                                onChange={(e) => setNotaNo(e.target.value)}
                                className="min-w-0 flex-1 border-b border-dotted border-black px-1 py-1.5 text-base sm:w-24 sm:flex-none sm:py-0.5 sm:text-sm print:border-none"
                                placeholder="..."
                            />
                        </label>
                    </div>

                    {/* ===== HP: daftar kartu (disembunyikan di layar besar & saat cetak) ===== */}
                    <div className="space-y-3 md:hidden print:hidden">
                        {items.map((item, index) => (
                            <div key={item.id} className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-semibold">Barang {index + 1}</span>
                                    <button
                                        onClick={() => hapusItem(item.id)}
                                        disabled={items.length === 1}
                                        aria-label={`Hapus barang ${index + 1}`}
                                        className="rounded-md p-2 text-red-600 hover:bg-red-50 hover:text-red-800 disabled:opacity-30"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <label className="mb-3 block">
                                    <span className="mb-1 block text-xs font-medium text-gray-600">NAMA BARANG</span>
                                    <select
                                        value={item.namaBarang}
                                        onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)}
                                        className={fieldCls}
                                    >
                                        <option value="">Pilih barang...</option>
                                        {namaBarangOptions.map((b) => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    <label className="block">
                                        <span className="mb-1 block text-xs font-medium text-gray-600">BANYAKNYA</span>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            value={item.banyaknya || ''}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'banyaknya', parseFloat(e.target.value) || 0)
                                            }
                                            className={fieldCls}
                                            placeholder="0"
                                            min="0"
                                            step="0.1"
                                        />
                                    </label>
                                    <label className="block">
                                        <span className="mb-1 block text-xs font-medium text-gray-600">HARGA</span>
                                        <select
                                            value={item.harga || ''}
                                            onChange={(e) =>
                                                handleItemChange(item.id, 'harga', parseFloat(e.target.value) || 0)
                                            }
                                            className={fieldCls}
                                        >
                                            <option value="">-</option>
                                            {hargaOptions.map((h) => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>

                                <div className="mt-3 flex items-center justify-between border-t border-gray-300 pt-3 text-sm">
                                    <span className="font-medium text-gray-600">JUMLAH</span>
                                    <span className="text-base font-semibold">{formatJumlah(item.jumlah) || '-'}</span>
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center justify-between rounded-lg border-2 border-black bg-white px-4 py-3">
                            <span className="font-bold">Jumlah Rp.</span>
                            <span className="text-lg font-bold">{formatJumlah(totalJumlah) || '-'}</span>
                        </div>
                    </div>

                    {/* ===== Layar besar & cetak: tabel nota ===== */}
                    <div className="hidden overflow-x-auto md:block print:block print:overflow-visible">
                        <table className="nota-table w-full border-collapse border border-black text-sm">
                            <thead>
                                <tr className="border-b border-black">
                                    <th className="w-24 border-r border-black p-2 text-left">BANYAKNYA</th>
                                    <th className="border-r border-black p-2 text-left">NAMA BARANG</th>
                                    <th className="w-24 border-r border-black p-2 text-left">HARGA</th>
                                    <th className="w-32 border-r border-black p-2 text-left">JUMLAH</th>
                                    <th className="w-16 p-2 print:hidden">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b border-black">
                                        <td className="border-r border-black p-2">
                                            <input
                                                type="number"
                                                value={item.banyaknya || ''}
                                                onChange={(e) =>
                                                    handleItemChange(item.id, 'banyaknya', parseFloat(e.target.value) || 0)
                                                }
                                                className="w-full px-1 focus:outline-none"
                                                placeholder="0"
                                                min="0"
                                                step="0.1"
                                            />
                                        </td>
                                        <td className="border-r border-black p-2">
                                            <select
                                                value={item.namaBarang}
                                                onChange={(e) => handleItemChange(item.id, 'namaBarang', e.target.value)}
                                                className="w-full bg-white px-1 focus:outline-none print:appearance-none"
                                            >
                                                <option value="">Pilih barang...</option>
                                                {namaBarangOptions.map((b) => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border-r border-black p-2">
                                            <select
                                                value={item.harga || ''}
                                                onChange={(e) =>
                                                    handleItemChange(item.id, 'harga', parseFloat(e.target.value) || 0)
                                                }
                                                className="w-full bg-white px-1 focus:outline-none print:appearance-none"
                                            >
                                                <option value="">-</option>
                                                {hargaOptions.map((h) => (
                                                    <option key={h} value={h}>{h}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="border-r border-black p-2">
                                            <div className="px-1 font-medium">{formatJumlah(item.jumlah)}</div>
                                        </td>
                                        <td className="p-2 text-center print:hidden">
                                            <button
                                                onClick={() => hapusItem(item.id)}
                                                className="text-red-600 hover:text-red-800 disabled:opacity-30"
                                                disabled={items.length === 1}
                                                aria-label="Hapus baris"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* Baris kosong untuk cetak */}
                                {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, i) => (
                                    <tr key={`empty-${i}`} className="border-b border-black">
                                        <td className="h-8 border-r border-black p-2">&nbsp;</td>
                                        <td className="border-r border-black p-2">&nbsp;</td>
                                        <td className="border-r border-black p-2">&nbsp;</td>
                                        <td className="border-r border-black p-2">&nbsp;</td>
                                        <td className="p-2 print:hidden">&nbsp;</td>
                                    </tr>
                                ))}

                                <tr className="border-b-2 border-black bg-gray-50 print:bg-white">
                                    <td colSpan={3} className="border-r border-black p-2 text-right font-bold">
                                        Jumlah Rp.
                                    </td>
                                    <td className="border-r border-black p-2 text-lg font-bold">
                                        {formatJumlah(totalJumlah)}
                                    </td>
                                    <td className="p-2 print:hidden"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Tombol tambah */}
                    <button
                        onClick={tambahItem}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-white hover:bg-green-700 sm:w-auto sm:rounded sm:py-2 print:hidden"
                    >
                        <Plus size={18} />
                        Tambah Baris
                    </button>

                    {/* Footer tanda tangan */}
                    <div className="mt-8 flex justify-between gap-4 text-sm">
                        <div className="text-center">
                            <p className="mb-14 sm:mb-16">Tanda Terima</p>
                            <div className="w-32 border-t border-black pt-1 sm:w-48 print:w-48">
                                (..................)
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="mb-14 sm:mb-16">Hormat kami,</p>
                            <div className="w-32 border-t border-black pt-1 sm:w-48 print:w-48">
                                (..................)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gaya cetak */}
            <style>{`
                @media print {
                    @page { size: A5 landscape; margin: 0.5cm; }
                    html, body { margin: 0; padding: 0; background: #fff !important; }
                    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

                    .nota-sheet input,
                    .nota-sheet select {
                        border: none !important;
                        background: transparent !important;
                        -webkit-appearance: none;
                        appearance: none;
                        color: #000 !important;
                        padding: 0 !important;
                        font-size: 0.875rem !important;
                    }
                    .nota-sheet input::-webkit-outer-spin-button,
                    .nota-sheet input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    .nota-table { border-collapse: collapse !important; }
                    .nota-table td, .nota-table th { border: 1px solid #000 !important; }
                }
            `}</style>
        </div>
    );
}