# 📋 Scripts Library - Copy & Paste

A beautiful, interactive scripts library where you can instantly copy scripts with a single click. Perfect for customer service, sales, or any repetitive text you need to use frequently.

## ✨ Features

✅ **One-Click Copy** - Click any script card to copy it instantly
✅ **Search Functionality** - Find scripts quickly by title, content, or category
✅ **Edit Scripts** - Customize and edit existing scripts
✅ **Local Storage** - Your changes are saved automatically
✅ **Beautiful UI** - Modern, responsive grid layout
✅ **Categories** - Organize scripts by type (Customer Service, Sales, Support)
✅ **Icons** - Each script has a unique emoji icon
✅ **Toast Notifications** - Get instant feedback when you copy
✅ **Mobile Friendly** - Works great on all devices

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Click on any script card to copy it
3. The script is now in your clipboard - paste it anywhere!
4. Use the search box to find specific scripts
5. Click the edit button to customize scripts

## 📖 How to Use

### Copying Scripts
- Click the **Copy** button on any card
- You'll see a confirmation toast
- The script is now ready to paste anywhere

### Searching
- Type in the search box to filter scripts
- Search by title, content, description, or category
- Results update instantly as you type

### Editing Scripts
- Click the **Edit** (pencil) button on any card
- Modify the title, icon, category, text, or description
- Click **Save** to apply changes
- Changes are saved to local storage automatically

### Categories
- **Customer Service** - For customer interactions
- **Sales** - For sales conversations
- **Support** - For technical support

## 🎨 Customization

### Add New Scripts
Edit `script.js` and add to the `scripts` array:

```javascript
{
    id: 13,
    title: 'Your Script Title',
    category: 'customer-service',
    icon: '🎯',
    text: 'Your script text here',
    description: 'Brief description'
}
```

### Change Colors
Edit `style.css`:
- Primary color: `#667eea` (Blue-purple)
- Secondary color: `#764ba2` (Purple)

## 💾 Data Storage

All your edits are automatically saved to browser's local storage. Your data persists even after closing the browser.

## 📦 Files

- `index.html` - Main HTML structure
- `style.css` - Styling and animations
- `script.js` - Application logic and local storage
- `README.md` - This documentation

## 🔧 Technologies

- HTML5
- CSS3 (Grid, Flexbox, Gradients, Animations)
- JavaScript (ES6+)
- Local Storage API
- Font Awesome Icons

## 📱 Responsive Design

- Desktop: Full grid layout
- Tablet: Adjusted grid with 2-3 columns
- Mobile: Single column layout

## 🎯 Use Cases

- 📞 Customer Service Scripts
- 💼 Sales Pitches
- 🆘 Support Responses
- 📧 Email Templates
- 🤖 Chatbot Responses
- 📝 Common Replies

## 🚀 Deploy to GitHub Pages

1. Push files to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose your default branch
5. Your site will be live!

## 💡 Tips

- Use unique icons for quick visual identification
- Keep script text concise but complete
- Use categories to organize your scripts
- Search by keywords to find scripts faster
- Edit scripts to personalize them for your needs

---

**Ready to copy? Let's go! 📋✨**
