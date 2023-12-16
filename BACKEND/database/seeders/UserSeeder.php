<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


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
            'password' => Hash::make('211765615'),
            'rut' => '21176561-5',
            'yearBirth' => 2002
        ]);
    }
}
