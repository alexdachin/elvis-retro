import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import connectionsRepository, { ConnectionNotFoundError } from '../repositories/connections-repository'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`$connect Event: ${JSON.stringify(event)}`)

  const connectionId = event.requestContext.connectionId
  try {
    await connectionsRepository.get(connectionId)
  } catch (e) {
    if (e instanceof ConnectionNotFoundError) {
      await connectionsRepository.create({
        connectionId,
        name: null,
        createdAt: new Date(),
      })
    } else {
      throw e
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(null),
  }
}
