import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { Slug } from '../../../enterprise/entities/value-objects/slug'
import { makeQuestion } from '@/test/factories/make-question'
import { GetQuestionByIdUseCase } from './get-question-by-id'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionByIdUseCase // sut system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionByIdUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by id', async () => {
    const newQuestion = makeQuestion(
      {
        title: 'Hello World ?',
      },
      new UniqueEntityId('7'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({ id: '7' })

    expect(question.title).toEqual(newQuestion.title)
  })
})
