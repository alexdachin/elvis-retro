module "connect" {
  source = "./modules/websocket-api-route"

  name      = "connect"
  route_key = "$connect"

  environment_variables = {
    TABLE_CONNECTIONS = aws_dynamodb_table.connections.name
  }

  api_id            = aws_apigatewayv2_api.websocket_api.id
  api_execution_arn = aws_apigatewayv2_api.websocket_api.execution_arn
  dynamodb_tables = {
    connections : aws_dynamodb_table.connections
  }
  resource_prefix = var.resource_prefix
  tags            = var.tags
}
