#!/bin/bash

STACK_NAME=ProjectMongoCloudFrontend

echo "Deleting previous stack"
aws cloudformation delete-stack --stack-name $STACK_NAME
aws cloudformation wait stack-delete-complete --stack-name $STACK_NAME

echo "Creating stack"
aws cloudformation deploy --stack-name $STACK_NAME --template frontend_stack.yml
