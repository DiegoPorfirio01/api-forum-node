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
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const questionToDelete = await inMemoryQuestionsRepository.findById('7')

    if (!questionToDelete) {
      throw new Error('Question not found')
    }

    sut.execute({ question: questionToDelete })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
})
