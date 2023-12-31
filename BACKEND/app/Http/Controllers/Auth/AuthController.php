<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Helper\myHelper;
use JWTAuth;
use Illuminate\Support\Facades\Hash;

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
            try{
                $messages = makeMessages();     
                $this->validate($request,[
                    'email'=>'required|string',
                    'password'=>'required|string',
                ], $messages);

                $credenciales = $request->only('email','password');
                if (!$token = JWTAuth::attempt($credenciales)) {
                    return response()->json([
                        'token'=> $token,
                        'email'=>$request->email,
                        'password'=>$request->password,
                        'message' => 'Credenciales inválidas',
                    ], 401);
                }
                return response()->json([
                    'token'=>$token,
                    'email'=>$request->email,
                ],200);
            }catch(\Exception $e){
                return response()->json([
                    'message'=>'Error al iniciar sesión',
                ],400);
            }
            
        }
    /**
     * Función que registra un usuario
     * @param Request $request Request con los datos del usuario a registrar
     * @return \Illuminate\Http\JsonResponse Retorna un JSON con el mensaje de éxito o error
     */
    public function register(Request $request){

        if (!guionesPuntos($request->rut)){
            return response()->json([
                'message'=>'RUT inválido: Ingrese puntos y guión'
            ],400);
        }

        $helper = verificarRUT($request->rut);
        $messages = makeMessages();
        $this->validate($request,[
            'name'=>'required|string|max:150|min:10',
            'email'=>'required|string|unique:users|regex:/^[^@]+@[^@.]+\.[^@]+$/',
            'rut'=>'required|string|unique:users',
            'yearBirth'=>'required|integer|min:1900|max:2023',
        ], $messages);
        
        if ($userValidate = User::find($request->rut) || $userValidate = User::find($request->email)) {
            return response()->json([
                'message'=>'El usuario ya existe'
            ],400);
        }
        
        if (!$user = User::where('rut',$request->rut)->first()) {
            if (!$user = User::where('email',$request->email)->first()) {
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
                $password = limpiarRUT($request->rut);
                User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password'=>Hash::make($password),
                    'rut'=>$request->rut,
                    'yearBirth'=>$request->yearBirth,
                ]);
                return response()->json([
                    'email'=>$request->email,
                    'password'=>$password,
                    'message'=>'Usuario creado con éxito'
                ],200);
            }
        } 
        return response()->json([
                'message'=>'El usuario ya existe'
            ],400);
    }
}
