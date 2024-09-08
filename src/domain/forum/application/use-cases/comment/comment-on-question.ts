import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { QuestionCommentsRepository } from '../../repositories/question-comments-repository'
import type { QuestionRepository } from '../../repositories/question-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

interface CommentOnQuestionUseCaseRequest {
  questionId: string
  authorId: string
  content: string
}

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
    private questionRepository: QuestionRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionUseCaseRequest) {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const commentQuestion = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentsRepository.create(commentQuestion)
  }
}
