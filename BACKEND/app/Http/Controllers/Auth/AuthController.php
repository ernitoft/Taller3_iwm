<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Helper\myHelper;
use JWTAuth;
/**
 * Controlador de autenticación
 */

class AuthController extends Controller
{
    /**
     * Funcion que permite iniciar sesión
     * @param Request $request Request con los datos del usuario a logear
     * @return \Illuminate\Http\JsonResponse Retorna un JSON con el token y el email del usuario
     */
        public function login(Request $request){   
            $messages = makeMessages();     
            $this->validate($request,[
                'email'=>'required|string',
                'password'=>'required|string',
            ], $messages);

            $credentials = request(['email','password']);
            try{
                if (!$token = JWTAuth::attempt($credentials)) {
                    return response()->json([
                        'message'=>'Credenciales inválidas'
                    ],401);
                }
            }catch(Exception $e){
                return response()->json([
                    'message'=>'Error en el servidor'
                ],500);
            }
            return response()->json([
                'token'=>$token,
                'email'=>$request->email,
            ],200);
        }
    /**
     * Función que registra un usuario
     * @param Request $request Request con los datos del usuario a registrar
     * @return \Illuminate\Http\JsonResponse Retorna un JSON con el mensaje de éxito o error
     */
    public function register(Request $request){
        $helper = verificarRUT($request->rut);
        $messages = makeMessages();
        $this->validate($request,[
            'name'=>'required|string|max:150|min:10',
            'email'=>'required|string|unique:users|regex:/^[^@]+@[^@.]+\.[^@]+$/',
            'password'=>'required|string',
            'rut'=>'required|string|unique:users',
            'yearBirth'=>'required|integer|min:1900|max:2023',
        ], $messages);
        
        if (!verificarDominioCorreo($request->email)) {
            return response()->json([
                'message'=>'Dominio de correo inválido'
            ],400);
        }

        if (!$helper) {
            return response()->json([
                'message'=>'RUT inválido'
            ],400);
        }

        User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
            'rut'=>$request->rut,
            'yearBirth'=>$request->yearBirth,
        ]);

        return response()->json([
            'message'=>'Usuario creado exitosamente'
        ],201);
    }
}
