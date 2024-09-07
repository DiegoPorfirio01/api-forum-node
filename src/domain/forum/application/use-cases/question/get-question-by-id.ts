import type { QuestionRepository } from '../../repositories/question-repository'
import { Question } from '../../../enterprise/entities/question'

interface GetQuestionByIdUseCaseRequest {
  id: string
}

interface GetQuestionByIdUseCaseResponse {
  question: Question
}

export class GetQuestionByIdUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    id,
  }: GetQuestionByIdUseCaseRequest): Promise<GetQuestionByIdUseCaseResponse> {
    const question = await this.questionRepository.findById(id)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question,
    }
  }
}
