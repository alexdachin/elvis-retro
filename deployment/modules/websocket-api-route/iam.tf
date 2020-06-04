resource "aws_iam_role" "lambda" {
  name               = "${var.resource_prefix}-${var.name}-lambda"
  assume_role_policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Effect": "Allow",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        }
      }
    ]
  }
  EOF

  tags = var.tags
}

resource "aws_iam_role_policy" "write_to_cloudwatch" {
  name   = "${var.resource_prefix}-${var.name}-write-to-cloudwatch"
  role   = aws_iam_role.lambda.name
  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Effect": "Allow",
        "Resource": "${aws_cloudwatch_log_group.log_group.arn}"
      }
    ]
  }
  EOF
}

resource "aws_iam_role_policy" "dynamodb_access" {
  for_each = var.dynamodb_tables

  name   = "${var.resource_prefix}-${var.name}-dynamodb-access"
  role   = aws_iam_role.lambda.name
  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "dynamodb:*Item",
        "Effect": "Allow",
        "Resource": "${each.value.arn}"
      }
    ]
  }
  EOF
}
