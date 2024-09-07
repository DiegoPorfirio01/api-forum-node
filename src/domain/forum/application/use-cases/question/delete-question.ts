import type { QuestionRepository } from '../../repositories/question-repository'
import { Question } from '../../../enterprise/entities/question'

interface DeleteQuestionUseCaseRequest {
  question: Question
  authorId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({ question, authorId }: DeleteQuestionUseCaseRequest) {
    const questionToDelete = await this.questionRepository.findById(
      question.id.toString()!,
    )

    if (!questionToDelete) {
      throw new Error('Question not found')
    }

    if (questionToDelete.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this question')
    }

    this.questionRepository.delete(question)
  }
}
