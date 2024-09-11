import type { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    return (this.items = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    ))
  }

  async deleteManyByQuestionId(questionId: string) {
    console.log('deleteManyByQuestionId', questionId)
    this.items = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )
  }

  async create(questionAttachment: QuestionAttachment) {
    this.items.push(questionAttachment)
  }
}
