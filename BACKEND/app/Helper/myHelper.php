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
        $rutNumeros = preg_replace('/[^0-9]/', '', $rut);

        // Paso 2: Dar vuelta la cifra
        $rutNumerosReverso = strrev($rutNumeros);

        // Paso 3: Multiplicar por la serie y sumar los resultados
        $suma = 0;
        $multiplicador = 2;
        for ($i = 0; $i < strlen($rutNumerosReverso); $i++) {
            $digito = (int)$rutNumerosReverso[$i];
            $resultado = $digito * $multiplicador;
            $suma += $resultado;

            // Actualizar el multiplicador para el siguiente dígito
            $multiplicador++;
            if ($multiplicador > 7) {
                $multiplicador = 2;
            }
        }

        // Paso 4: Calcular el resto de la división por 11
        $resto = $suma % 11;

        // Paso 5: Calcular el dígito verificador
        $digitoVerificador = 11 - $resto;

        // Paso 6: Ajustar el resultado si es 11, asignando 0 como dígito verificador
        if ($digitoVerificador == 11) {
            $digitoVerificador = 0;
        }

        // Paso 7: Ajustar el resultado si es 10, asignando 'K' como dígito verificador
        if ($digitoVerificador == 10) {
            $digitoVerificador = 'K';
        }

        return $digitoVerificador;
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