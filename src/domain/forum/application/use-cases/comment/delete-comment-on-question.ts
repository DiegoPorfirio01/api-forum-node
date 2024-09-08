import type { QuestionCommentsRepository } from '../../repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

interface DeleteCommentOnQuestionUseCaseRequest {
  comment: QuestionComment
  authorId: string
}

export class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({ comment, authorId }: DeleteCommentOnQuestionUseCaseRequest) {
    const questionComment = this.questionCommentsRepository.findById(
      comment.id.toString()!,
    )

    if (!questionComment) {
      throw new Error('Question comment not found !')
    }

    if (comment.authorId.toString() !== authorId) {
      throw new Error('You are not author of this comment')
    }

    await this.questionCommentsRepository.delete(comment)
  }
}
