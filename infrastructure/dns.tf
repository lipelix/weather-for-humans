resource "cloudflare_zone" "pocasi_pro_lidi_cz" {
  account = {
    id = data.cloudflare_account.lipelix_labs.id
  }
  name = "pocasi-pro-lidi.cz"
  type = "full"
}

resource "cloudflare_dns_record" "pocasi_pro_lidi_records_ipv4" {
  for_each = toset(["216.239.32.21", "216.239.34.21", "216.239.36.21", "216.239.38.21"])
  zone_id  = cloudflare_zone.pocasi_pro_lidi_cz.id
  name     = "@"
  content  = each.key
  type     = "A"
  proxied  = true
  ttl      = 1
}

resource "cloudflare_dns_record" "pocasi_pro_lidi_records_ipv6" {
  for_each = toset(["2001:4860:4802:32::15", "2001:4860:4802:34::15", "2001:4860:4802:36::15", "2001:4860:4802:38::15"])
  zone_id  = cloudflare_zone.pocasi_pro_lidi_cz.id
  name     = "@"
  content  = each.key
  type     = "AAAA"
  proxied  = true
  ttl      = 1
}

resource "cloudflare_dns_record" "pocasi_pro_lidi_records_cname" {
  zone_id  = cloudflare_zone.pocasi_pro_lidi_cz.id
  name     = "www"
  content  = "ghs.googlehosted.com"
  type     = "CNAME"
  proxied  = true
  ttl      = 1
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
