resource "aws_apigatewayv2_integration" "lambda" {
  api_id           = var.api_id
  integration_type = "AWS_PROXY"

  content_handling_strategy = "CONVERT_TO_TEXT"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.lambda.invoke_arn
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = var.api_id
  route_key = var.route_key
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_integration_response" "response" {
  count = var.response ? 1 : 0

  api_id                   = var.api_id
  integration_id           = aws_apigatewayv2_integration.lambda.id
  integration_response_key = "$default"
}

resource "aws_apigatewayv2_route_response" "example" {
  count = var.response ? 1 : 0

  api_id             = var.api_id
  route_id           = aws_apigatewayv2_route.route.id
  route_response_key = "$default"
}

resource "aws_lambda_permission" "api_lambda_invoke" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_execution_arn}/*/${var.route_key}"
}
