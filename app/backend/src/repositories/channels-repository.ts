import { Channel } from '../models/channel'

import DynamoDB from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

interface ChannelDocument {
  id: string;
  type: 'spotify-health-check';
  ownerConnectionId: string;
  connectedConnectionIds: string[];
  createdAt: string;
}

export class ChannelNotFoundError extends Error {
  constructor (id: string) {
    super()
    this.message = `Channel ${id} not found!`
    this.name = this.constructor.name
  }
}

const dynamoClient = new DynamoDB.DocumentClient()

const channelToChannelDocument = (channel: Channel): ChannelDocument => ({
  id: channel.id ?? uuidv4(),
  type: channel.type,
  ownerConnectionId: channel.ownerConnectionId,
  connectedConnectionIds: channel.connectedConnectionIds,
  createdAt: channel.createdAt.toISOString(),
})

const channelDocumentToChannel = (channelDocument: ChannelDocument): Channel => ({
  id: channelDocument.id,
  type: channelDocument.type,
  ownerConnectionId: channelDocument.ownerConnectionId,
  connectedConnectionIds: channelDocument.connectedConnectionIds,
  createdAt: new Date(channelDocument.createdAt),
})

export default {
  create: async (channel: Channel): Promise<Channel> => {
    const table = process.env.TABLE_CHANNELS
    const document = channelToChannelDocument(channel)
    await dynamoClient.put({ TableName: table, Item: document }).promise()
    return channelDocumentToChannel(document)
  },

  get: async (id: string): Promise<Channel> => {
    const table = process.env.TABLE_CHANNELS
    const channel = await dynamoClient.get({ TableName: table, Key: { id } }).promise()

    if (!channel.Item) {
      throw new ChannelNotFoundError(id)
    }

    return channelDocumentToChannel(channel.Item as ChannelDocument)
  },

  delete: async (id: string): Promise<void> => {
    const table = process.env.TABLE_CHANNELS
    await dynamoClient.delete({ TableName: table, Key: { id } }).promise()
  },

  join: async (id: string, connectionId: string): Promise<void> => {
    const table = process.env.TABLE_CHANNELS
    await dynamoClient.update({
      TableName: table,
      Key: { id },
      UpdateExpression: 'set #connectedConnectionIds = list_append($connectedConnectionIds, :connectionId)',
      ExpressionAttributeNames: { '#connectedConnectionIds': 'connectedConnectionIds' },
      ExpressionAttributeValues: { ':connectionId': [connectionId] },
    }).promise()
  },
}
