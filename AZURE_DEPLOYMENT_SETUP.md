# Azure Static Web Apps Deployment Setup Guide

## Current Status

The GitHub Actions workflow is configured correctly for deploying a static HTML site:
- ✅ `output_location` is set to `"/"` (root directory)
- ✅ `skip_app_build` is set to `true` (no build process needed)
- ✅ GitHub Secret exists: `AZURE_STATIC_WEB_APPS_API_TOKEN_AMBITIOUS_TREE_0D92AFE0F`

## Issue

Deployment fails with error:
```
The content server has rejected the request with: BadRequest
Reason: No matching Static Web App was found or the api key was invalid.
```

This indicates the Azure Static Web App resource doesn't exist or the API token is invalid.

## Solution Steps

### Option 1: Create New Azure Static Web App (Recommended if resource doesn't exist)

1. **Go to Azure Portal** (https://portal.azure.com)

2. **Create Static Web App:**
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"
   
3. **Configure Basic Settings:**
   - Subscription: Select your subscription
   - Resource Group: Select or create new
   - Name: `ambitious-tree-0d92afe0f` (or any name you prefer)
   - Plan type: Free (for testing) or Standard
   - Region: Select closest region
   - Deployment source: GitHub
   
4. **GitHub Integration:**
   - Sign in to GitHub if prompted
   - Organization: Rubelefsky
   - Repository: RubellTech
   - Branch: main
   
5. **Build Details:**
   - Build Presets: Custom
   - App location: `/`
   - Api location: (leave empty)
   - Output location: `/`
   
6. **Review + Create:**
   - Click "Review + create"
   - Click "Create"

7. **Get Deployment Token:**
   - After creation, go to the Static Web App resource
   - Click "Manage deployment token" in the Overview
   - Copy the token

8. **Update GitHub Secret:**
   - Go to GitHub repository: Rubelefsky/RubellTech
   - Settings → Secrets and variables → Actions
   - Find `AZURE_STATIC_WEB_APPS_API_TOKEN_AMBITIOUS_TREE_0D92AFE0F`
   - Update with the new token from step 7

### Option 2: Update Existing Resource Token (If resource exists but token is wrong)

1. **Go to Azure Portal**

2. **Find Your Static Web App:**
   - Search for "Static Web Apps" in the search bar
   - Click on your Static Web App resource

3. **Get Deployment Token:**
   - Click "Manage deployment token" in the Overview
   - Copy the token

4. **Update GitHub Secret:**
   - Go to GitHub repository: Rubelefsky/RubellTech
   - Settings → Secrets and variables → Actions
   - Update `AZURE_STATIC_WEB_APPS_API_TOKEN_AMBITIOUS_TREE_0D92AFE0F` with the token

### Option 3: Let Azure Generate the Workflow

If you prefer to let Azure set everything up:

1. Delete the existing workflow file from the repository
2. In Azure Portal, when creating the Static Web App, Azure will automatically:
   - Generate a new workflow file
   - Create the required secret in GitHub
   - Configure everything correctly

## Testing

After updating the token, you can test the deployment by:

1. Making a commit to the `main` branch
2. Or manually triggering the workflow from GitHub Actions tab
3. Monitor the workflow run to ensure it completes successfully

## Verification

A successful deployment should:
- ✅ Build and Deploy Job completes without errors
- ✅ Website is accessible at the Azure Static Web App URL
- ✅ Files from repository root are served correctly

## Additional Notes

- The workflow is configured for a static HTML site (no build process)
- Files will be deployed directly from the repository root
- No package.json or build scripts are required
- The site includes: index.html, styles.css, script.js, favicon.svg, robots.txt, sitemap.xml
