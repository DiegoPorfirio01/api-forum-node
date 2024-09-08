import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items[index] = question
  }

  async saveBestAnswer(questionId: string, answerId: string) {
    const index = this.items.findIndex(
      (item) => item.id.toString() === questionId,
    )

    this.items[index].bestAnswerId = new UniqueEntityId(answerId)
  }

  async delete(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
  }
}
