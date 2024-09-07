import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Answer,
  type AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'
import { makeQuestion } from './make-question'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
): Answer {
  const question = makeQuestion()

  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: question.id,
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
