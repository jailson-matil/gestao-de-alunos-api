import { faker } from '@faker-js/faker';

export function novoAluno(){
    const timestamp = Date.now(); // Obtém o timestamp atual em milissegundos
    const firstName = faker.person.firstName(); // Gera um primeiro nome aleatório usando o Faker
    const lastName = faker.person.lastName(); // Gera um sobrenome aleatório usando o Faker

    return {
        nome: `${firstName} ${lastName}`, // Gera um nome completo aleatório usando o Faker
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${timestamp.toString().slice(-3)}@escola.com`,
        matricula: `2026-${timestamp.toString().slice(-3)}`, // Usa os últimos 3 dígitos do timestamp para criar uma matrícula única
        senha: faker.string.alphanumeric(6) // Gera uma senha aleatória de 6 caracteres usando o Faker
    }
}