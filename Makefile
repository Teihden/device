install:
	npm ci --force

lint:
	npx stylelint ./src/scss/**/*.scss --fix --color
	npx pug-lint ./src/pug/**/*.pug --reporter node_modules/puglint-stylish
