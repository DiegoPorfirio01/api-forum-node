import type { AnswersRepository } from '../../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content?: string
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({ answerId, authorId, content }: EditAnswerUseCaseRequest) {
    const answerToEdit = await this.answerRepository.findById(answerId)

    if (!answerToEdit) {
      throw new Error('Answer not found')
    }

    if (answerToEdit.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    if (content) {
      answerToEdit.content = content
    }

    this.answerRepository.save(answerToEdit)
  }
}
