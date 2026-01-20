.PHONY: help validate test build release-prep release

# Default target
help:
	@echo "Available targets:"
	@echo "  validate    - Run all validation checks (docs, tests, build)"
	@echo "  test        - Run test suite"
	@echo "  build       - Build the extension"
	@echo "  release-prep - Prepare for release (validate + check git status)"
	@echo "  release     - Create a release (requires VERSION variable)"
	@echo ""
	@echo "Examples:"
	@echo "  make validate"
	@echo "  make release VERSION=1.10.0"

# Run all validation checks
validate: lint-docs test build
	@echo "✅ All validation checks passed"

# Validate feature file structure
lint-docs:
	@echo "📝 Validating feature file structure..."
	@npm run lint:docs

# Run tests
test:
	@echo "🧪 Running tests..."
	@npm test

# Build the extension
build:
	@echo "🔨 Building extension..."
	@npm run build

# Prepare for release - run all checks
release-prep: validate
	@echo "📋 Checking git status..."
	@if [ -n "$$(git status --porcelain)" ]; then \
		echo "⚠️  Warning: You have uncommitted changes"; \
		git status --short; \
		echo ""; \
		echo "Please commit or stash changes before releasing."; \
		exit 1; \
	fi
	@echo "✅ Ready for release"

# Create a release
release: release-prep
	@if [ -z "$(VERSION)" ]; then \
		echo "❌ Error: VERSION is required"; \
		echo "Usage: make release VERSION=1.10.0"; \
		exit 1; \
	fi
	@echo "🚀 Creating release v$(VERSION)..."
	@echo "⚠️  This will:"
	@echo "   1. Update package.json version to $(VERSION)"
	@echo "   2. Update CHANGELOG.md"
	@echo "   3. Commit changes"
	@echo "   4. Create tag v$(VERSION)"
	@echo "   5. Push to origin"
	@echo ""
	@read -p "Continue? [y/N] " -n 1 -r; \
	echo; \
	if [ "$$REPLY" != "y" ] && [ "$$REPLY" != "Y" ]; then \
		echo "Release cancelled."; \
		exit 1; \
	fi
	@echo "📦 Updating version to $(VERSION)..."
	@node -e "const fs=require('fs');const p=JSON.parse(fs.readFileSync('package.json'));p.version='$(VERSION)';fs.writeFileSync('package.json',JSON.stringify(p,null,2)+'\n');"
	@echo "📝 Please update CHANGELOG.md with release notes for v$(VERSION)"
	@echo "   Then run: make release-commit VERSION=$(VERSION)"

# Commit and tag the release (after CHANGELOG is updated)
release-commit:
	@if [ -z "$(VERSION)" ]; then \
		echo "❌ Error: VERSION is required"; \
		echo "Usage: make release-commit VERSION=1.10.0"; \
		exit 1; \
	fi
	@echo "📝 Committing release v$(VERSION)..."
	@git add package.json CHANGELOG.md
	@git commit -m "chore(release): v$(VERSION)"
	@echo "🏷️  Creating tag v$(VERSION)..."
	@git tag v$(VERSION)
	@echo "📤 Pushing to origin..."
	@git push origin main
	@git push origin v$(VERSION)
	@echo "✅ Release v$(VERSION) created and pushed!"
	@echo "🔄 CI/CD will automatically publish to VS Code Marketplace and OpenVSX"
