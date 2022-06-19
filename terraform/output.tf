output "name" {
  description = "The name of the app."
  value       = heroku_app.this.name
}

output "region" {
  description = "The region that the app should be deployed in."
  value       = heroku_app.this.region
}

output "git-url" {
  description = "The Git URL for the application. This is used for deploying new versions of the app."
  value       = heroku_app.this.region
}

output "web_url" {
  description = "The web (HTTP) URL that the application can be accessed at by default."
  value       = heroku_app.this.web_url
}

output "heroku_hostname" {
  description = "A hostname for the Heroku application, suitable for pointing DNS records."
  value       = heroku_app.this.heroku_hostname
}