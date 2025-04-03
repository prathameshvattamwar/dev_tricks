// JavaScript Tricks Data
const jsTricks = [
    {
        id: 'js1',
        title: 'Conditionally Add Properties to Object',
        description: 'Use the spread operator to conditionally add properties to an object.',
        code: `// Instead of using if statements:
const getUser = (userData, isPremium) => {
  const user = {
    name: userData.name,
    email: userData.email
  };
  
  if (isPremium) {
    user.premiumAccess = true;
    user.memberSince = userData.memberSince;
  }
  
  return user;
};

// Use spread operator with object expressions:
const getUser = (userData, isPremium) => {
  return {
    name: userData.name,
    email: userData.email,
    ...(isPremium && {
      premiumAccess: true,
      memberSince: userData.memberSince
    })
  };
};`,
        explanation: 'The spread operator allows us to conditionally include properties in an object by using the logical AND operator. If the condition is false, the right side is never evaluated, and an empty object is spread (which adds nothing).',
        compatibility: 'Works in all modern browsers that support the spread operator (ES6+).',
        difficulty: 'intermediate',
        tags: ['es6', 'objects'],
        author: 'DevTricks Team'
    },
    {
        id: 'js2',
        title: 'Quick Array Unique Values',
        description: 'Remove duplicate values from an array using Set.',
        code: `const array = [1, 2, 3, 3, 4, 4, 5];

// Using Set and the spread operator
const uniqueArray = [...new Set(array)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]

// Works with any type of array elements
const names = ['Alex', 'John', 'Alex', 'Sarah', 'John'];
const uniqueNames = [...new Set(names)];
console.log(uniqueNames); // ['Alex', 'John', 'Sarah']`,
        explanation: 'Set objects only store unique values. By converting an array to a Set and then back to an array using the spread operator, you can quickly remove duplicates without having to use a loop or filter.',
        compatibility: 'Supported in all modern browsers that support Set and spread operators (ES6+).',
        difficulty: 'beginner',
        tags: ['es6', 'arrays'],
        author: 'DevTricks Team'
    },
    {
        id: 'js3',
        title: 'Optional Chaining for Safer Property Access',
        description: 'Use optional chaining to safely access nested object properties without error.',
        code: `// Instead of:
let firstName;
if (user && user.profile && user.profile.name) {
  firstName = user.profile.name.first;
}

// Use optional chaining:
const firstName = user?.profile?.name?.first;

// Also works with functions
const result = someObject?.someMethod?.();

// And with array access
const firstItem = arr?.[0];`,
        explanation: 'The optional chaining operator (?.) allows you to access deeply nested object properties without having to check each level for null or undefined. It short-circuits and returns undefined if any part of the chain is null or undefined.',
        compatibility: 'Supported in all modern browsers. For older browsers, a transpiler like Babel is needed.',
        difficulty: 'beginner',
        tags: ['es2020', 'objects'],
        author: 'DevTricks Team'
    },
    {
        id: 'js4',
        title: 'Destructuring for Function Parameters',
        description: 'Use object destructuring for cleaner function parameters and defaults.',
        code: `// Instead of:
function createUser(options) {
  const name = options.name || 'Anonymous';
  const age = options.age || 25;
  const isAdmin = options.isAdmin || false;
  // ...
}

// Use destructuring with defaults:
function createUser({ name = 'Anonymous', age = 25, isAdmin = false } = {}) {
  // You can now use name, age, and isAdmin directly
  console.log(\`Created user \${name}, age \${age}\`);
  return { name, age, isAdmin };
}

// Call function with just the params you need
createUser({ name: 'Alice' }); // Uses defaults for age and isAdmin
createUser({}); // Uses all defaults
createUser(); // Still works with empty call`,
        explanation: 'Destructuring in function parameters makes it easy to define default values and extract only the properties you need. The = {} at the end ensures the function still works even if called with no parameters.',
        compatibility: 'Supported in all modern browsers.',
        difficulty: 'intermediate',
        tags: ['es6', 'functions'],
        author: 'DevTricks Team'
    },
    {
        id: 'js5',
        title: 'Quick Object Property Value Swapping',
        description: 'Swap the keys and values of an object quickly.',
        code: `const original = { a: 1, b: 2, c: 3 };

const swapped = Object.entries(original).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

console.log(swapped); // { '1': 'a', '2': 'b', '3': 'c' }`,
        explanation: 'Object.entries() converts the object into an array of [key, value] pairs. We then use reduce() to build a new object with keys and values swapped. Note that this assumes all values are unique and valid as object keys.',
        compatibility: 'Object.entries() is supported in all modern browsers.',
        difficulty: 'intermediate',
        tags: ['objects', 'arrays'],
        author: 'DevTricks Team'
    },
    {
        id: 'js6',
        title: 'Async Function Sleep/Delay',
        description: 'Create a reusable sleep function for async/await code.',
        code: `// Define the sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Use in an async function
async function processWithDelays() {
  console.log('Starting...');
  
  await sleep(1000); // Wait 1 second
  console.log('After 1 second');
  
  await sleep(2000); // Wait 2 more seconds
  console.log('After 3 seconds total');
  
  return 'Done!';
}

// Call the function
processWithDelays().then(result => console.log(result));`,
        explanation: 'This sleep function returns a Promise that resolves after the specified number of milliseconds, allowing you to create delays in async/await code without nested callbacks.',
        compatibility: 'Works in all modern browsers that support Promises and async/await.',
        difficulty: 'intermediate',
        tags: ['async', 'promises', 'es8'],
        author: 'DevTricks Team'
    },
    {
        id: 'js7',
        title: 'Event Listener with Automatic Cleanup',
        description: 'Create reusable event listeners that automatically clean up to prevent memory leaks.',
        code: `// Reusable function to add self-removing event listeners
function onceEvent(element, eventType, callback) {
  const handler = (...args) => {
    callback(...args);
    element.removeEventListener(eventType, handler);
  };
  
  element.addEventListener(eventType, handler);
  
  // Return a function to manually remove if needed before trigger
  return () => element.removeEventListener(eventType, handler);
}

// Usage example:
const button = document.querySelector('#submitButton');

// Will fire only once, then clean up automatically
const removeClickListener = onceEvent(button, 'click', () => {
  console.log('Button clicked!');
  // Do something...
});

// If you need to remove it before it fires:
// removeClickListener();`,
        explanation: 'This pattern creates a one-time event listener that automatically cleans itself up after triggering once. It also returns a function that allows you to manually remove the listener if needed, helping prevent memory leaks from abandoned event listeners.',
        compatibility: 'Works in all browsers that support standard DOM event handling.',
        difficulty: 'intermediate',
        tags: ['dom', 'events'],
        author: 'DevTricks Team'
    }
];