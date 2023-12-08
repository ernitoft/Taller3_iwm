<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Ernes Fuenzalida Tello',
            'email' => 'ernes@alumnos.ucn.cl',
            'password' => '12345678',
            'rut' => '12345678-9',
            'yearBirth' => 2002
        ]);
    }
}
