import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import notesRepository from '../repositories/notes-repository'

interface CreateNoteEventBody {
  content: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`create-note Event: ${JSON.stringify(event)}`)

  const { content }: CreateNoteEventBody = JSON.parse(event.body)

  await notesRepository.create({
    content,
    createdAt: new Date(),
  })

  return {
    statusCode: 201,
    body: JSON.stringify(null),
  }
}
