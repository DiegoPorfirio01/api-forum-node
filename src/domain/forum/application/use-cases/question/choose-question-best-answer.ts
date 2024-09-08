import type { AnswersRepository } from '../../repositories/answers-repository'
import type { QuestionRepository } from '../../repositories/question-repository'
interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const questionToChooseBestAnswer = await this.questionsRepository.findById(
      answer.questionId.toString()!,
    )

    if (!questionToChooseBestAnswer) {
      throw new Error('Question not found')
    }

    if (authorId !== questionToChooseBestAnswer.authorId.toString()) {
      throw new Error('')
    }

    this.questionsRepository.saveBestAnswer(
      questionToChooseBestAnswer.id.toString()!,
      answerId,
    )
  }
}
