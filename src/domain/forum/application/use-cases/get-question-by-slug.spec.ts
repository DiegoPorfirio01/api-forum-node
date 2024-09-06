import { InMemoryQuestionsRepository } from '@/test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { Question } from '../../enterprise/entities/question';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository : InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase // sut system under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'any_title',
      content: 'any_content',
      slug: Slug.create('any_slug'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question }  = await sut.execute({slug: 'any_slug'})

    expect(question.title).toEqual(newQuestion.title)
  })
});


