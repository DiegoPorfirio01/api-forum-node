import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository '

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase // sut system under test

describe('Should choose question best answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose question best answer', async () => {
    const question = makeQuestion(
      {
        title: 'Hello World ?',
        authorId: new UniqueEntityId('7'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const answer = makeAnswer(
      {
        questionId: question.id,
      },
      new UniqueEntityId('1'),
    )

    await inMemoryAnswersRepository.create(answer)

    const questionToChooseQuestionBestAnswer =
      await inMemoryAnswersRepository.findById('1')

    if (!questionToChooseQuestionBestAnswer) {
      throw new Error('Answer not found')
    }

    const questionAnswered = await inMemoryQuestionsRepository.findById(
      answer.questionId.toString()!,
    )

    if (!questionAnswered) {
      throw new Error('Question not found')
    }

    await sut.execute({
      authorId: questionAnswered.authorId.toString()!,
      answerId: answer.id.toString()!,
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose question best answer a question of another user', async () => {
    const question = makeQuestion(
      {
        title: 'Hello World ?',
        authorId: new UniqueEntityId('7'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const answer = makeAnswer(
      {
        questionId: question.id,
      },
      new UniqueEntityId('1'),
    )

    await inMemoryAnswersRepository.create(answer)

    const questionToChooseQuestionBestAnswer =
      await inMemoryAnswersRepository.findById('1')

    if (!questionToChooseQuestionBestAnswer) {
      throw new Error('Answer not found')
    }

    const questionAnswered = await inMemoryQuestionsRepository.findById(
      answer.questionId.toString()!,
    )

    if (!questionAnswered) {
      throw new Error('Question not found')
    }

    await sut.execute({
      authorId: questionAnswered.authorId.toString()!,
      answerId: answer.id.toString()!,
    })

    expect(() =>
      sut.execute({
        authorId: '1',
        answerId: answer.id.toString()!,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
