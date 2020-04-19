data "archive_file" "handler" {
  output_path = "${path.root}/../tmp/${var.name}-handler.zip"
  source_file = "${path.root}/../app/backend/build/${var.name}-handler.js"
  type        = "zip"
}

resource "aws_lambda_function" "lambda" {
  function_name = "${var.resource_prefix}-${var.name}"

  filename         = data.archive_file.handler.output_path
  handler          = "${var.name}-handler.handler"
  role             = aws_iam_role.lambda.arn
  runtime          = "nodejs12.x"
  source_code_hash = filebase64sha256(data.archive_file.handler.output_path)

  dynamic environment {
    for_each = length(var.environment_variables) > 0 ? [var.environment_variables] : []

    content {
      variables = environment.value
    }
  }

  tags = var.tags
}

resource "aws_cloudwatch_log_group" "log_group" {
  name              = "/aws/lambda/${var.resource_prefix}-${var.name}"
  retention_in_days = 14

  tags = var.tags
}
