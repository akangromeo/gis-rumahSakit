<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hospital; // Ubah menjadi model yang sesuai dengan nama tabel baru

class HospitalController extends Controller
{
    // Menampilkan semua data dari tabel tb_rs
    public function index()
    {
        $tb_rs = Hospital::all(); // Ganti variabel $hospitals menjadi $tb_rs
        return response()->json($tb_rs);
    }

    // Membuat data baru dalam tabel tb_rs
    public function store(Request $request)
    {
        $new_rs = Hospital::create($request->all()); // Ganti variabel $hospital menjadi $new_rs
        return response()->json($new_rs, 201);
    }

    // Mengupdate data rumah sakit berdasarkan ID
    public function update(Request $request, $id_rs)
    {
        $rs = Hospital::findOrFail($id_rs); // Ganti variabel $hospital menjadi $rs
        $rs->update($request->all());
        return response()->json($rs, 200);
    }

    // Menghapus data rumah sakit berdasarkan ID
    public function destroy($id_rs)
    {
        Hospital::findOrFail($id_rs)->delete();
        return response()->json(null, 204);
    }
}
