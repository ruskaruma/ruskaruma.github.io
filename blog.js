// Notion API Configuration
const NOTION_CONFIG = {
    // You'll need to replace these with your actual Notion API credentials
    DATABASE_ID: 'your-notion-database-id',
    API_KEY: 'your-notion-api-key',
    // For development, you can use a proxy server or CORS-enabled endpoint
    API_BASE_URL: 'https://api.notion.com/v1',
    // Alternative: Use a proxy server to avoid CORS issues
    PROXY_URL: '/api/notion' // This would be your backend endpoint
};

// Blog state management
let allPosts = [];
let filteredPosts = [];

// DOM elements
const blogPostsContainer = document.getElementById('blog-posts');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');
const noPostsElement = document.getElementById('no-posts');
const searchInput = document.getElementById('search-input');
const refreshBtn = document.getElementById('refresh-btn');

// Initialize the blog
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    refreshBtn.addEventListener('click', loadPosts);
}

// Load posts from Notion API
async function loadPosts() {
    showLoading(true);
    hideError();
    
    try {
        // For now, we'll use mock data since we need to set up the backend
        // In production, you'd call your backend API
        const posts = await fetchPostsFromNotion();
        allPosts = posts;
        filteredPosts = [...posts];
        renderPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        showError('Failed to load posts. Please try again later.');
    } finally {
        showLoading(false);
    }
}

// Fetch posts from Notion (this would be replaced with actual API call)
async function fetchPostsFromNotion() {
    // For demonstration, returning mock data
    // In production, this would make an actual API call to your backend
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - replace this with actual API call
    return [
        {
            id: '1',
            title: 'Understanding Neural Network Architectures',
            excerpt: 'A deep dive into different neural network architectures and their applications in modern AI systems.',
            content: `
                <h2>Introduction to Neural Networks</h2>
                <p>Neural networks have revolutionized the field of artificial intelligence, enabling breakthroughs in image recognition, natural language processing, and many other domains.</p>
                
                <h3>Types of Neural Networks</h3>
                <ul>
                    <li><strong>Feedforward Neural Networks:</strong> The most basic type, where information flows in one direction.</li>
                    <li><strong>Convolutional Neural Networks (CNNs):</strong> Specialized for processing grid-like data such as images.</li>
                    <li><strong>Recurrent Neural Networks (RNNs):</strong> Designed to handle sequential data.</li>
                    <li><strong>Transformer Networks:</strong> The foundation of modern language models.</li>
                </ul>
                
                <h3>Key Components</h3>
                <p>Every neural network consists of:</p>
                <ul>
                    <li>Input layer</li>
                    <li>Hidden layers</li>
                    <li>Output layer</li>
                    <li>Activation functions</li>
                    <li>Weights and biases</li>
                </ul>
                
                <blockquote>
                    "Neural networks are not just a tool; they're a new way of thinking about computation."
                </blockquote>
            `,
            date: '2025-01-15',
            tags: ['AI', 'Neural Networks', 'Deep Learning'],
            published: true
        },
        {
            id: '2',
            title: 'Optimizing CUDA Kernels for LLM Inference',
            excerpt: 'Exploring techniques to optimize CUDA kernels for faster large language model inference on GPUs.',
            content: `
                <h2>CUDA Optimization for LLMs</h2>
                <p>Large Language Models require significant computational resources, making GPU optimization crucial for practical deployment.</p>
                
                <h3>Memory Management</h3>
                <p>Efficient memory management is key to optimal performance:</p>
                <pre><code>// Example CUDA kernel for attention computation
__global__ void attention_kernel(float* query, float* key, float* value, 
                                float* output, int seq_len, int head_dim) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= seq_len * head_dim) return;
    
    // Compute attention scores
    float score = 0.0f;
    for (int i = 0; i < head_dim; i++) {
        score += query[idx * head_dim + i] * key[idx * head_dim + i];
    }
    
    output[idx] = score;
}</code></pre>
                
                <h3>Performance Tips</h3>
                <ul>
                    <li>Use shared memory for frequently accessed data</li>
                    <li>Optimize memory coalescing</li>
                    <li>Minimize thread divergence</li>
                    <li>Use appropriate block sizes</li>
                </ul>
            `,
            date: '2025-01-10',
            tags: ['CUDA', 'GPU', 'LLM', 'Optimization'],
            published: true
        },
        {
            id: '3',
            title: 'Fine-tuning Open Source LLMs',
            excerpt: 'A practical guide to fine-tuning open source language models for specific tasks and domains.',
            content: `
                <h2>Fine-tuning Strategies</h2>
                <p>Fine-tuning allows us to adapt pre-trained language models to specific tasks and domains.</p>
                
                <h3>Types of Fine-tuning</h3>
                <ul>
                    <li><strong>Full Fine-tuning:</strong> Updates all model parameters</li>
                    <li><strong>LoRA (Low-Rank Adaptation):</strong> Efficient parameter-efficient fine-tuning</li>
                    <li><strong>QLoRA:</strong> Quantized LoRA for memory efficiency</li>
                    <li><strong>Prompt Tuning:</strong> Learns continuous prompts</li>
                </ul>
                
                <h3>Implementation Example</h3>
                <p>Here's a basic example using the Hugging Face Transformers library:</p>
                <pre><code>from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

# Load model and tokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")

# Configure LoRA
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Apply LoRA
model = get_peft_model(model, lora_config)</code></pre>
            `,
            date: '2025-01-05',
            tags: ['LLM', 'Fine-tuning', 'LoRA', 'Hugging Face'],
            published: true
        }
    ];
}

