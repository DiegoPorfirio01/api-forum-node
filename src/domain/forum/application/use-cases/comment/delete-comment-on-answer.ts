import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../../repositories/answer-comments-repository'

interface DeleteCommentOnAnswerUseCaseRequest {
  comment: AnswerComment
  authorId: string
}

export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({ comment, authorId }: DeleteCommentOnAnswerUseCaseRequest) {
    const answerComment = this.answerCommentsRepository.findById(
      comment.id.toString()!,
    )

    if (!answerComment) {
      throw new Error('Answer comment not found !')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('You are not auhtor of this comment')
    }

    await this.answerCommentsRepository.delete(comment)
  }
}
