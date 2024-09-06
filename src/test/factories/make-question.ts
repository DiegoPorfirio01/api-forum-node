import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question, type QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";


export function makeQuestion(override: Partial<QuestionProps> = {}): Question {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: 'any_title',
    content: 'any_content',
    ...override
  })

  return question
}
