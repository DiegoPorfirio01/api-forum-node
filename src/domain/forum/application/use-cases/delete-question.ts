import type { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface DeleteQuestionUseCaseRequest {
  question: Question
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({ question }: DeleteQuestionUseCaseRequest) {
    this.questionRepository.delete(question)
  }
}
