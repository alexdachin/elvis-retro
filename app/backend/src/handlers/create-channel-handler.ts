import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import channelsRepository from '../repositories/channels-repository'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`create-channel Event: ${JSON.stringify(event)}`)

  const channel = await channelsRepository.create({
    type: 'spotify-health-check',
    ownerConnectionId: event.requestContext.connectionId,
    connectedConnectionIds: [],
    createdAt: new Date(),
  })

  return {
    statusCode: 201,
    body: JSON.stringify({ channel }),
  }
}
