install:
	npm ci --force

lint:
	npx stylelint ./app/**/*.scss --fix
	npx pug-lint ./app/pug/**/*.pug --reporter node_modules/puglint-stylish
