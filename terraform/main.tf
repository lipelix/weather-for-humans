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
  buildpacks = ["heroku/nodejs"]

  source {
    url     = "https://github.com/lipelix/weather-for-humans/archive/refs/tags/latest.tar.gz"
    version = "latest"
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

output "app_url" {
  value = "https://${heroku_app.this.name}.herokuapp.com"
}