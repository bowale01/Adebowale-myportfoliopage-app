variable "key_name" {
  description = "The name of the SSH key pair to use for EC2 access"
  type        = string
  default     = "debolek-ec2-access"
}

variable "github_repo" {
  description = "GitHub repo in the format owner/repo-name — used to scope OIDC trust"
  type        = string
  default     = "bowale01/Adebowale-myportfoliopage-app"
}
