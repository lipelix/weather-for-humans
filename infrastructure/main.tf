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
    google = {
      source  = "hashicorp/google"
      version = "6.17.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "google" {
  project = var.gcp_project_id
  region  = "us-east1" // Free Tier is only available in us-east1, us-west1, and us-central1 regions
}

output "Cloudflare_account" {
  value = data.cloudflare_account.lipelix_labs
}

data "cloudflare_account" "lipelix_labs" {
  filter = {
    name = "lipelix-labs"
  }
}
