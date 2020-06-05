module "create_channel" {
  source = "./modules/websocket-api-route"

  name      = "create-channel"
  route_key = "create-channel"

  environment_variables = {
    TABLE_CHANNELS    = aws_dynamodb_table.channels.name
    TABLE_CONNECTIONS = aws_dynamodb_table.connections.name
  }

  api_id            = aws_apigatewayv2_api.websocket_api.id
  api_execution_arn = aws_apigatewayv2_api.websocket_api.execution_arn
  dynamodb_tables   = local.dynamodb_tables
  resource_prefix   = var.resource_prefix
  response          = true
  tags              = var.tags
}
