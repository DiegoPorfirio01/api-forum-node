import { Answer } from '../../enterprise/entities/answer'
import type { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answer: Answer
  authorId: string
}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({ answer, authorId }: DeleteAnswerUseCaseRequest) {
    const answerToDelete = await this.answerRepository.findById(
      answer.id.toString()!,
    )

    if (!answerToDelete) {
      throw new Error('Answer not found')
    }

    if (answerToDelete.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    await this.answerRepository.delete(answer)
  }
}
