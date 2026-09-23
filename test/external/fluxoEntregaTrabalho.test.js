import { expect } from 'chai';
import { apiRequest } from '../helpers/api.js';
import { comTokenDeAdmin, getToken } from '../helpers/auth.js';
import { novoAluno } from '../factories/alunosFactory.js';
import { novaDisciplina } from '../factories/disciplinasFactory.js';
import trabalhos from '../fixtures/trabalhos.json' with { type: 'json' };

describe('Fluxo de Entrega de Trabalho', () => {

    trabalhos.forEach((cenario) => {

        it.only(cenario.tituloTeste, async () => {         
            
            // Arrange      
            
            const aluno = novoAluno();
            const disciplina = novaDisciplina( cenario.nomeDisciplina );

            const tokenAdmin = await comTokenDeAdmin();
            

            // Cadastro do aluno
            const cadastroAluno = await apiRequest()                
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', tokenAdmin)
                .send(aluno);
            //console.log(cadastroAluno.body);
            //console.log('Status:', cadastroAluno.status);
            //console.log('Body:', cadastroAluno.body);
            expect(cadastroAluno.status).to.equal(201);

            const alunoId = cadastroAluno.body.id;            

            // Cadastro da disciplina
            const cadastroDisciplina = await apiRequest()
                .post('/api/admin/disciplinas')
                .set('Content-Type', 'application/json')
                .set('Authorization', tokenAdmin)
                .send(disciplina);

            expect(cadastroDisciplina.status).to.equal(201);

            const disciplinaId = cadastroDisciplina.body.id;

            // Matrícula do aluno na disciplina
            const matriculaResponse = await apiRequest()
                .post(`/api/admin/disciplinas/${disciplinaId}/matriculas`)
                .set('Content-Type', 'application/json')
                .set('Authorization', tokenAdmin)
                .send({
                    alunoId
                });

            expect(matriculaResponse.status).to.equal(201);

            // Login do aluno recém-criado
            const tokenAluno = await getToken(
                aluno.email,
                aluno.senha
            );

            
            // Act          

            const entregaResponse = await apiRequest()
                .post(`/api/alunos/${alunoId}/trabalhos`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokenAluno}`)
                .send({
                    disciplinaId,
                    titulo: cenario.tituloTrabalho,
                    descricao: cenario.descricaoTrabalho
                });
                console.log('STATUS ENTREGA:', entregaResponse.status);
                console.log('BODY ENTREGA:', entregaResponse.body);

            
            // Assert            

            expect(entregaResponse.status)
                .to.equal(cenario.statusEsperado);

            expect(entregaResponse.body)
                .to.have.property('id');

            expect(entregaResponse.body.alunoId)
                .to.equal(alunoId);

            expect(entregaResponse.body.disciplinaId)
                .to.equal(disciplinaId);

            expect(entregaResponse.body.titulo)
                .to.equal(cenario.tituloTrabalho);

            expect(entregaResponse.body.status)
                .to.equal('entregue');
        });
    });
});