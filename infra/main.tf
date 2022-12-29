terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "lipelix"

    workspaces {
      name = "pocasi-pro-lidi-dokku"
    }
  }
  required_providers {
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
  name    = "pocasi-pro-lidi.cz"
  value   = "139.59.142.55"
  type    = "A"
  proxied = true
}
