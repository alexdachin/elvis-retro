import { Connection } from '../models/connection'

import DynamoDB from 'aws-sdk/clients/dynamodb'

interface ConnectionDocument {
  connectionId: string;
  name?: string;
  channelId?: string;
  createdAt: string;
}

export class ConnectionNotFoundError extends Error {
  constructor (connectionId: string) {
    super()
    this.message = `Connection ${connectionId} not found!`
    this.name = this.constructor.name
  }
}

const dynamoClient = new DynamoDB.DocumentClient()

const connectionToConnectionDocument = (connection: Connection): ConnectionDocument => ({
  connectionId: connection.connectionId,
  name: connection.name,
  channelId: connection.channelId,
  createdAt: connection.createdAt.toISOString(),
})

const connectionDocumentToConnection = (connectionDocument: ConnectionDocument): Connection => ({
  connectionId: connectionDocument.connectionId,
  name: connectionDocument.name,
  channelId: connectionDocument.channelId,
  createdAt: new Date(connectionDocument.createdAt),
})

export default {
  create: async (connection: Connection): Promise<void> => {
    const table = process.env.TABLE_CONNECTIONS
    const document = connectionToConnectionDocument(connection)
    await dynamoClient.put({ TableName: table, Item: document }).promise()
  },

  get: async (connectionId: string): Promise<Connection> => {
    const table = process.env.TABLE_CONNECTIONS
    const connection = await dynamoClient.get({ TableName: table, Key: { connectionId } }).promise()

    if (!connection.Item) {
      throw new ConnectionNotFoundError(connectionId)
    }

    return connectionDocumentToConnection(connection.Item as ConnectionDocument)
  },

  delete: async (connectionId: string): Promise<void> => {
    const table = process.env.TABLE_CONNECTIONS
    await dynamoClient.delete({ TableName: table, Key: { connectionId } }).promise()
  },

  setName: async (connectionId: string, name: string): Promise<void> => {
    const table = process.env.TABLE_CONNECTIONS
    await dynamoClient.update({
      TableName: table,
      Key: { connectionId },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: { ':name': name },
    }).promise()
  },

  joinChannel: async (connectionId: string, channelId: string): Promise<void> => {
    const table = process.env.TABLE_CONNECTIONS
    await dynamoClient.update({
      TableName: table,
      Key: { connectionId },
      UpdateExpression: 'set #channelId = :channelId',
      ExpressionAttributeNames: { '#channelId': 'channelId' },
      ExpressionAttributeValues: { ':channelId': channelId },
    }).promise()
  },
}
