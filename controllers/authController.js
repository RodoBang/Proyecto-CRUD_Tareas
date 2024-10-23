const { admin } = require('../firebaseConfig');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'rodo1234';

const JWT_EXPIRES_IN = '1h';

// Registro de usuario

async function register(req, res){
    const { email, password } = req.body;

    try{
        // Crear usuario en Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password
        });
        res.status(201).json({code: 201, message: 'Usuario creado', uid: userRecord.uid});
        
    }catch(error){
        console.error('Error al registrar usuario:', error);
        res.status(500).json({code: 500, message: 'Error al registrar usuario'});
    }
}

// Inicio de sesion

async function login(req, res){
    const { email, password } = req.body;

    try{
        // Obtener usuario por email
        const user = await admin.auth().getUserByEmail(email);

        // Verificar contraseña
        // Generar token JWT
        const token = jwt.sign({ uid: user.uid, email: user.email}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({code: 200, message: 'Sesión iniciada', token});

    }catch(error){
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({code: 500, message: 'Error al iniciar sesión'});
    }
}

module.exports = {
    register,
    login
}   