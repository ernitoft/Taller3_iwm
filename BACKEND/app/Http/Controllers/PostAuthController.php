<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use JWTAuth;
use AuthController;
use Illuminate\Support\Facades\Hash;


/**
 * Controlador de usuarios autenticados
 */
class PostAuthController extends Controller
{

    public function index ($email)
    {
        try{    
            $usuarios = User::where('email',$email)->get();
            return response()->json([
                'usuario' => $usuarios],200);
        }catch(\Exception $e){
            throw new \Exception($e->getMessage());
        }
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
            'newPassword' => 'required|string',
            'confirmPassword' => 'required|string'
        ], $messages);
        $user = User::where('id', $request->id)->first();
        if ($request->newPassword != $request->confirmPassword) {
            return response()->json([
                'message' => 'Las contraseñas no coinciden'
            ], 400);
        } else if ($request->newPassword == $request->confirmPassword) {
            $user->update([
                'password' => Hash::make($request->newPassword)
            ]);
            return response()->json([
                'message' => 'Contraseña actualizada'
            ], 200);
        }else{
            return response()->json([
                'message' => 'Error al actualizar la contraseña'
            ], 400);
        }
    }
}
