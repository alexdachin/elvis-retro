import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import connectionsRepository from '../repositories/connections-repository'
import channelsRepository from '../repositories/channels-repository'
import broadcastToChannel from '../helpers/broadcast-to-channel'

interface SetNameEventBody {
  name: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`set-name Event: ${JSON.stringify(event)}`)

  const connectionId = event.requestContext.connectionId
  const connection = await connectionsRepository.get(connectionId)
  const { name }: SetNameEventBody = JSON.parse(event.body)
  await connectionsRepository.setName(connectionId, name)

  if (connection.channelId) {
    const channel = await channelsRepository.get(connection.channelId)
    await broadcastToChannel(channel, JSON.stringify({
      action: 'client/set-name',
      connectionId: event.requestContext.connectionId,
      name: name,
    }))
  }

  return {
    statusCode: 200,
    body: JSON.stringify(null),
  }
}
