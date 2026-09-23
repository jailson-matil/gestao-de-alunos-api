import { faker } from '@faker-js/faker';

export function novaDisciplina(nomeDisciplina = null) {

    const timestamp = Date.now();

    return {
        nome: nomeDisciplina || faker.helpers.arrayElement([
            'Pensamento Computacional',
            'Algoritmos e Lógica de Programação',
            'Programação para Automação de Testes',
            'Integração Contínua para Automação de Testes',
            'Princípios de Arquitetura de Software',
            'Fundamentos e Padrões de Projeto de Automação de Testes',
        ]),
        codigo: `DIS-${timestamp}`,
        cargaHoraria: faker.number.int({
            min: 40,
            max: 80
        })
    };
}
