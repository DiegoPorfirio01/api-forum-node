import { InMemoryAnswerCommentsRepository } from '@/test/repositories/in-memory-answer-comments-repository '
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository '
import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestion } from '@/test/factories/make-question'
import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository

let sut: CommentOnAnswerUseCase // sut system under test

describe('Create comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswerRepository,
    )
  })

  it('should be able to create an comment on answer', async () => {
    inMemoryQuestionRepository.create(makeQuestion({}, new UniqueEntityId('2')))
    inMemoryAnswerRepository.create(
      makeAnswer(
        {
          authorId: new UniqueEntityId('1'),
          questionId: new UniqueEntityId('2'),
        },
        new UniqueEntityId('9'),
      ),
    )

    await sut.execute({
      answerId: '9',
      authorId: '1',
      content: 'Where? When? Why ? What?',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toBe(
      'Where? When? Why ? What?',
    )
  })

  it('should be able to return error question not found on comment answer', async () => {
    inMemoryQuestionRepository.create(makeQuestion({}, new UniqueEntityId('2')))
    inMemoryAnswerRepository.create(
      makeAnswer(
        {
          authorId: new UniqueEntityId('1'),
          questionId: new UniqueEntityId('4'),
        },
        new UniqueEntityId('9'),
      ),
    )

    expect(() =>
      sut.execute({
        answerId: '11',
        authorId: '1',
        content: 'Where? When? Why ? What?',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
