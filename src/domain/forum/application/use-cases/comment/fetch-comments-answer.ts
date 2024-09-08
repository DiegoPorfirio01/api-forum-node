import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../../repositories/answer-comments-repository'

interface FetchCommentsAnswerUseCaseRequest {
  page: number
  answerId: string
}

interface FetchCommentsAnswerUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchCommentsAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchCommentsAnswerUseCaseRequest): Promise<FetchCommentsAnswerUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyComments(
      answerId,
      {
        page,
      },
    )

    return {
      answerComments,
    }
  }
}
