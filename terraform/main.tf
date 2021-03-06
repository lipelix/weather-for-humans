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
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "3.19.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_zone" "this" {
  zone = "pocasi-pro-lidi.cz"
}

resource "cloudflare_record" "this" {
  zone_id = cloudflare_zone.this.id
  name    = "@"
  value   = "functional-corythosaurus-3t4m949y7eevrxu8fjey73m2.herokudns.com"
  type    = "CNAME"
  proxied = true
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

  vars = {
    HOSTNAME = "pocasi-pro-lidi.cz"
  }
  sensitive_vars = {
    OPENWEATHER_API_KEY = var.openweather_api_key
  }
}

# Associate a custom domain
resource "heroku_domain" "this" {
  app_id   = heroku_app.this.id
  hostname = "pocasi-pro-lidi.cz"
}

# Build code & release to the app
resource "heroku_build" "this" {
  app_id     = heroku_app.this.id
  buildpacks = ["https://github.com/heroku/heroku-buildpack-nodejs#latest"]

  source {
    url = local.github_release
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
