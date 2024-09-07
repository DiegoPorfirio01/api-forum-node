import { makeAnswer } from '@/test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '@/test/repositories/in-memory-answers-repository '
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase // sut system under test

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const answer = makeAnswer(
      {
        content: 'Hello World ?',
        authorId: new UniqueEntityId('7'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryAnswersRepository.create(answer)

    const answerToEdit = await inMemoryAnswersRepository.findById('7')

    if (!answerToEdit) {
      throw new Error('Answer not found')
    }

    await sut.execute({
      answerId: answerToEdit.id.toString()!,
      content: 'Hello !',
      authorId: '7',
    })

    expect(inMemoryAnswersRepository.items[0].content).toEqual('Hello !')
  })

  it('should not be able to edit a answer of another user', async () => {
    const answer = makeAnswer(
      {
        content: 'Hello World ?',
        authorId: new UniqueEntityId('8'),
      },
      new UniqueEntityId('7'),
    )

    await inMemoryAnswersRepository.create(answer)

    const answerToEdit = await inMemoryAnswersRepository.findById('7')

    if (!answerToEdit) {
      throw new Error('Answer not found')
    }

    expect(() =>
      sut.execute({ answerId: answerToEdit.id.toString()!, authorId: '2' }),
    ).rejects.toBeInstanceOf(Error)
  })
})
