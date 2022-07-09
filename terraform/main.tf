terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "lipelix"

    workspaces {
      name = "pocasi-pro-lidi"
    }
  }
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "5.0.2"
    }
  }
}

provider "heroku" {
  email   = "lipelix@gmail.com"
  api_key = var.heroku_api_key
}

locals {
  github_release = "https://github.com/lipelix/weather-for-humans/archive/refs/tags/latest.tar.gz"
}

resource "heroku_app" "this" {
  name   = "pocasi-pro-lidi"
  region = "eu"
}

resource "heroku_app_config_association" "this" {
  app_id = heroku_app.this.id

  vars = {}
  sensitive_vars = {
    OPENWEATHER_API_KEY = var.openweather_api_key
  }
}

# Build code & release to the app
resource "heroku_build" "this" {
  app_id     = heroku_app.this.id
  buildpacks = ["https://github.com/heroku/heroku-buildpack-nodejs#latest"]

  source {
    url      = local.github_release
    version  = "latest"
    checksum = data.local_file.this.content
  }
}

# Launch the app's web process by scaling-up
resource "heroku_formation" "this" {
  app_id     = heroku_app.this.id
  type       = "web"
  quantity   = 1
  size       = "free"
  depends_on = [heroku_build.this]
}

resource "null_resource" "this" {
  triggers = {
    "always_run" = "timestamp()"
  }

  provisioner "local-exec" {
    command = "curl ${local.github_release} | openssl sha256 >> ${path.module}/latest_release_sha256.txt"
  }
}

data "local_file" "this" {
  filename   = "${path.module}/latest_release_sha256.txt"
  depends_on = [null_resource.this]
}

output "latest_release_sha256" {
  value = data.local_file.this.content
}

output "app_url" {
  value = "https://${heroku_app.this.name}.herokuapp.com"
}
