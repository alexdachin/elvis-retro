resource "aws_apigatewayv2_api" "api" {
  name                       = "${var.resource_prefix}-websocket-api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}
