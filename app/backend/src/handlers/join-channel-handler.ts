import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import channelsRepository from '../repositories/channels-repository'

interface JoinChannelEventBody {
  id: string;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`join-channel Event: ${JSON.stringify(event)}`)

  const { id }: JoinChannelEventBody = JSON.parse(event.body)
  await channelsRepository.join(id, event.requestContext.connectionId)
  const channel = channelsRepository.get(id)

  return {
    statusCode: 200,
    body: JSON.stringify({ channel }),
  }
}
