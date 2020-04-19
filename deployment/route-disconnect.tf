module "disconnect" {
  source = "./modules/websocket-api-route"

  name      = "disconnect"
  route_key = "$disconnect"

  environment_variables = {}

  api_id            = aws_apigatewayv2_api.websocket_api.id
  api_execution_arn = aws_apigatewayv2_api.websocket_api.execution_arn
  resource_prefix   = var.resource_prefix
  tags              = var.tags
}
