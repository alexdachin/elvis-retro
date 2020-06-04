import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import connectionsRepository from '../repositories/connections-repository'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`$disconnect Event: ${JSON.stringify(event)}`)

  const connectionId = event.requestContext.connectionId
  await connectionsRepository.delete(connectionId)

  return {
    statusCode: 200,
    body: JSON.stringify(null),
  }
}
