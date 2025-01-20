resource "cloudflare_zone" "pocasi_pro_lidi_cz" {
  account = {
    id = data.cloudflare_account.lipelix_labs.id
  }
  name = "pocasi-pro-lidi.cz"
  type = "full"
}

resource "cloudflare_dns_record" "pocasi_pro_lidi_all" {
  zone_id = cloudflare_zone.pocasi_pro_lidi_cz.id
  name    = "pocasi-pro-lidi.cz"
  content = "139.59.142.55"
  type    = "A"
  proxied = true
  ttl     = 1
}

output "Cloudlflare_zone_metadata" {
  value = cloudflare_zone.pocasi_pro_lidi_cz.meta
}

output "Cloudlflare_zone_status" {
  value = cloudflare_zone.pocasi_pro_lidi_cz.status
}

output "Cloudlflare_zone_name_servers" {
  value = cloudflare_zone.pocasi_pro_lidi_cz.name_servers
}
