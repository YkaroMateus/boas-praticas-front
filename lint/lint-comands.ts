const comands ={"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"lint:fix": "eslint --fix src/**/*.{jsx,ts,tsx}",
"format": "prettier --write \"**/*.*\""}