module "join_channel" {
  source = "./modules/websocket-api-route"

  name      = "join-channel"
  route_key = "join-channel"

  environment_variables = {
    TABLE_CHANNELS = aws_dynamodb_table.channels.name
  }

  api_id            = aws_apigatewayv2_api.websocket_api.id
  api_execution_arn = aws_apigatewayv2_api.websocket_api.execution_arn
  dynamodb_tables = {
    channels : aws_dynamodb_table.channels
  }
  resource_prefix = var.resource_prefix
  response        = true
  tags            = var.tags
}
