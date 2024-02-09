import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'; //importando o json

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  //Propriedades
  title: string = ''; //Title

  questions: any; //Questões
  questionSelected: any; //Questões selecionadas

  answers: string[] = []; // Respostas
  answerSelect: string = ''; //Respostas selecionadas

  questionIndex: number = 0; //Ponteiro valor inicial
  questionMaxIndex: number = 0; //Valor total de perguntas

  finished: boolean = false; //Resultados

  constructor() {}

  //Metódos
  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      //Chamando as questões do json
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0; //Muda nada só to reforçando para começar em zero
      this.questionMaxIndex = this.questions.length; //Pegar a posição máxima da quantidade no array

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  buttonPress(value: string) {
    this.answers.push(value); //Adicionando o valor
    this.nextStep();
  }

  //Funçao para mudar a pergunta
  async nextStep() {
    this.questionIndex += 1; //Incrementa mais um 1 na posiçao do ponteiro

    //Condição -> Enquanto meu ponteiro máximo for maior, continua
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      //Checando o resultado da funçao, que vai devolver uma das letras
      const finalAnswer: string = await this.checkResult(this.answers);

      this.finished = true; //Template do Resultado vai aparecer na page
      this.answerSelect =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ]; // Ele é uma chave do mesmo TIPO que o quizz_questions.results
    }
  }

  //Checando o resultado das perguntas: [A] or [B]
  async checkResult(answers: string[]) {
    //Guardando o resultado da array na const result
    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });

    return result;
  }
}
