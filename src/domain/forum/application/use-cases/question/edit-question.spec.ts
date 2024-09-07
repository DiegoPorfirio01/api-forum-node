import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '@/test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase // sut system under test

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion(
      {
        title: 'Hello World ?',
        authorId: new UniqueEntityId('7'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const questionToEdit = await inMemoryQuestionsRepository.findById('7')

    if (!questionToEdit) {
      throw new Error('Question not found')
    }

    await sut.execute({
      questionId: questionToEdit.id.toString()!,
      title: 'Hello !',
      authorId: '7',
    })

    expect(inMemoryQuestionsRepository.items[0].title).toEqual('Hello !')
  })

  it('should not be able to edit a question of another user', async () => {
    const question = makeQuestion(
      {
        title: 'Hello World ?',
        authorId: new UniqueEntityId('8'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryQuestionsRepository.create(question)

    const questionToEdit = await inMemoryQuestionsRepository.findById('7')

    if (!questionToEdit) {
      throw new Error('Question not found')
    }

    expect(() =>
      sut.execute({ questionId: questionToEdit.id.toString()!, authorId: '2' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
