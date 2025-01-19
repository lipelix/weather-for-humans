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
      version = "5.0.0-rc1"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

data "cloudflare_accounts" "default" {
  name = "lipelix-labs"
}

output "cloudflare_accounts_default" {
  value = data.cloudflare_accounts.default
}

locals {
  cloudflare_account_id = "6f76767ec8a36e314efe33576a15d9af"
}
