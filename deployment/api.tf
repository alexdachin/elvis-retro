resource "aws_apigatewayv2_api" "websocket_api" {
  name                       = "${var.resource_prefix}-websocket-api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
  tags                       = var.tags
}

resource "aws_apigatewayv2_stage" "deployed" {
  api_id      = aws_apigatewayv2_api.websocket_api.id
  auto_deploy = true
  name        = "deployed"

  default_route_settings {
    data_trace_enabled     = true
    logging_level          = "ERROR"
    throttling_burst_limit = 5000
    throttling_rate_limit  = 10000
  }
}

resource "aws_cloudwatch_log_group" "api_deployed_stage_log_group" {
  name              = "/aws/apigateway/${aws_apigatewayv2_api.websocket_api.id}/deployed"
  retention_in_days = 14
  tags              = var.tags
}
