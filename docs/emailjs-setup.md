# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to make the contact form on your portfolio website send emails directly to your Gmail account.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS website](https://www.emailjs.com/) and sign up for a free account
2. After signing up, log in to your account dashboard

## Step 2: Connect Your Email Service

1. In the EmailJS dashboard, click on "Email Services" in the left sidebar
2. Click "Add New Service"
3. Select "Gmail" as your service provider
4. Follow the instructions to connect your Gmail account
5. Name your service something like "portfolio_contact_service"
6. Save your service, and note the Service ID (you'll need this later)

## Step 3: Create an Email Template

1. In the EmailJS dashboard, click on "Email Templates" in the left sidebar
2. Click "Create New Template"
3. Create a template with the following settings:
   - Template Name: "portfolio_contact_template"
   - Subject: "Portfolio Contact: {{subject}}"
   - Content:
     ```
     Name: {{from_name}}
     Email: {{from_email}}
     
     Subject: {{subject}}
     
     Message:
     {{message}}
     ```
4. Save your template and note the Template ID

## Step 4: Get Your Public Key

1. In the EmailJS dashboard, click on "Account" in the left sidebar
2. Find your "Public Key" in the API Keys section

## Step 5: Update Your JavaScript Code

1. Open your main.js file
2. Replace the following placeholders with your actual values:
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
   - Replace `YOUR_SERVICE_ID` with your Service ID (e.g., "portfolio_contact_service")
   - Replace `YOUR_TEMPLATE_ID` with your Template ID (e.g., "portfolio_contact_template")

## Testing the Contact Form

After completing the setup:
1. Open your portfolio website
2. Fill out and submit the contact form
3. Check your Gmail inbox to ensure you've received the test message

## Troubleshooting

- If emails are not being sent, check the browser console for error messages
- Verify that your EmailJS account is active and within the free tier limits (200 emails/month)
- Make sure your Gmail account doesn't have any restrictions blocking EmailJS

## Note

The free tier of EmailJS allows for 200 emails per month. If you expect higher volumes, consider upgrading to a paid plan.