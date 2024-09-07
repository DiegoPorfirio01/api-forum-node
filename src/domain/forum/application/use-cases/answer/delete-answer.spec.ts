import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '@/test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository '

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase // sut system under test

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('9'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryAnswersRepository.create(answer)

    const answerToDelete = await inMemoryAnswersRepository.findById('7')

    if (!answerToDelete) {
      throw new Error('Answer not found')
    }

    await sut.execute({ answer: answerToDelete, authorId: '9' })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer of another user', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('1'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryAnswersRepository.create(answer)

    const answerToDelete = await inMemoryAnswersRepository.findById('7')

    if (!answerToDelete) {
      throw new Error('Answer not found')
    }

    expect(() =>
      sut.execute({ answer: answerToDelete, authorId: '6' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
