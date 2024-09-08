import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../../repositories/question-comments-repository'

interface FetchCommentsQuestionUseCaseRequest {
  page: number
  questionId: string
}

interface FetchCommentsQuestionUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchCommentsQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchCommentsQuestionUseCaseRequest): Promise<FetchCommentsQuestionUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyComments(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}
