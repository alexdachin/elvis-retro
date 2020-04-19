variable resource_prefix {
  type    = string
  default = "elvis"
}

variable aws_region {
  type    = string
  default = "eu-west-1"
}

variable tags {
  type    = map(string)
  default = {}
}
