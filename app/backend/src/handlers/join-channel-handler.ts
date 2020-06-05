import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import channelsRepository from '../repositories/channels-repository'
import connectionsRepository from '../repositories/connections-repository'
import broadcastToChannel from '../helpers/broadcast-to-channel'

interface JoinChannelEventBody {
  id: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`join-channel Event: ${JSON.stringify(event)}`)

  const { id }: JoinChannelEventBody = JSON.parse(event.body)
  await channelsRepository.join(id, event.requestContext.connectionId)
  await connectionsRepository.joinChannel(event.requestContext.connectionId, id)
  const channel = await channelsRepository.get(id)

  await broadcastToChannel(channel, JSON.stringify({
    action: 'client/join-channel',
    connectionId: event.requestContext.connectionId,
  }))

  return {
    statusCode: 200,
    body: JSON.stringify({ channel }),
  }
}
