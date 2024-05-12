<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    use HasFactory;
    
    public $timestamps = false;

    protected $table = 'tb_rs';

    protected $primaryKey = 'id_rs';

    protected $fillable = [
        'nama_rs',
        'alamat_rs',
        'latitude_rs',
        'longitude_rs',
        'type_rs',
        'photo_rs',
    ];

    protected $guarded = [
        'id_rs',
    ];
}
