import { Note } from '../models/note'

import DynamoDB from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'

interface NoteDocument {
  id: string;
  content: string;
  createdAt: string;
}

const dynamoClient = new DynamoDB.DocumentClient()

const noteToNoteDocument = (note: Note): NoteDocument => ({
  id: note.id ?? uuidv4(),
  content: note.content,
  createdAt: note.createdAt.toISOString(),
})

export default {
  create: async (note: Note): Promise<void> => {
    const table = process.env.TABLE_NOTES
    const document = noteToNoteDocument(note)
    await dynamoClient.put({ TableName: table, Item: document }).promise()
  },
}
