# Blog Setup Guide - Notion API Integration

This guide will help you set up your blog with Notion API integration.

## Prerequisites

- Node.js (version 16 or higher)
- A Notion account
- A Notion database for your blog posts

## Step 1: Set up Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Portfolio Blog")
4. Select the workspace where your blog database is located
5. Set capabilities:
   - Read content: ✅
   - Update content: ❌ (unless you want to update from your site)
   - Insert content: ❌
6. Click "Submit"
7. Copy the "Internal Integration Token" - this is your `NOTION_API_KEY`

## Step 2: Create Notion Database

Create a new database in Notion with the following properties:

### Required Properties:
- **Title** (Title type) - The title of your blog post
- **Excerpt** (Text type) - A short description of the post
- **Content** (Text type) - The full content of your blog post
- **Date** (Date type) - Publication date
- **Tags** (Multi-select type) - Categories/tags for your posts
- **Published** (Checkbox type) - Whether the post should be visible on your site

### Optional Properties:
- **Slug** (Text type) - URL-friendly version of the title
- **Featured Image** (URL type) - Image for the post

## Step 3: Share Database with Integration

1. Open your database in Notion
2. Click the "Share" button in the top right
3. Click "Invite" and search for your integration name
4. Select your integration and give it access

## Step 4: Get Database ID

1. Open your database in Notion
2. Look at the URL: `https://www.notion.so/workspace/DATABASE_ID?v=...`
3. Copy the `DATABASE_ID` part (it's a long string of letters and numbers)

## Step 5: Environment Configuration

Create a `.env` file in your project root:

```env
# Notion API Configuration
NOTION_API_KEY=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here

# Server Configuration
PORT=3000
```

## Step 6: Install Dependencies

```bash
npm install
```

## Step 7: Update Frontend Configuration

In `blog.js`, update the `NOTION_CONFIG` object:

```javascript
const NOTION_CONFIG = {
    DATABASE_ID: 'your-notion-database-id',
    API_KEY: 'your-notion-api-key',
    API_BASE_URL: 'https://api.notion.com/v1',
    PROXY_URL: '/api/notion' // This should match your backend endpoint
};
```

## Step 8: Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## Step 9: Test the Integration

1. Visit `http://localhost:3000/blog.html`
2. You should see your blog posts loaded from Notion
3. If you see mock data, the real API integration isn't working yet

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your server is running and the frontend is making requests to the correct endpoint.

2. **"Failed to fetch posts"**: Check your Notion API key and database ID in the `.env` file.

3. **Empty posts**: Make sure your Notion database has the correct property names and at least one published post.

4. **Permission errors**: Ensure your integration has access to the database.

### Debug Steps:

1. Check the server console for error messages
2. Verify your `.env` file has the correct values
3. Test the API endpoint directly: `http://localhost:3000/api/notion/posts`
4. Check the browser console for JavaScript errors

## Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Update the `PROXY_URL` in `blog.js` to match your production API endpoint
3. Consider using a CDN for static files
4. Set up proper CORS configuration for your domain

## Notion Database Schema Example

Here's an example of how your Notion database should be structured:

| Property Name | Type | Description |
|---------------|------|-------------|
| Title | Title | Blog post title |
| Excerpt | Text | Short description |
| Content | Text | Full blog content |
| Date | Date | Publication date |
| Tags | Multi-select | Categories (AI, ML, CUDA, etc.) |
| Published | Checkbox | Whether to show on site |
| Slug | Text | URL-friendly title |

## Content Formatting

Your Notion content will be converted to HTML. You can use:
- **Bold** and *italic* text
- Headers (H1, H2, H3)
- Lists (bulleted and numbered)
- Code blocks
- Links
- Images

The content will be displayed in a modal when users click on a blog post.

## Security Notes

- Never commit your `.env` file to version control
- Keep your Notion API key secure
- Consider rate limiting for production use
- Use HTTPS in production

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the server console for errors
3. Verify your Notion integration settings
4. Ensure your database has the correct structure 