import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteCommentOnAnswerUseCase } from './delete-comment-on-answer'
import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository '
import { makeAnswerComment } from '@/test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

let sut: DeleteCommentOnAnswerUseCase // sut system under test

describe('Delete comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete an comment on answer', async () => {
    const answerQuestion = makeAnswerComment({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryAnswerCommentsRepository.create(answerQuestion)

    await sut.execute({
      comment: answerQuestion,
      authorId: '1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to return error you are not author', async () => {
    const answerQuestion = makeAnswerComment({
      authorId: new UniqueEntityId('2'),
    })

    await inMemoryAnswerCommentsRepository.create(answerQuestion)

    expect(() =>
      sut.execute({
        comment: answerQuestion,
        authorId: '1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
