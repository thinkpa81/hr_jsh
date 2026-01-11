# Design Guidelines for Academic Research Website Redesign

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern academic platforms like ResearchGate, Google Scholar, and university research portals, combined with the clean professionalism of Linear and Notion for content organization.

## Core Design Principles
1. **Academic Credibility**: Professional, trustworthy aesthetic that emphasizes research content
2. **Information Clarity**: Clear hierarchies for complex academic content (papers, publications, research areas)
3. **Bilingual Excellence**: Optimized typography and layout for Korean and English content
4. **Admin-Ready**: Visual design that seamlessly accommodates content management interfaces

## Typography System
- **Primary Font**: Pretendard (Korean) / Inter (English) - modern, professional, highly readable
- **Headings**: 600-700 weight, sizes: 2.5rem (h1), 2rem (h2), 1.5rem (h3)
- **Body Text**: 400 weight, 1rem base, 1.6 line-height for academic readability
- **Accent Font**: JetBrains Mono for citations, DOIs, and technical identifiers

## Layout System
**Spacing**: Consistent use of Tailwind units 2, 4, 6, 8, 12, 16 for rhythmic hierarchy
- Sections: py-16 to py-24 (desktop), py-8 to py-12 (mobile)
- Component spacing: gap-6 to gap-8
- Container: max-w-7xl with px-6 (mobile) to px-8 (desktop)

## Component Library

### Navigation
- **Sticky Header**: Clean white background with subtle shadow on scroll
- **Dual-Mode Menu**: Vertical sidebar (persistent on desktop) + Horizontal top navigation for quick access
- **Research Categories**: Tab-style navigation with active state indicators
- **Performance**: Client-side routing, preload critical menu data, transition animations under 200ms

### Hero Section
- **Academic Portrait**: Wide banner with university/lab setting background image (blurred treatment)
- **Focus**: Principal researcher photo (left) + headline + brief research statement (right)
- **CTA Buttons**: Blurred glass-morphism background - "View Publications" + "Contact Research Team"

### Publication Grid System
- **Dual View Toggle**: Grid (cards) and List (table) view modes
- **Grid View**: 2-column (md:) to 3-column (lg:) cards with paper thumbnails, titles, authors, year
- **List View**: Sortable table with columns: Title, Authors, Journal, Year, Citations, Actions
- **Filters**: Sidebar with year range, research area tags, publication type

### Admin Interface
- **Access**: Floating admin button (bottom-right) visible only when authenticated
- **Admin Panel**: Slide-out drawer with CRUD operations per section
- **Content Editor**: Rich text editor with image upload, markdown support
- **Visual Consistency**: Admin controls use subtle accent color to distinguish from public content

### Content Sections
- **Research Areas**: Icon + title + description cards in 3-column grid
- **Recent Publications**: Featured papers with cover images, abstract previews
- **Team Members**: Photo grid with hover overlays showing bio/contact
- **News/Updates**: Timeline layout with date markers

## Images

### Hero Image
Large banner image (1920x600px) showing research environment - laboratory, university campus, or professional setting. Apply subtle overlay (black 40% opacity) with blur treatment behind text/buttons.

### Publication Thumbnails
Paper cover images or representative graphics (400x300px) for each publication in grid view. Use placeholder images with gradient backgrounds where covers unavailable.

### Team Photos
Professional headshots (300x300px, circular crops) for research team members.

### Background Patterns
Subtle geometric patterns or faded academic motifs (formulas, diagrams) as section backgrounds - very low opacity (5-10%).

## Performance Optimizations
- **Lazy Loading**: Publications load in batches (12 per page)
- **Menu Caching**: Store navigation structure in localStorage
- **Image Optimization**: WebP format, responsive srcset
- **Instant Transitions**: Use CSS transforms, avoid layout shifts
- **Preload Critical Fonts**: Pretendard/Inter loaded immediately

## Admin Mode Features
- **Inline Editing**: Double-click text to edit (admin only)
- **Drag-and-Drop**: Reorder publications, menu items
- **Image Manager**: Upload, crop, optimize within interface
- **Preview Mode**: Toggle between public and edit views
- **Auto-Save**: Content changes save every 30 seconds

## Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation for all menus and filters
- Focus indicators with 2px outline
- Minimum contrast ratio 4.5:1 for text
- Screen reader announcements for admin actions