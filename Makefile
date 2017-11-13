STACK_NAME=ProjectMongoCloudFrontend
TEMPLATE_FILE=frontend_stack.yml

build: $(TEMPLATE_FILE)
	aws cloudformation update-stack --stack-name ${STACK_NAME} --template-body file://$(TEMPLATE_FILE)
	aws cloudformation wait stack-update-complete --stack-name $(STACK_NAME)

clean: $(TEMPLATE_FILE)
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
	aws cloudformation wait stack-delete-complete --stack-name $(STACK_NAME)

cleanbuild: $(TEMPLATE_FILE)
	echo "Deleting previous stack"
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
	aws cloudformation wait stack-delete-complete --stack-name $(STACK_NAME)

	echo "Creating stack"
	aws cloudformation deploy --stack-name $(STACK_NAME) --template $(TEMPLATE_FILE)
