# Project file and folder structure

Omitted from the tree: `node_modules`, `.next`, `.git`, and common build/cache folders (`dist`, `build`, `coverage`, `.turbo`, `.vercel`, `out`). See [scripts/generate-project-structure.ps1](scripts/generate-project-structure.ps1) and [scripts/emit-PROJECT-STRUCTURE-md.ps1](scripts/emit-PROJECT-STRUCTURE-md.ps1).

## Regenerate

From the project root, in **PowerShell**:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\emit-PROJECT-STRUCTURE-md.ps1
```

Or print the tree to the console only:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\generate-project-structure.ps1
```

## Tree (ASCII)

```
live
+-- app
|   +-- (admin)
|   |   \-- admin
|   |       +-- api-keys
|   |       |   \-- page.tsx
|   |       +-- blogs
|   |       |   +-- edit
|   |       |   |   \-- [id]
|   |       |   |       \-- page.tsx
|   |       |   +-- new
|   |       |   |   \-- page.tsx
|   |       |   \-- page.tsx
|   |       +-- case-studies
|   |       |   +-- edit
|   |       |   |   \-- [id]
|   |       |   |       \-- page.tsx
|   |       |   +-- new
|   |       |   |   \-- page.tsx
|   |       |   \-- page.tsx
|   |       +-- form-submission
|   |       |   +-- page.tsx
|   |       |   \-- README.md
|   |       +-- invoice
|   |       |   \-- page.tsx
|   |       +-- invoices
|   |       |   +-- new
|   |       |   |   \-- page.tsx
|   |       |   \-- page.tsx
|   |       +-- leads
|   |       |   \-- page.tsx
|   |       +-- notification
|   |       |   \-- page.tsx
|   |       +-- reviews
|   |       |   +-- edit
|   |       |   |   \-- [id]
|   |       |   |       \-- page.tsx
|   |       |   +-- new
|   |       |   |   \-- page.tsx
|   |       |   \-- page.tsx
|   |       +-- settings
|   |       |   \-- page.tsx
|   |       +-- users
|   |       |   \-- page.tsx
|   |       +-- layout.tsx
|   |       \-- page.tsx
|   +-- (dashboard)
|   |   +-- dashboard
|   |   |   +-- invoices
|   |   |   |   \-- [id]
|   |   |   |       \-- page.tsx
|   |   |   \-- page.tsx
|   |   \-- layout.tsx
|   +-- (home)
|   |   +-- about
|   |   |   \-- page.tsx
|   |   +-- about-us
|   |   |   +-- page.tsx
|   |   |   \-- page2.tsx
|   |   +-- case-studies
|   |   |   +-- [id]
|   |   |   |   +-- page.tsx
|   |   |   |   \-- page2.tsx
|   |   |   +-- page.tsx
|   |   |   \-- page2.tsx
|   |   +-- contact
|   |   |   +-- page.tsx
|   |   |   \-- page2.tsx
|   |   +-- dashboard-legacy
|   |   |   \-- page.tsx
|   |   +-- insights
|   |   |   +-- [slug]
|   |   |   |   +-- blog-detail-client.tsx
|   |   |   |   \-- page.tsx
|   |   |   +-- insights-client.tsx
|   |   |   \-- page.tsx
|   |   +-- invoice
|   |   |   \-- [id]
|   |   |       \-- page.tsx
|   |   +-- maintenance
|   |   |   \-- page.tsx
|   |   +-- marketplace
|   |   |   +-- agents
|   |   |   |   \-- [slug]
|   |   |   |       +-- agent-detail-client.tsx
|   |   |   |       \-- page.tsx
|   |   |   +-- automations
|   |   |   |   \-- [slug]
|   |   |   |       +-- automation-detail-client.tsx
|   |   |   |       \-- page.tsx
|   |   |   +-- websites
|   |   |   |   \-- [slug]
|   |   |   |       +-- page.tsx
|   |   |   |       \-- website-detail-client.tsx
|   |   |   \-- page.tsx
|   |   +-- methodology
|   |   |   \-- page.tsx
|   |   +-- pricing
|   |   |   \-- page.tsx
|   |   +-- privacy
|   |   |   \-- page.tsx
|   |   +-- security
|   |   |   \-- page.tsx
|   |   +-- sign-in
|   |   |   \-- [[...sign-in]]
|   |   |       \-- page.tsx
|   |   +-- sign-up
|   |   |   \-- [[...sign-up]]
|   |   |       \-- page.tsx
|   |   +-- solutions
|   |   |   +-- ai-agents
|   |   |   |   \-- page.tsx
|   |   |   +-- b2b-consulting
|   |   |   |   \-- page.tsx
|   |   |   +-- web-development
|   |   |   |   \-- page.tsx
|   |   |   \-- workflow-automation
|   |   |       \-- page.tsx
|   |   +-- submit-review
|   |   |   \-- page.tsx
|   |   +-- terms
|   |   |   \-- page.tsx
|   |   +-- layout.tsx
|   |   +-- not-found.tsx
|   |   \-- page.tsx
|   +-- api
|   |   +-- admin
|   |   |   \-- invoices
|   |   |       \-- create
|   |   |           \-- route.ts
|   |   +-- analytics
|   |   |   \-- route.ts
|   |   +-- chat
|   |   |   \-- route.ts
|   |   +-- contact
|   |   |   \-- route.ts
|   |   +-- invoices
|   |   |   \-- [id]
|   |   |       \-- pdf
|   |   |           \-- route.ts
|   |   +-- maintenance
|   |   |   \-- route.ts
|   |   +-- payments
|   |   |   \-- sslcommerz
|   |   |       +-- fail
|   |   |       |   \-- route.ts
|   |   |       +-- init
|   |   |       |   \-- route.ts
|   |   |       +-- ipn
|   |   |       |   \-- route.ts
|   |   |       \-- success
|   |   |           \-- route.ts
|   |   +-- reviews
|   |   |   \-- submit
|   |   |       \-- route.ts
|   |   +-- upload
|   |   |   \-- image
|   |   |       \-- route.ts
|   |   \-- webhooks
|   |       \-- clerk
|   |           \-- route.ts
|   +-- globals.css
|   +-- layout.tsx
|   \-- not-found.tsx
+-- components
|   +-- AboutUs
|   |   +-- AboutCTA.tsx
|   |   +-- AboutHero.tsx
|   |   +-- FounderProfile.tsx
|   |   +-- StatsBanner.tsx
|   |   +-- StorySection.tsx
|   |   \-- ValuesGrid.tsx
|   +-- admin
|   |   +-- api-keys
|   |   |   \-- ApiKeysTable.tsx
|   |   +-- blog
|   |   |   +-- BlogCategoryTags.tsx
|   |   |   +-- BlogEditor.tsx
|   |   |   +-- BlogMetadata.tsx
|   |   |   +-- CategoryManager.tsx
|   |   |   +-- CHANGES.md
|   |   |   +-- CoverImageUpload.tsx
|   |   |   +-- README.md
|   |   |   +-- REFACTORING.md
|   |   |   +-- ResizableImage.tsx
|   |   |   \-- TiptapMenuBar.tsx
|   |   +-- case study
|   |   |   +-- CaseStudyForm.tsx
|   |   |   +-- caseStudyFormSchema.ts
|   |   |   +-- ContentStep.tsx
|   |   |   +-- EditCaseStudyForm.tsx
|   |   |   +-- MetadataStep.tsx
|   |   |   \-- VisualsStep.tsx
|   |   +-- dashboard
|   |   |   +-- DebugInfoPanel.tsx
|   |   |   +-- EmptyState.tsx
|   |   |   +-- SubmissionsActions.tsx
|   |   |   +-- SubmissionsFilters.tsx
|   |   |   \-- SubmissionsTable.tsx
|   |   +-- form-submission
|   |   |   +-- PaginationControls.tsx
|   |   |   +-- REFACTORING.md
|   |   |   +-- StatusSelector.tsx
|   |   |   +-- SubmissionDetailsDialog.tsx
|   |   |   \-- SubmissionsTable.tsx
|   |   +-- invoices
|   |   |   +-- InvoiceCreateDialog.tsx
|   |   |   +-- InvoiceCreatePage.tsx
|   |   |   \-- InvoicesTable.tsx
|   |   +-- leads
|   |   |   +-- LeadsTable.tsx
|   |   |   \-- LeadStats.tsx
|   |   +-- notifications
|   |   |   +-- CreateNotification.tsx
|   |   |   \-- NotificationTabs.tsx
|   |   +-- review
|   |   |   +-- CHANGELOG.md
|   |   |   +-- CreateClientReview.tsx
|   |   |   +-- EditReviewForm.tsx
|   |   |   +-- README.md
|   |   |   +-- ReviewForm.tsx
|   |   |   +-- reviewFormSchema.ts
|   |   |   +-- ReviewInfoStep.tsx
|   |   |   +-- ReviewMediaStep.tsx
|   |   |   +-- ReviewMetricsStep.tsx
|   |   |   +-- ReviewPagination.tsx
|   |   |   +-- ReviewTableRow.tsx
|   |   |   \-- ReviewTables.tsx
|   |   +-- user
|   |   |   +-- DeleteConfirmationDialog.tsx
|   |   |   +-- SystemAdminTransferDialog.tsx
|   |   |   +-- UserFormDialog.tsx
|   |   |   +-- UserManagementHeader.tsx
|   |   |   \-- UserTable.tsx
|   |   \-- AdminLoginModal.tsx
|   +-- agent-marketplace
|   |   +-- AgentCard.tsx
|   |   +-- AgentMarketplaceClient.tsx
|   |   +-- get-started-modal.tsx
|   |   +-- MarketplaceCTA.tsx
|   |   +-- MarketplaceFilters.tsx
|   |   +-- MarketplaceGrid.tsx
|   |   +-- MarketplaceHero.tsx
|   |   +-- MarketplaceStats.tsx
|   |   +-- ProductCTA.tsx
|   |   +-- ProductFAQ.tsx
|   |   +-- ProductFeatures.tsx
|   |   +-- ProductHero.tsx
|   |   +-- ProductIncludes.tsx
|   |   +-- ProductTestimonial.tsx
|   |   \-- ProductVideo.tsx
|   +-- agent-marketplace2
|   |   +-- AgentCard.tsx
|   |   +-- AgentFeatures.tsx
|   |   +-- AgentFilters.tsx
|   |   +-- AgentHeader.tsx
|   |   +-- AgentPricing.tsx
|   |   +-- CategoryNavigation.tsx
|   |   +-- ConciergeRoadmap.tsx
|   |   +-- FinalAction.tsx
|   |   +-- MarketplaceHero.tsx
|   |   +-- MediaGallery.tsx
|   |   +-- Prerequisites.tsx
|   |   +-- ProcessTimeline.tsx
|   |   +-- ProcurementSidebar.tsx
|   |   +-- ProductCard.tsx
|   |   +-- ProofSuite.tsx
|   |   +-- SpecsTable.tsx
|   |   +-- SystemCapabilities.tsx
|   |   +-- SystemMedia.tsx
|   |   \-- TrustGrid.tsx
|   +-- auth
|   |   \-- SyncUser.tsx
|   +-- CaseStudies
|   |   +-- CaseStudiesClient.tsx
|   |   +-- CaseStudyCard.tsx
|   |   +-- CaseStudyCTA.tsx
|   |   +-- CaseStudyDetailClient.tsx
|   |   +-- CaseStudyGrid.tsx
|   |   +-- CaseStudyHero.tsx
|   |   +-- CaseStudyList.tsx
|   |   +-- CaseStudyResultsStrip.tsx
|   |   \-- VideoTestimonialCarousel.tsx
|   +-- chatbot
|   |   +-- chatbot-config.ts
|   |   +-- ChatEmpty.tsx
|   |   +-- ChatHeader.tsx
|   |   +-- ChatInput.tsx
|   |   +-- ChatMessage.tsx
|   |   \-- ChatWidget.tsx
|   +-- contact
|   |   +-- ContactAlternatives.tsx
|   |   +-- ContactConfirmationEmail.tsx
|   |   +-- ContactFAQ.tsx
|   |   +-- ContactFormModal.tsx
|   |   \-- ContactHero.tsx
|   +-- dashboard
|   |   +-- DashboardClient.tsx
|   |   \-- DashboardHeader.tsx
|   +-- effects
|   |   \-- bg-effects.tsx
|   +-- email
|   |   +-- ContactConfirmationEmail.tsx
|   |   \-- NewsletterConfirmationEmail.tsx
|   +-- footer
|   |   +-- FooterBrand.tsx
|   |   +-- FooterCTA.tsx
|   |   +-- FooterLegal.tsx
|   |   +-- FooterLegalTicker.tsx
|   |   +-- FooterLinks.tsx
|   |   +-- FooterLinksGrid.tsx
|   |   +-- FooterNewsletter.tsx
|   |   +-- FooterTop.tsx
|   |   \-- NewsletterForm.tsx
|   +-- home
|   |   +-- CorePillarsSection.tsx
|   |   +-- EcosystemDiagram.tsx
|   |   +-- FAQSection.tsx
|   |   +-- FinalCTASection.tsx
|   |   +-- HeroSection.tsx
|   |   +-- HowItWorksSection.tsx
|   |   +-- MoreThanAISection.tsx
|   |   +-- PricingSection.tsx
|   |   +-- PricingTeaser.tsx
|   |   +-- ProblemSection.tsx
|   |   +-- SolutionSection.tsx
|   |   +-- SuccessStoriesSection.tsx
|   |   \-- WhatYouGetSection.tsx
|   +-- insights
|   |   +-- details
|   |   |   +-- BreadcrumbNav.tsx
|   |   |   +-- PostFooterCTA.tsx
|   |   |   +-- PostHero.tsx
|   |   |   +-- PostNavigation.tsx
|   |   |   \-- PostSidebar.tsx
|   |   +-- FeaturedPost.tsx
|   |   +-- InsightsHero.tsx
|   |   +-- NewsLetter.tsx
|   |   +-- PostGrid.tsx
|   |   \-- SearchInterface.tsx
|   +-- invoice
|   |   +-- InvoiceClient.tsx
|   |   +-- InvoicePdf.tsx
|   |   \-- InvoicePreview.tsx
|   +-- marketplace
|   |   \-- MarketplaceClient.tsx
|   +-- our-methodology
|   |   +-- LifecycleSteps.tsx
|   |   +-- MethodologyCTA.tsx
|   |   +-- MethodologyHero.tsx
|   |   +-- PhilosophySection.tsx
|   |   \-- StandardsGrid.tsx
|   +-- pricing
|   |   +-- AdditionalServicesSection.tsx
|   |   +-- PricingCTA.tsx
|   |   +-- PricingFAQ.tsx
|   |   +-- PricingHero.tsx
|   |   +-- PricingTable.tsx
|   |   +-- ServicePriceGrid.tsx
|   |   +-- TabbedPricingSection.tsx
|   |   \-- TransparencyNote.tsx
|   +-- providers
|   |   +-- AlertDialogProvider.md
|   |   \-- AlertDialogProvider.tsx
|   +-- reviews
|   |   \-- ReviewSubmissionForm.tsx
|   +-- services
|   |   +-- b2b-consulting
|   |   |   +-- FAQSection.tsx
|   |   |   +-- Hero.tsx
|   |   |   +-- HowItWorksSection.tsx
|   |   |   +-- PricingSection.tsx
|   |   |   +-- ProblemSection.tsx
|   |   |   +-- SimpleCTA.tsx
|   |   |   +-- WhatIsConsulting.tsx
|   |   |   +-- WhatWeCoverSection.tsx
|   |   |   \-- WhoIsThisForSection.tsx
|   |   +-- custom-AI-Agent
|   |   |   +-- agent-marketplace-banners.tsx
|   |   |   +-- AIAgentChatDemo.tsx
|   |   |   +-- AIAgentFAQSection.tsx
|   |   |   +-- AIAgentHero.tsx
|   |   |   +-- AIAgentSimpleCTA.tsx
|   |   |   +-- BenefitsDeepDive.tsx
|   |   |   +-- FeaturesShowcaseSection.tsx
|   |   |   +-- HowItWorksSection.tsx
|   |   |   +-- LiveDemoSection.tsx
|   |   |   +-- ROICalculatorSection.tsx
|   |   |   \-- WhatIsAIAgent.tsx
|   |   +-- web-development
|   |   |   +-- CustomVsTemplate.tsx
|   |   |   +-- DevelopmentProcessSection.tsx
|   |   |   +-- PricingCalculatorSection.tsx
|   |   |   +-- TechStackSection.tsx
|   |   |   +-- WebDevFAQSection.tsx
|   |   |   +-- WebDevHero.tsx
|   |   |   +-- webdev-marketplace-banners.tsx
|   |   |   +-- WebDevSimpleCTA.tsx
|   |   |   +-- WebsiteTypesShowcase.tsx
|   |   |   +-- WebsiteTypesShowcase2.tsx
|   |   |   \-- WhatsIncludedSection.tsx
|   |   \-- workflow-automation
|   |       +-- AutomationHero.tsx
|   |       +-- automation-marketplace-components.tsx
|   |       +-- AutomationRecipesSection.tsx
|   |       +-- automation-recipes-showcase.tsx
|   |       +-- FAQSection.tsx
|   |       +-- HowItWorksSection.tsx
|   |       +-- PricingSection.tsx
|   |       +-- SimpleCTA.tsx
|   |       +-- ToolsIntegrationsSection.tsx
|   |       +-- WhatIsAutomationSection.tsx
|   |       +-- WhatWeAutomateSection.tsx
|   |       \-- WhoIsThisForSection.tsx
|   +-- ui
|   |   +-- accordion.tsx
|   |   +-- alert.tsx
|   |   +-- alert-dialog.tsx
|   |   +-- aspect-ratio.tsx
|   |   +-- avatar.tsx
|   |   +-- badge.tsx
|   |   +-- breadcrumb.tsx
|   |   +-- button.tsx
|   |   +-- calendar.tsx
|   |   +-- card.tsx
|   |   +-- carousel.tsx
|   |   +-- chart.tsx
|   |   +-- checkbox.tsx
|   |   +-- collapsible.tsx
|   |   +-- command.tsx
|   |   +-- context-menu.tsx
|   |   +-- dialog.tsx
|   |   +-- drawer.tsx
|   |   +-- dropdown-menu.tsx
|   |   +-- form.tsx
|   |   +-- hover-card.tsx
|   |   +-- input.tsx
|   |   +-- input-otp.tsx
|   |   +-- label.tsx
|   |   +-- menubar.tsx
|   |   +-- navigation-menu.tsx
|   |   +-- pagination.tsx
|   |   +-- popover.tsx
|   |   +-- progress.tsx
|   |   +-- radio-group.tsx
|   |   +-- resizable.tsx
|   |   +-- scroll-area.tsx
|   |   +-- select.tsx
|   |   +-- separator.tsx
|   |   +-- sheet.tsx
|   |   +-- sidebar.tsx
|   |   +-- skeleton.tsx
|   |   +-- slider.tsx
|   |   +-- sonner.tsx
|   |   +-- switch.tsx
|   |   +-- table.tsx
|   |   +-- tabs.tsx
|   |   +-- textarea.tsx
|   |   +-- toast.tsx
|   |   +-- toaster.tsx
|   |   +-- toggle.tsx
|   |   +-- toggle-group.tsx
|   |   +-- tooltip.tsx
|   |   \-- use-toast.ts
|   +-- AlertDialogue.tsx
|   +-- dynamic-font-wrapper.tsx
|   +-- Footer.tsx
|   +-- GoogleAnalytics.tsx
|   +-- i18n-provider.tsx
|   +-- language-switcher.tsx
|   +-- LeadModal.tsx
|   +-- LeadModal2.tsx
|   +-- MaintenanceChecker.tsx
|   +-- MobileMenu.tsx
|   +-- navbar.tsx
|   +-- NotificationsDropdown.tsx
|   +-- PageBackground.tsx
|   \-- ThemeToggle.tsx
+-- contexts
|   \-- AlertDialogContext.ts
+-- generated
|   \-- prisma
|       +-- internal
|       |   +-- class.ts
|       |   +-- prismaNamespace.ts
|       |   \-- prismaNamespaceBrowser.ts
|       +-- models
|       |   +-- Agent.ts
|       |   +-- AgentContent.ts
|       |   +-- ApiUsage.ts
|       |   +-- AutomationContent.ts
|       |   +-- AutomationProduct.ts
|       |   +-- BlogCategory.ts
|       |   +-- BlogPost.ts
|       |   +-- CaseContent.ts
|       |   +-- CaseStudy.ts
|       |   +-- ChatMessage.ts
|       |   +-- ClientApiKey.ts
|       |   +-- ContactSubmission.ts
|       |   +-- Invoice.ts
|       |   +-- InvoiceCounter.ts
|       |   +-- Lead.ts
|       |   +-- MarketplaceLead.ts
|       |   +-- Newsletter.ts
|       |   +-- Payment.ts
|       |   +-- Project.ts
|       |   +-- Review.ts
|       |   +-- SiteSettings.ts
|       |   +-- User.ts
|       |   +-- WebsiteContent.ts
|       |   \-- WebsiteProduct.ts
|       +-- browser.ts
|       +-- client.ts
|       +-- commonInputTypes.ts
|       +-- enums.ts
|       +-- models.ts
|       +-- query_engine-windows.dll.node
|       \-- query_engine-windows.dll.node.tmp2644
+-- hooks
|   +-- use-alert-dialog.ts
|   +-- use-media-query.tsx
|   +-- use-mobile.tsx
|   \-- use-toast.ts
+-- lib
|   +-- agent-marketplace-action.ts
|   +-- api-key-actions.ts
|   +-- auth-action.ts
|   +-- billing-actions.ts
|   +-- blog-actions.ts
|   +-- booking-action.ts
|   +-- case-study-action.ts
|   +-- category-actions.ts
|   +-- contact-action.ts
|   +-- crypto.ts
|   +-- form-action.ts
|   +-- i18n.ts
|   +-- lead-actions.ts
|   +-- marketplace-action.ts
|   +-- prisma.ts
|   +-- review-action.ts
|   +-- site-settings.ts
|   +-- upload-image.ts
|   +-- usage-actions.ts
|   +-- user-actions.ts
|   \-- utils.ts
+-- markdown
|   +-- agent-marketplace.md
|   +-- b2b-technical-consulting.md
|   +-- booking-system.md
|   +-- business-workflow-automation.md
|   +-- case-studies.md
|   +-- custom-AI-Agent.md
|   +-- custom-MERN-stack-system.md
|   +-- footer.md
|   +-- home-page.md
|   +-- insights.md
|   +-- insights-details.md
|   +-- pricing.md
|   +-- privacy-policy.md
|   +-- product-details.md
|   \-- security.md
+-- prisma
|   \-- schema.prisma
+-- public
|   +-- favicon_io
|   |   +-- android-chrome-192x192.png
|   |   +-- android-chrome-512x512.png
|   |   +-- apple-touch-icon.png
|   |   +-- favicon-16x16.png
|   |   +-- favicon-32x32.png
|   |   \-- site.webmanifest
|   +-- images
|   |   \-- ecosystem-diagram.png
|   +-- locales
|   |   +-- bn
|   |   |   +-- aboutPage.json
|   |   |   +-- AIAgentPage.json
|   |   |   +-- aiConsultingPage.json
|   |   |   +-- caseStudiesPage.json
|   |   |   +-- common.json
|   |   |   +-- contactPage.json
|   |   |   +-- homePage.json
|   |   |   +-- marketPlacePage.json
|   |   |   +-- pricingPage.json
|   |   |   +-- reviewPage.json
|   |   |   +-- webDevelopmentPage.json
|   |   |   +-- webDevelopmentPage2.json
|   |   |   \-- workflowAutomationPage.json
|   |   \-- en
|   |       +-- aboutPage.json
|   |       +-- AIAgentPage.json
|   |       +-- aiConsultingPage.json
|   |       +-- caseStudiesPage.json
|   |       +-- common.json
|   |       +-- contactPage.json
|   |       +-- homePage.json
|   |       +-- marketPlacePage.json
|   |       +-- pricingPage.json
|   |       +-- reviewPage.json
|   |       +-- webDevelopmentPage.json
|   |       +-- webDevelopmentPage2.json
|   |       \-- workflowAutomationPage.json
|   +-- ai_chatbot.svg
|   +-- ai-solution.png
|   +-- favicon.ico
|   +-- header-logo-black.png
|   +-- header-logo-white.png
|   +-- placeholder.svg
|   \-- robots.txt
+-- scripts
|   +-- emit-PROJECT-STRUCTURE-md.ps1
|   \-- generate-project-structure.ps1
+-- types
|   +-- billing-types.ts
|   +-- blog-types.ts
|   +-- booking-types.ts
|   +-- case-study-types.ts
|   +-- contact-types.ts
|   +-- form-types.ts
|   +-- globals.d.ts
|   +-- lead-types.ts
|   +-- marketplace-types.ts
|   +-- review-types.ts
|   +-- user-management.ts
|   \-- user-types.ts
+-- utils
|   +-- admin-audit-logger.ts
|   +-- admin-auth.ts
|   +-- admin-utils.ts
|   +-- api-key-manager.ts
|   +-- csv-export.ts
|   +-- email-service.ts
|   +-- notification-utils.ts
|   \-- user-permissions.ts
+-- .env
+-- .eslintrc.json
+-- .gitignore
+-- bg-effect-usage.md
+-- bun.lockb
+-- components.json
+-- Driplare knowledge base.md
+-- eslint.config.js
+-- middleware.ts
+-- next.config.js
+-- next-env.d.ts
+-- package.json
+-- package-lock.json
+-- postcss.config.js
+-- prisma.config.ts
+-- PROJECT_STRUCTURE.md
+-- README.md
+-- script.ts
+-- tailwind.config.ts
+-- tsconfig.json
\-- tsconfig.tsbuildinfo
```
