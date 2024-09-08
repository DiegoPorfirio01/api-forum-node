import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchCommentsQuestionUseCase } from './fetch-comments-question'
import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory-question-comments-repository '
import { makeQuestionComment } from '@/test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchCommentsQuestionUseCase

describe('Fetch Comments Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchCommentsQuestionUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch comments question', async () => {
    Array.from({ length: 3 }).map(async () => {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          authorId: new UniqueEntityId('2'),
          questionId: new UniqueEntityId('1'),
        }),
      )
    })

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        authorId: new UniqueEntityId('2'),
        questionId: new UniqueEntityId('3'),
      }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: '1',
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question questioncomment', async () => {
    Array.from({ length: 22 }).map(async () => {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          authorId: new UniqueEntityId('2'),
          questionId: new UniqueEntityId('1'),
        }),
      )
    })

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        authorId: new UniqueEntityId('2'),
        questionId: new UniqueEntityId('3'),
      }),
    )

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: '1',
    })

    expect(questionComments).toHaveLength(2)
  })
})
