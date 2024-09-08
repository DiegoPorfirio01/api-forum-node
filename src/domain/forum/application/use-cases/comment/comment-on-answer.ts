import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../../enterprise/entities/answer'
import type { AnswersRepository } from '../../repositories/answers-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

interface CommentOnAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

export class CommentOnAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest) {
    const commentAnswer = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answersRepository.saveComment(commentAnswer)
  }
}
