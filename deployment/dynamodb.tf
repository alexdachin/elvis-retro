locals {
  dynamodb_tables = {
    channels : aws_dynamodb_table.channels
    connections : aws_dynamodb_table.connections
  }
}

resource "aws_dynamodb_table" "connections" {
  name = "${var.resource_prefix}-connections"

  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "connectionId"

  attribute {
    name = "connectionId"
    type = "S"
  }

  tags = var.tags
}

resource "aws_dynamodb_table" "channels" {
  name = "${var.resource_prefix}-channels"

  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  tags = var.tags
}
