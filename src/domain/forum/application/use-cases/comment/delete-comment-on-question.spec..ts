import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory-question-comments-repository '
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteCommentOnQuestionUseCase } from './delete-comment-on-question'
import { makeQuestionComment } from '@/test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

let sut: DeleteCommentOnQuestionUseCase // sut system under test

describe('Delete comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommentOnQuestionUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to create an comment on question', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      comment: questionComment,
      authorId: '1',
    })

    expect(inMemoryQuestionCommentsRepository.items[0]).toHaveLength(0)
  })

  it('should be able to return error you are not author', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    expect(() =>
      sut.execute({
        comment: questionComment,
        authorId: '2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
