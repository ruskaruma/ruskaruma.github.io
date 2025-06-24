const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Initialize Notion client
const notion = new Client({ 
    auth: process.env.NOTION_API_KEY 
});

// Routes
app.get('/api/notion/posts', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID,
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true
                }
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending'
                }
            ]
        });
        
        const posts = response.results.map(page => ({
            id: page.id,
            title: page.properties.Title?.title[0]?.plain_text || '',
            excerpt: page.properties.Excerpt?.rich_text[0]?.plain_text || '',
            content: page.properties.Content?.rich_text[0]?.plain_text || '',
            date: page.properties.Date?.date?.start || '',
            tags: page.properties.Tags?.multi_select?.map(tag => tag.name) || [],
            published: page.properties.Published?.checkbox || false
        }));
        
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts from Notion:', error);
        res.status(500).json({ error: 'Failed to fetch posts from Notion' });
    }
});

// Get a specific post by ID
app.get('/api/notion/posts/:id', async (req, res) => {
    try {
        const pageId = req.params.id;
        const response = await notion.pages.retrieve({ page_id: pageId });
        
        // You might want to fetch the page content here as well
        // This would require additional API calls to get the page blocks
        
        res.json(response);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view your portfolio`);
    console.log(`API available at http://localhost:${PORT}/api/notion/posts`);
});

module.exports = app; 