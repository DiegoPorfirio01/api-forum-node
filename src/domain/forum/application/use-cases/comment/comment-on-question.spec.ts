import { InMemoryQuestionCommentsRepository } from '@/test/repositories/in-memory-question-comments-repository '
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository

let sut: CommentOnQuestionUseCase // sut system under test

describe('Create comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionRepository,
    )
  })

  it('should be able to create an comment on question', async () => {
    inMemoryQuestionRepository.create(makeQuestion({}, new UniqueEntityId('2')))

    await sut.execute({
      questionId: '2',
      authorId: '1',
      content: 'Where? When? Why ? What?',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toBe(
      'Where? When? Why ? What?',
    )
  })

  it('should be able to return error question not found on comment question', async () => {
    inMemoryQuestionRepository.create(makeQuestion({}, new UniqueEntityId('2')))

    expect(() =>
      sut.execute({
        questionId: '11',
        authorId: '1',
        content: 'Where? When? Why ? What?',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
