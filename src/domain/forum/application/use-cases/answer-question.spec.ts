import { AnswerQuestionUseCase } from './answer-question'
import type { AnswersRepository } from '../repositories/answers-repository'
const fakeAnswersRepository: AnswersRepository = {
  create: async function () {},
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Answer content',
  })

  expect(answer.content).toEqual('Answer content')
})
