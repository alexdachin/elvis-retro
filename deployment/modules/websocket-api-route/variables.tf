variable api_id { type = string }
variable api_execution_arn { type = string }
variable dynamodb_tables {
  type    = map(any)
  default = {}
}
variable environment_variables { type = map(string) }
variable name { type = string }
variable resource_prefix { type = string }
variable response {
  type    = bool
  default = false
}
variable route_key { type = string }
variable tags { type = map(string) }
