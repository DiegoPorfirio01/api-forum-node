import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository '
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch a recent questions', async () => {
    Array.from({ length: 3 }).map(async () => {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('1'),
        }),
      )
    })

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('2'),
      }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: '1',
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    Array.from({ length: 22 }).map(async () => {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('1'),
        }),
      )
    })

    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId('2'),
      }),
    )

    const { answers } = await sut.execute({ page: 2, questionId: '1' })

    expect(answers).toHaveLength(2)
  })
})
