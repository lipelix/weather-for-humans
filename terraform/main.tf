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

  config_vars = {
    # FOOBAR = "baz"
  }

  buildpacks = [
    "heroku/nodejs"
  ]
}
