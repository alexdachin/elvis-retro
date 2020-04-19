import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  process.stdout.write(`$disconnect Event: ${JSON.stringify(event)}`)

  return {
    statusCode: 200,
    body: JSON.stringify(null),
  }
}
