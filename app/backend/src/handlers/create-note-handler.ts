import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import notesRepository from '../repositories/notes-repository'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { content }: { content: string } = JSON.parse(event.body)

  await notesRepository.create({
    content,
    createdAt: new Date(),
  })

  return {
    statusCode: 200,
    body: 'null',
  }
}
