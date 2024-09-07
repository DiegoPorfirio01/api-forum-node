import type { QuestionRepository } from '../../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title?: string
  content?: string
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest) {
    const questionToEdit = await this.questionRepository.findById(questionId)

    if (!questionToEdit) {
      throw new Error('Question not found')
    }

    if (questionToEdit.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this question')
    }

    if (title) {
      questionToEdit.title = title
    }

    if (content) {
      questionToEdit.content = content
    }

    this.questionRepository.save(questionToEdit)
  }
}
