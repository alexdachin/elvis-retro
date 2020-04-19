module "create_note" {
  source = "./modules/websocket-api-route"

  name      = "create-note"
  route_key = "create-note"

  environment_variables = {
    TABLE_NOTES = aws_dynamodb_table.notes.name
  }

  api_id            = aws_apigatewayv2_api.websocket_api.id
  api_execution_arn = aws_apigatewayv2_api.websocket_api.execution_arn
  resource_prefix   = var.resource_prefix
  tags              = var.tags
}

resource "aws_iam_role_policy" "create_note_dynamodb" {
  name   = "${var.resource_prefix}-create-note-dynamodb"
  role   = module.create_note.lambda_role.name
  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "dynamodb:PutItem"
        ],
        "Effect": "Allow",
        "Resource": "${aws_dynamodb_table.notes.arn}"
      }
    ]
  }
  EOF
}
