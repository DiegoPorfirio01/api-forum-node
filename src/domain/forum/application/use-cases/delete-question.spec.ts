import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase // sut system under test

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const question = makeQuestion(
      {
        title: 'Hello World ?',
        authorId: new UniqueEntityId('7'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const questionToDelete = await inMemoryQuestionsRepository.findById('7')

    if (!questionToDelete) {
      throw new Error('Question not found')
    }

    sut.execute({ question: questionToDelete, authorId: '7' })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question of another user', async () => {
    const question = makeQuestion(
      {
        title: 'Hello World ?',
        authorId: new UniqueEntityId('8'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const questionToDelete = await inMemoryQuestionsRepository.findById('7')

    if (!questionToDelete) {
      throw new Error('Question not found')
    }

    expect(() =>
      sut.execute({ question: questionToDelete, authorId: '1' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
