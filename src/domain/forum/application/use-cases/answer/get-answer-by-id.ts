import { Answer } from '../../../enterprise/entities/answer'
import type { AnswersRepository } from '../../repositories/answers-repository'

interface GetAnswerByIdUseCaseRequest {
  id: string
}

interface GetAnswerByIdUseCaseResponse {
  answer: Answer
}

export class GetAnswerByIdUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    id,
  }: GetAnswerByIdUseCaseRequest): Promise<GetAnswerByIdUseCaseResponse> {
    const answer = await this.answerRepository.findById(id)

    if (!answer) {
      throw new Error('Answer not found')
    }

    return {
      answer,
    }
  }
}
