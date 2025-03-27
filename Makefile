TS_FILES = $(shell find src -type f -name "*.ts")

node_modules: package.json
	npm install

dist: node_modules $(TS_FILES) 
	ng build

.PHONY: unit-tests
unit-tests: node_modules $(TS_FILES)
ifdef CI
	ng test --watch=false --browsers=Chrome_no_sandbox	
else
	ng test
endif