// Render posts to the DOM
function renderPosts() {
    if (filteredPosts.length === 0) {
        blogPostsContainer.innerHTML = '';
        noPostsElement.style.display = 'block';
        return;
    }
    
    noPostsElement.style.display = 'none';
    
    const postsHTML = filteredPosts.map(post => `
        <div class="blog-post" onclick="openPostModal('${post.id}')">
            <div class="post-header">
                <h3 class="post-title">${post.title}</h3>
                <div class="post-meta">
                    <span class="post-date">
                        📅 ${formatDate(post.date)}
                    </span>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="#" class="read-more" onclick="event.stopPropagation(); openPostModal('${post.id}')">
                Read More →
            </a>
        </div>
    `).join('');
    
    blogPostsContainer.innerHTML = postsHTML;
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredPosts = [...allPosts];
    } else {
        filteredPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }
    
    renderPosts();
}

// Open post modal
function openPostModal(postId) {
    const post = allPosts.find(p => p.id === postId);
    if (!post) return;
    
    // Create modal HTML
    const modalHTML = `
        <div id="post-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closePostModal()">&times;</span>
                <h2>${post.title}</h2>
                <div class="post-meta">
                    <span class="post-date">📅 ${formatDate(post.date)}</span>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-post-content">
                    ${post.content}
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = document.getElementById('post-modal');
    modal.style.display = 'block';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closePostModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePostModal();
        }
    });
}

// Close post modal
function closePostModal() {
    const modal = document.getElementById('post-modal');
    if (modal) {
        modal.remove();
    }
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showLoading(show) {
    loadingElement.style.display = show ? 'flex' : 'none';
}

function showError(message) {
    errorElement.querySelector('p').textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    errorElement.style.display = 'none';
}

// Real Notion API integration (for production use)
async function fetchPostsFromNotionAPI() {
    const response = await fetch(`${NOTION_CONFIG.PROXY_URL}/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Example of how to set up the backend API endpoint
// You would need to create a backend server (Node.js, Python, etc.) that:
// 1. Has your Notion API key securely stored
// 2. Fetches data from your Notion database
// 3. Returns the data in the expected format
// 4. Handles CORS properly

// Example backend structure (Node.js/Express):
/*
const express = require('express');
const { Client } = require('@notionhq/client');

const app = express();
const notion = new Client({ auth: process.env.NOTION_API_KEY });

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
            title: page.properties.Title.title[0]?.plain_text || '',
            excerpt: page.properties.Excerpt.rich_text[0]?.plain_text || '',
            content: page.properties.Content.rich_text[0]?.plain_text || '',
            date: page.properties.Date.date?.start || '',
            tags: page.properties.Tags.multi_select.map(tag => tag.name),
            published: page.properties.Published.checkbox
        }));
        
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
*/ 