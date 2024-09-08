import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchCommentsAnswerUseCase } from './fetch-comments-answer'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository '
import { makeAnswerComment } from '@/test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchCommentsAnswerUseCase

describe('Fetch Comments Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchCommentsAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch comments answer', async () => {
    Array.from({ length: 3 }).map(async () => {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          authorId: new UniqueEntityId('2'),
          answerId: new UniqueEntityId('1'),
        }),
      )
    })

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        authorId: new UniqueEntityId('2'),
        answerId: new UniqueEntityId('3'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: '1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question answercomment', async () => {
    Array.from({ length: 22 }).map(async () => {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          authorId: new UniqueEntityId('2'),
          answerId: new UniqueEntityId('1'),
        }),
      )
    })

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        authorId: new UniqueEntityId('2'),
        answerId: new UniqueEntityId('3'),
      }),
    )

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: '1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
