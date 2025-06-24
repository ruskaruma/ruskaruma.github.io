# Ruskaruma's Portfolio Website

A modern, responsive portfolio website featuring a blog section powered by Notion API.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Blog Integration**: Dynamic blog section powered by Notion API
- **Search Functionality**: Search through blog posts by title, content, or tags
- **Modal Posts**: Full blog posts displayed in elegant modals
- **Dark Theme**: Easy on the eyes with a professional dark color scheme

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **API Integration**: Notion API
- **Styling**: Custom CSS with responsive design

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- A Notion account
- A Notion database for blog posts

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ruskaruma/ruskaruma.github.io.git
   cd ruskaruma.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Notion Integration**
   - Follow the detailed setup guide in [SETUP.md](./SETUP.md)
   - Create a `.env` file with your Notion API credentials

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Visit your site**
   - Main portfolio: `http://localhost:3000`
   - Blog section: `http://localhost:3000/blog.html`

## Project Structure

```
ruskaruma.github.io/
├── index.html          # Main portfolio page
├── blog.html           # Blog page
├── styles.css          # Main styles
├── blog-styles.css     # Blog-specific styles
├── blog.js             # Blog functionality
├── server.js           # Backend server
├── package.json        # Dependencies
├── SETUP.md            # Notion API setup guide
├── images/
│   └── profile.jpg     # Profile picture
└── .env                # Environment variables (create this)
```

## Blog Features

### Notion Integration
- Write blog posts in Notion
- Automatic synchronization with your website
- Rich text support with formatting
- Tag-based categorization
- Publication control

### User Experience
- **Search**: Find posts by title, content, or tags
- **Filtering**: Browse posts by categories
- **Responsive**: Read comfortably on any device
- **Fast Loading**: Optimized for performance

### Content Management
- **Draft System**: Unpublished posts stay hidden
- **Date Sorting**: Posts automatically sorted by date
- **Rich Content**: Support for code blocks, images, and formatting

## Customization

### Colors
The color scheme can be customized in `styles.css`:
- Primary: `#FFCC00` (Yellow)
- Background: `#1a1a1a` (Dark gray)
- Text: `#ffffff` (White)

### Content
- Update `index.html` for main portfolio content
- Blog content is managed through Notion
- Profile picture: Replace `images/profile.jpg`

### Styling
- Main styles: `styles.css`
- Blog-specific styles: `blog-styles.css`
- Responsive breakpoints included

## Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Deployment Options
1. **GitHub Pages**: For static hosting (frontend only)
2. **Vercel**: Full-stack deployment with serverless functions
3. **Netlify**: Static hosting with serverless functions
4. **Heroku**: Traditional hosting for the full stack

## API Endpoints

- `GET /api/notion/posts` - Fetch all published blog posts
- `GET /api/notion/posts/:id` - Fetch specific post
- `GET /api/health` - Health check

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the [SETUP.md](./SETUP.md) guide
2. Review the troubleshooting section
3. Open an issue on GitHub

## About

This portfolio showcases my work in AI/ML, computer science, and technology. The blog section allows me to share insights about neural networks, CUDA optimization, LLM fine-tuning, and other technical topics.

---

**Built with ❤️ by Ruskaruma**
