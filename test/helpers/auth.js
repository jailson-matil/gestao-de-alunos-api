import { apiRequest } from './api.js';
import 'dotenv/config';

export async function comTokenDeAdmin() {
    const loginResposta = await apiRequest()
        .post('/api/auth/login')
        .send({              
            email: process.env.ADMIN_EMAIL, 
            senha: process.env.ADMIN_SENHA
        });
        
    return `Bearer ${loginResposta.body.token}`;
}

export async function comTokenDeAluno() {
    const loginResposta = await apiRequest()
        .post('/api/auth/login')
        .send({              
            email: process.env.ALUNO_EMAIL, 
            senha: process.env.ALUNO_SENHA
        });
        
    return `Bearer ${loginResposta.body.token}`;
}

export async function getToken(emailUser, senhaUser) {
    const response = await apiRequest()
        .post('/api/auth/login')
        .send({ 
            email: emailUser,
            senha: senhaUser
        });
        
    return response.body.token;
}

