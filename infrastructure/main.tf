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

output "Cloudflare_account" {
  value = data.cloudflare_account.lipelix_labs
}

data "cloudflare_account" "lipelix_labs" {
  filter = {
    name = "lipelix-labs"
  }
}
