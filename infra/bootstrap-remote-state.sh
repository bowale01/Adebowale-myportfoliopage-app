#!/bin/bash
# Run this ONCE before terraform init to create the S3 bucket and DynamoDB lock table
# After this runs, do: terraform init  (it will migrate local state to S3)

AWS_REGION="us-east-1"
BUCKET_NAME="debolek-portfolio-terraform-state"
TABLE_NAME="debolek-portfolio-terraform-lock"

echo "Creating S3 bucket for Terraform state..."
aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $AWS_REGION

# Enable versioning — lets you recover previous state files if something goes wrong
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled

# Enable encryption at rest
aws s3api put-bucket-encryption \
  --bucket $BUCKET_NAME \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# Block all public access — state files must never be public
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

echo "Creating DynamoDB table for state locking..."
aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

echo ""
echo "Done. Now run:"
echo "  cd infra"
echo "  terraform init"
echo ""
echo "Terraform will detect the new backend and ask to migrate your local state to S3."
echo "Type 'yes' to migrate."
