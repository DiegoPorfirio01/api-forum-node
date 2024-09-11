import type { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import type { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    return (this.items = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    ))
  }

  async deleteManyByAnswerId(answerId: string) {
    console.log('deleteManyByAnswerId', answerId)
    this.items = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )
  }

  async create(answerAttachment: AnswerAttachment) {
    this.items.push(answerAttachment)
  }
}
