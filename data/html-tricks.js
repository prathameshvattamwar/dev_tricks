// HTML Tricks Data
const htmlTricks = [
    {
        id: 'html1',
        title: 'Hidden Content for Screen Readers',
        description: 'Provide content for screen readers while keeping it visually hidden.',
        code: `<span class="sr-only">This text is only for screen readers</span>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>`,
        explanation: 'This technique visually hides content while keeping it accessible to screen readers, improving accessibility without affecting visual layout.',
        compatibility: 'Works in all modern browsers.',
        difficulty: 'beginner',
        tags: ['accessibility', 'semantic'],
        author: 'DevTricks Team'
    },
    {
        id: 'html2',
        title: 'Native Lazy Loading for Images',
        description: 'Use the loading attribute to lazy-load images without JavaScript.',
        code: `<img src="large-image.jpg" loading="lazy" alt="Description of image">`,
        explanation: 'The loading="lazy" attribute tells the browser to defer loading images until they approach the viewport, improving initial page load performance.',
        compatibility: 'Works in Chrome, Edge, Firefox, and Opera. Falls back gracefully in Safari.',
        difficulty: 'beginner',
        tags: ['performance', 'images'],
        author: 'DevTricks Team'
    },
    {
        id: 'html3',
        title: 'Form Input Validation with Regular Expressions',
        description: 'Use the pattern attribute to validate input with regex without JavaScript.',
        code: `<input 
  type="text" 
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
  title="Phone number format: xxx-xxx-xxxx"
  placeholder="xxx-xxx-xxxx">`,
        explanation: 'The pattern attribute allows you to validate user input against a regular expression pattern directly in HTML, with built-in error messaging.',
        compatibility: 'Supported in all modern browsers.',
        difficulty: 'intermediate',
        tags: ['forms', 'validation'],
        author: 'DevTricks Team'
    },
    {
        id: 'html4',
        title: 'Dialog Element for Native Modals',
        description: 'Use the dialog element to create native modal dialogs.',
        code: `<dialog id="myDialog">
  <h2>Native Modal Dialog</h2>
  <p>This is a native modal dialog without any JavaScript framework.</p>
  <button id="closeDialog">Close</button>
</dialog>

<button id="openDialog">Open Dialog</button>

<script>
  const dialog = document.getElementById('myDialog');
  document.getElementById('openDialog').addEventListener('click', () => {
    dialog.showModal();
  });
  document.getElementById('closeDialog').addEventListener('click', () => {
    dialog.close();
  });
</script>`,
        explanation: 'The <dialog> element provides native modal functionality without requiring a CSS framework. It includes built-in features like automatic focus management and background click dismissal.',
        compatibility: 'Supported in Chrome, Edge, and Firefox. Requires a polyfill for Safari.',
        difficulty: 'intermediate',
        tags: ['ui', 'components'],
        author: 'DevTricks Team'
    },
    {
        id: 'html5',
        title: 'Input Types for Better Mobile Keyboards',
        description: 'Use specific input types to trigger appropriate mobile keyboards.',
        code: `<!-- Email input - shows email keyboard with @ symbol -->
<input type="email" placeholder="Enter your email">

<!-- Phone input - shows number pad -->
<input type="tel" placeholder="Enter your phone number">

<!-- Number input - shows number pad -->
<input type="number" placeholder="Enter quantity">

<!-- URL input - shows keyboard with .com -->
<input type="url" placeholder="Enter website URL">

<!-- Search input - shows "search" button on keyboard -->
<input type="search" placeholder="Search...">`,
        explanation: 'Using the appropriate input type helps mobile users by displaying the most relevant keyboard layout, improving the user experience and reducing input errors.',
        compatibility: 'Supported in all modern mobile browsers.',
        difficulty: 'beginner',
        tags: ['forms', 'mobile'],
        author: 'DevTricks Team'
    }
];