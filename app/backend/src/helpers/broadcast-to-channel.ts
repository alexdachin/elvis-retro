import ApiGatewayManagementApi from 'aws-sdk/clients/apigatewaymanagementapi'

import { Channel } from '../models/channel'

export default function broadcastToChannel (channel: Channel, Data: string): Promise<any[]> {
  const apigatewaymanagementapi = new ApiGatewayManagementApi()

  return Promise.all([channel.ownerConnectionId, ...channel.connectedConnectionIds].map(ConnectionId => {
    return apigatewaymanagementapi.postToConnection({
      ConnectionId,
      Data,
    }).promise()
  }))
}
