<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use JWTAuth;
use AuthController;


/**
 * Controlador de usuarios autenticados
 */
class PostAuthController extends Controller
{

    public function index ()
    {
        $user = JWTAuth::parseToken()->authenticate();
        dd($user);
        return response()->json([
            'user' => $user
        ], 200);
    }

    /**
     * Función que permite actualizar la informacion de un usuario
     * @param Request $request Request con los datos a actualizar
     * @return json Retorna un json con el mensaje de éxito o error
     */
    public function updateInfo(Request $request)
    {
        $messages = makeMessages();
        $this->validate($request, [
            'name' => 'required|string|max:150|min:10',
            'email' => 'required|string|regex:/^[^@]+@[^@.]+\.[^@]+$/',
            'yearBirth' => 'required|integer|min:1900|max:2023'
        ], $messages);

        $user = User::where('id', $request->id)->first();
        if ($user->name != $request->name || $user->email != $request->email || $user->yearBirth != $request->yearBirth) {
            if ($user->email != $request->email) {
                $this->validate($request, [
                    'email' => 'unique:users'
                ], $messages);
                $helper = verificarDominioCorreo($request->email);
                if (!$helper) {
                    return response()->json([
                        'message' => 'El correo no pertenece a un dominio válido'
                    ], 400);
                }
            } else if ($user->email == $request->email) {
                $user->update([
                    'name' => $request->name,
                    'yearBirth' => $request->yearBirth
                ]);
            } 
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'yearBirth' => $request->yearBirth
            ]);
            return response()->json([
                'message' => 'Información actualizada'
            ], 200);
        } else{
            return response()->json([
                'message' => 'No se han realizado cambios'
            ], 400);        
        }
    }

    /**
     * Función que permite actualizar la contraseña de un usuario
     * @param Request $request Request con los datos a actualizar
     * @return json Retorna un json con el mensaje de éxito o error
     */
    public function updatePassword(Request $request){
        $messages = makeMessages();
        $this->validate($request, [
            'password' => 'required|string',
            'newPassword' => 'required|string',
            'confirmPassword' => 'required|string'
        ], $messages);

        $user = User::where('id', $request->id)->first();
        if ($user->password != bcrypt($request->password)) {
            return response()->json([
                'message' => 'Contraseña incorrecta'
            ], 400);
        } else if ($request->newPassword != $request->confirmPassword) {
            return response()->json([
                'message' => 'Las contraseñas no coinciden'
            ], 400);
        } else if ($user->password == bcrypt($request->password) && $request->newPassword == $request->confirmPassword) {
            $user->update([
                'password' => bcrypt($request->newPassword)
            ]);
            return response()->json([
                'message' => 'Contraseña actualizada'
            ], 200);
        }
    }
}
