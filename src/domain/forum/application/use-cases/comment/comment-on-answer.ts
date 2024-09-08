import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../../repositories/answer-comments-repository'
import type { AnswersRepository } from '../../repositories/answers-repository'

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const commentAnswer = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentsRepository.create(commentAnswer)
  }
}
