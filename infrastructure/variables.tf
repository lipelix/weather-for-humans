variable "openweather_api_key" {
  type      = string
  sensitive = true
}

variable "cloudflare_api_token" {
  type      = string
  sensitive = true
}

variable "gcp_project_id" {
  type    = string
  default = "weather-for-humans-449320"
}

variable "GOOGLE_CREDENTIALS" { // setup on terraform cloud as a sensitive variable
  type      = string
  sensitive = true
}