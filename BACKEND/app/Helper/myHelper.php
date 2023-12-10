<?php
/**
 * Función que crea los mensajes de error para las validaciones
 * @return array Retorna un arreglo con los mensajes de error
 */
function makeMessages(){
    $messages = [
        'name.required' => 'El nombre es requerido',
        'name.string' => 'El nombre debe ser una cadena de caracteres',
        'name.max' => 'El nombre debe tener máximo 150 caracteres',
        'name.min' => 'El nombre debe tener mínimo 10 caracteres',
        'email.required' => 'El email es requerido',
        'email.string' => 'El email debe ser una cadena de caracteres',
        'email.unique' => 'El email ya está registrado',
        'email.regex' => 'El email debe tener un formato válido',
        'password.required' => 'La contraseña es requerida',
        'password.string' => 'La contraseña debe ser una cadena de caracteres',
        'rut.required' => 'El RUT es requerido',
        'rut.string' => 'El RUT debe ser una cadena de caracteres',
        'rut.unique' => 'El RUT ya está registrado',
        'yearBirth.required' => 'El año de nacimiento es requerido',
        'yearBirth.integer' => 'El año de nacimiento debe ser un número entero',
        'yearBirth.min' => 'El año de nacimiento debe ser mayor a 1900',
        'yearBirth.max' => 'El año de nacimiento debe ser menor a 2023',

    ];
    return $messages;
}

/**
 * Función que verifica si un RUT es válido
 * @param string $correo Correo a verificar
 * @return bool Retorna true si el RUT es válido, false en caso contrario
 */
    function verificarDominioCorreo($correo) {
    $dominiosPermitidos = array("ucn.cl", "alumnos.ucn.cl", "disc.ucn.cl", "ce.ucn.cl");

    if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        list($usuario, $dominio) = explode('@', $correo);

        return in_array(strtolower($dominio), array_map('strtolower', $dominiosPermitidos));
    }

    return false;
}

/**
 * Función que calcula el dígito verificador de un RUT
 * @param string $rut RUT a calcular dígito verificador
 * @return string Retorna el dígito verificador calculado
 */
function calcularDigitoVerificador($rut) {
    // Limpiar el rut de puntos y guión
    $cleanedRut = preg_replace('/[^0-9kK]/', '', $rut);

    // Verificar la longitud del RUT
    $rutLength = strlen($cleanedRut);

    if ($rutLength == 9 || $rutLength == 8) {
        // Obtenemos el digito y el body
        $digit = substr($cleanedRut, -1);
        $body = substr($cleanedRut, 0, -1);

        // Invertir la cadena
        $bodyInverted = strrev($body);

        // Definimos lo multipliers y la suma
        $mult = [2,3,4,5,6,7];
        $sum = 0;

        for($i = 0; $i < strlen($bodyInverted); $i++){
            $sum += $bodyInverted[$i] * $mult[$i % count($mult)];
            $rest = $sum / 11;
        }
        $digitCalculated = 11 - ($sum - (floor($rest) * 11));

        // Validar que el digito calculado no sea 10
        if ($digitCalculated == 10){
            $digitCalculated == 'k';
        }
        // Validar que el digito calculado no sea 11
        else if($digitCalculated == 11){
            $digitCalculated == '0';
        }

        return $digitCalculated;
    }
}

/**
 * Función que verifica si un RUT es válido con su dígito verificador
 * @param string $rut RUT a verificar
 * @return bool Retorna true si el RUT es válido, false en caso contrario
 */
    function verificarRUT($rut) {
    $digitoVerificadorOriginal = substr($rut, -1);
    $digitoVerificadorCalculado = calcularDigitoVerificador($rut);
    return $digitoVerificadorOriginal == $digitoVerificadorCalculado;
}

/**
 * Función que limpia un RUT de puntos y guión
 * @param string $rut RUT a limpiar
 * @return string Retorna el RUT limpio
 */
function limpiarRUT($rut) {
    $rut = str_replace('.', '', $rut);
    $rut = str_replace('-', '', $rut);
    return $rut;
}