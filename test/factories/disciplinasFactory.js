import { faker } from '@faker-js/faker';

export function novaDisciplina(nomeDisciplina = null) {

    const timestamp = Date.now();

    return {
        nome: nomeDisciplina || faker.helpers.arrayElement([
            'Algoritmos',
            'Banco de Dados',
            'Engenharia de Software',
            'Estrutura de Dados',
            'Programação Orientada a Objetos',
            'Teste de Software'
        ]),
        codigo: `DIS-${timestamp}`,
        cargaHoraria: faker.number.int({
            min: 40,
            max: 80
        })
    };
}
