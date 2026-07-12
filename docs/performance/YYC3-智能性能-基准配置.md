# Lighthouse CI Performance Baseline Configuration

# YYC³ AI Intelligence Platform

version: 1.0
lastUpdated: 2026-04-20

# Core Web Vitals Targets (Google Recommended)

coreWebVitals:
largestContentfulPaint:
target: 2500 # ms
warning: 4000 # ms
description: "Largest Contentful Paint - Loading performance"

cumulativeLayoutShift:
target: 0.1
warning: 0.25
description: "Cumulative Layout Shift - Visual stability"

firstInputDelay: # Replaced by TBT in lab data
target: 100 # ms
description: "First Input Delay - Interactivity"

totalBlockingTime:
target: 200 # ms
warning: 300 # ms
description: "Total Blocking Time - Main thread availability"

# Lighthouse Category Scores

categories:
performance:
minScore: 90
target: 95
weight: 40

accessibility:
minScore: 92
target: 98
weight: 25

bestPractices:
minScore: 90
target: 95
weight: 20

seo:
minScore: 90
target: 95
weight: 15

# Performance Budgets

budgets:
javascript:
maxSize: "500KB" # Compressed
maxUncompressed: "1.5MB"
warningSize: "400KB"

css:
maxSize: "100KB" # Compressed
maxUncompressed: "300KB"

images:
maxSize: "200KB" per image
format: ["webp", "avif"]

fonts:
maxSize: "100KB" total
preloaded: true

totalBundle:
maxSize: "1MB" # All resources combined (compressed)
warningSize: "800MB"

# Audit Configuration

auditSettings:
throttling:
method: "simulate" # simulate or devtools
rttMs: 40
throughputKbps: 10240
cpuSlowdownMultiplier: 1 # Desktop, use 4 for mobile

screenEmulation:
desktop:
width: 1350
height: 940
deviceScaleFactor: 1
mobile: false

    mobile:
      width: 375
      height: 667
      deviceScaleFactor: 2
      mobile: true

# Page-specific Targets

pages:
home:
url: "/"
lcpTarget: 2000
fidTarget: 100
clsTarget: 0.05

dashboard:
url: "/dashboard"
lcpTarget: 2500
fidTarget: 150
clsTarget: 0.1

explorer:
url: "/explorer"
lcpTarget: 2500
fidTarget: 150
clsTarget: 0.1

trends:
url: "/trends"
lcpTarget: 2500
fidTarget: 150
clsTarget: 0.1

# Regression Detection

regressionDetection:
enabled: true
threshold: 5 # Percentage change to trigger alert
baselineBranch: "main"
compareWith: "previous" # previous or baseline

# Reporting

reporting:
formats: - html - json - csv

artifactsRetentionDays: 14

summaryMetrics: - performanceScore - accessibilityScore - bestPracticesScore - seoScore - lcp - cls - tbt - fcp - tti - bundleSize

# Integration Settings

ciIntegration:
platform: "github-actions"
failOnRegression: false # Warn but don't block PRs initially
commentOnPR: true
uploadResults: true

notifications:
onFailure: true
onRegression: true
channels: - "github-pr-comment" - "slack" # Optional

# Custom Assertions

customAssertions:

- name: "No render-blocking resources"
  category: "performance"
  expected: 0
  actualPath: "render-blocking-resources.length"

- name: "All images optimized"
  category: "best-practices"
  expected: true
  actualPath: "uses-optimized-images"

# Documentation

documentation:
howToRunLocally: | # Run Lighthouse audit locally
npm run dev # Start dev server on port 3200
npm run lighthouse # Run single page audit
npm run lighthouse:dev # Run multi-page CI audit
npm run lighthouse:view # Open HTML report

howToRunInCI: | # Lighthouse runs automatically in CI/CD pipeline # Results uploaded as artifacts # Summary posted in GitHub Actions logs

troubleshooting: | ## Common Issues

    ### Lighthouse fails with timeout
    - Increase `maxWaitForLoad` in lighthouserc.json
    - Check if preview server is running correctly

    ### Performance score drops significantly
    - Check bundle size in build output
    - Verify lazy loading implementation
    - Review network requests for large assets

    ### Accessibility warnings
    - Run axe-core locally: npx axe http://localhost:3200
    - Fix missing ARIA labels and alt text
    - Ensure keyboard navigation works

# Version History

changelog:

- version: "1.0.0"
  date: "2026-04-20"
  changes:
  - "Initial Lighthouse CI configuration"
  - "Set Core Web Vitals targets based on Google recommendations"
  - "Configure performance budgets for enterprise app"
  - "Add multi-page audit support for key routes"
  - "Integrate with GitHub Actions CI/CD pipeline"
