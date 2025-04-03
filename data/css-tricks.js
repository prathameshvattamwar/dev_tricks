// CSS Tricks Data
const cssTricks = [
    {
        id: 'css1',
        title: 'Responsive Width Without Media Queries',
        description: 'Use CSS clamp() function to create responsive elements without media queries.',
        code: `.responsive-element {
  width: clamp(300px, 50%, 800px);
  padding: clamp(1rem, 5%, 3rem);
  font-size: clamp(1rem, 2vw, 1.5rem);
}`,
        explanation: 'The clamp() function takes three values: minimum, preferred, and maximum. This creates fluid sizing that responds to viewport changes without requiring media queries, simplifying responsive design.',
        compatibility: 'Supported in all modern browsers except Internet Explorer.',
        difficulty: 'intermediate',
        tags: ['responsive', 'layout'],
        author: 'DevTricks Team'
    },
    {
        id: 'css2',
        title: 'Maintain Image Aspect Ratio',
        description: 'Keep images in perfect aspect ratio while filling available space.',
        code: `.image-container {
  width: 100%; /* Container width */
  aspect-ratio: 16 / 9; /* Desired aspect ratio */
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the container while maintaining aspect ratio */
  object-position: center; /* Position the image within the container */
}`,
        explanation: 'The aspect-ratio property defines a desired ratio for the element\'s box, while object-fit ensures images maintain aspect ratio. This prevents stretching or squishing without complex calculations.',
        compatibility: 'aspect-ratio is supported in Chrome, Edge, Firefox, and Safari. object-fit has wide browser support.',
        difficulty: 'beginner',
        tags: ['images', 'layout'],
        author: 'DevTricks Team'
    },
    {
        id: 'css3',
        title: 'Custom Scrollbar Styling',
        description: 'Create custom scrollbars that match your design system.',
        code: `/* Basic scrollbar styling */
.custom-scrollbar {
  /* Width */
  scrollbar-width: thin; /* Firefox */
  
  /* Track & Thumb - For Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}`,
        explanation: 'You can use scrollbar-width for Firefox and ::-webkit-scrollbar pseudo-elements for Chromium browsers to customize scrollbars. This improves the UI by making scrollbars consistent with your design system.',
        compatibility: 'Firefox supports scrollbar-width. Chrome, Edge, and Safari support the webkit pseudo-elements.',
        difficulty: 'intermediate',
        tags: ['ui', 'styling'],
        author: 'DevTricks Team'
    },
    {
        id: 'css4',
        title: 'CSS-Only Tooltip',
        description: 'Create tooltips without JavaScript using CSS.',
        code: `.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip-container:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.tooltip {
  visibility: hidden;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  
  background-color: #333;
  color: white;
  text-align: center;
  border-radius: 4px;
  padding: 5px 10px;
  
  /* Fade effect */
  opacity: 0;
  transition: opacity 0.3s;
  
  /* Add small arrow */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
}`,
        explanation: 'This CSS-only tooltip uses the :hover pseudo-class to trigger tooltip visibility. By using visibility with opacity and a transition, you get a smooth fade effect without JavaScript.',
        compatibility: 'Works in all modern browsers.',
        difficulty: 'beginner',
        tags: ['ui', 'components'],
        author: 'DevTricks Team'
    },
    {
        id: 'css5',
        title: 'Auto-Fit Grid with Minimum Column Size',
        description: 'Create a responsive grid that automatically adjusts the number of columns based on available space.',
        code: `.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}`,
        explanation: 'The auto-fit keyword automatically creates as many columns as will fit based on the minimum width specified in minmax(). This creates a responsive grid without media queries, where columns adjust automatically to the container width.',
        compatibility: 'Supported in all modern browsers.',
        difficulty: 'intermediate',
        tags: ['grid', 'responsive', 'layout'],
        author: 'DevTricks Team'
    },
    {
        id: 'css6',
        title: 'Smooth Scrolling',
        description: 'Enable smooth scrolling behavior for the entire page or specific elements.',
        code: `/* For the entire page */
html {
  scroll-behavior: smooth;
}

/* For a specific scrollable container */
.scroll-container {
  height: 300px;
  overflow-y: auto;
  scroll-behavior: smooth;
}`,
        explanation: 'The scroll-behavior property creates smooth scrolling animations when users click on anchor links or when programmatically scrolling with JavaScript. This improves user experience by making navigation feel more polished.',
        compatibility: 'Supported in most modern browsers. Fallback gracefully in unsupported browsers.',
        difficulty: 'beginner',
        tags: ['animation', 'ux'],
        author: 'DevTricks Team'
    }
];