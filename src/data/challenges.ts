export interface Challenge {
  day: number;
  title: string;
  track: string;
  duration: string;
  mission: string;
  requirements: string[];
}

const frontendChallenges: Partial<Challenge>[] = [
  { title: 'Build a Hero Section', mission: 'Create a stunning hero section with a bold headline, subtext, CTA button, and a responsive layout that adapts to mobile screens.', requirements: ['Bold headline with tight tracking', 'Supporting description text', 'Primary CTA button', 'Responsive at 390px', 'Smooth entrance animation'] },
  { title: 'Responsive Navigation Bar', mission: 'Build a responsive navigation bar that collapses into a hamburger menu on mobile with smooth open/close transitions.', requirements: ['Desktop horizontal menu', 'Mobile hamburger toggle', 'Smooth slide animation', 'Active link indicator', 'Sticky on scroll'] },
  { title: 'Pricing Cards Section', mission: 'Build a responsive pricing section with three pricing tiers, feature comparison, and highlighted recommended plan.', requirements: ['3 pricing tiers', 'Feature comparison list', 'Highlighted recommended card', 'CTA buttons per tier', 'Mobile-responsive layout'] },
  { title: 'Contact Form with Validation', mission: 'Create a contact form with real-time validation, error messages, and a success state.', requirements: ['Name, email, message fields', 'Real-time validation', 'Error messages', 'Success confirmation', 'Accessible form labels'] },
  { title: 'Portfolio Image Grid', mission: 'Build a masonry-style portfolio grid that showcases project screenshots with hover overlays.', requirements: ['Masonry/grid layout', 'Hover overlay with info', 'Responsive columns', 'Image lazy loading', 'Category filter tabs'] },
  { title: 'Animated Testimonial Carousel', mission: 'Create a testimonial slider with smooth transitions, avatar photos, and auto-play.', requirements: ['Slide transitions', 'Avatar + name + role', 'Navigation dots', 'Auto-play with pause', 'Touch swipe support'] },
  { title: 'Dark Mode Toggle', mission: 'Implement a dark/light mode toggle that persists user preference and transitions smoothly.', requirements: ['Toggle switch UI', 'Smooth color transitions', 'Persist to localStorage', 'System preference detection', 'All elements themed'] },
  { title: 'Animated Stats Counter', mission: 'Build a stats section where numbers animate up from zero when scrolled into view.', requirements: ['Count-up animation', 'Intersection Observer trigger', 'Multiple stat cards', 'Number formatting', 'Staggered animation'] },
  { title: 'Feature Comparison Table', mission: 'Build an interactive feature comparison table with sticky headers and responsive horizontal scroll.', requirements: ['Sticky column headers', 'Check/cross indicators', 'Horizontal scroll mobile', 'Highlight differences', 'Clean typography'] },
  { title: 'Accordion FAQ Section', mission: 'Create an FAQ section with smooth expand/collapse accordion panels and icon rotation.', requirements: ['Smooth height transition', 'Icon rotation on expand', 'Only one open at a time', 'Keyboard accessible', 'Clean spacing'] },
  { title: 'Modal Dialog System', mission: 'Build a reusable modal component with backdrop blur, close button, escape key, and focus trapping.', requirements: ['Backdrop blur overlay', 'Close on escape/click', 'Focus trap inside modal', 'Entry/exit animation', 'Scroll lock on body'] },
  { title: 'Drag & Drop Kanban Board', mission: 'Create a Kanban board with draggable cards across columns (To Do, In Progress, Done).', requirements: ['3 columns with headers', 'Draggable cards', 'Drop zone highlights', 'Card count per column', 'Mobile touch support'] },
];

const backendChallenges: Partial<Challenge>[] = [
  { title: 'REST API Design', mission: 'Design and document a REST API for a blog platform with proper HTTP methods, status codes, and resource naming.', requirements: ['CRUD endpoints designed', 'Proper HTTP methods', 'Status code mapping', 'Request/response schemas', 'API documentation page'] },
  { title: 'Authentication Flow UI', mission: 'Build the frontend for a complete auth flow: signup, login, forgot password, and email verification screens.', requirements: ['Signup form', 'Login form', 'Forgot password screen', 'Verification code input', 'Loading/error states'] },
  { title: 'Database Schema Visualizer', mission: 'Create a visual representation of a database schema showing tables, columns, and relationships.', requirements: ['Table cards with columns', 'Relationship lines', 'Data type indicators', 'Primary/foreign key badges', 'Pan and zoom'] },
  { title: 'API Rate Limiter Dashboard', mission: 'Build a dashboard showing API rate limiting stats with request counts, remaining quota, and time to reset.', requirements: ['Request counter display', 'Quota progress bar', 'Reset countdown timer', 'Endpoint-level breakdown', 'Alert on threshold'] },
  { title: 'Server Log Viewer', mission: 'Create a real-time server log viewer with color-coded log levels and search/filter functionality.', requirements: ['Log level color coding', 'Search/filter input', 'Auto-scroll toggle', 'Timestamp formatting', 'Log level filter tabs'] },
  { title: 'Queue Management UI', mission: 'Build a message queue management interface showing pending, processing, and completed jobs.', requirements: ['Job status columns', 'Priority indicators', 'Retry/cancel actions', 'Processing time stats', 'Real-time updates'] },
  { title: 'Environment Config Manager', mission: 'Create a UI for managing environment variables across dev, staging, and production environments.', requirements: ['Environment tabs', 'Key-value editor', 'Secret value masking', 'Diff between envs', 'Export/import config'] },
  { title: 'Webhook Event Logger', mission: 'Build a webhook event logger that displays incoming webhook payloads with metadata.', requirements: ['Event timeline view', 'Payload JSON viewer', 'Status code display', 'Retry button', 'Filter by event type'] },
  { title: 'Cron Job Scheduler', mission: 'Create a cron job scheduler UI with expression builder, next run preview, and execution history.', requirements: ['Cron expression builder', 'Human-readable preview', 'Next 5 runs display', 'Execution history log', 'Enable/disable toggle'] },
  { title: 'GraphQL Explorer', mission: 'Build a GraphQL query explorer with schema browser, query editor, and response viewer.', requirements: ['Schema type browser', 'Query editor textarea', 'Execute button', 'Response JSON display', 'Variables panel'] },
  { title: 'Microservice Health Monitor', mission: 'Create a service health dashboard showing uptime, response times, and dependency status.', requirements: ['Service status cards', 'Uptime percentage', 'Response time chart', 'Dependency graph', 'Incident timeline'] },
  { title: 'Data Migration Wizard', mission: 'Build a step-by-step data migration wizard with source/target config, mapping, and progress.', requirements: ['Multi-step wizard', 'Source/target config', 'Field mapping UI', 'Progress indicator', 'Rollback option'] },
];

const aimlChallenges: Partial<Challenge>[] = [
  { title: 'Dataset Explorer', mission: 'Build a dataset exploration UI with data preview, column stats, and distribution charts.', requirements: ['Data table preview', 'Column type detection', 'Basic statistics', 'Distribution histogram', 'Missing value indicator'] },
  { title: 'Model Training Dashboard', mission: 'Create a training dashboard showing loss curves, accuracy metrics, and epoch progress.', requirements: ['Loss/accuracy charts', 'Epoch progress bar', 'Hyperparameter display', 'Training time estimate', 'Stop/resume controls'] },
  { title: 'Image Classification UI', mission: 'Build an image upload and classification interface showing predictions with confidence scores.', requirements: ['Image upload/drag-drop', 'Preview uploaded image', 'Top-5 predictions', 'Confidence score bars', 'Classification history'] },
  { title: 'Confusion Matrix Visualizer', mission: 'Create an interactive confusion matrix with tooltips, highlighting, and performance metrics.', requirements: ['Matrix grid display', 'Color intensity mapping', 'Cell tooltips with counts', 'Precision/recall display', 'Class-level metrics'] },
  { title: 'Prompt Engineering Lab', mission: 'Build a prompt engineering workspace for testing different prompts with variable substitution.', requirements: ['Prompt template editor', 'Variable input fields', 'Response display', 'History sidebar', 'Compare responses'] },
  { title: 'Feature Importance Chart', mission: 'Create a feature importance visualization showing which features contribute most to predictions.', requirements: ['Horizontal bar chart', 'Sorted by importance', 'Positive/negative indicators', 'Tooltip with values', 'Feature search filter'] },
  { title: 'Neural Network Visualizer', mission: 'Build a visual representation of a neural network showing layers, neurons, and connections.', requirements: ['Layer visualization', 'Neuron nodes', 'Connection lines', 'Activation display', 'Layer info on click'] },
  { title: 'A/B Test Results Dashboard', mission: 'Create a dashboard for viewing A/B test results with statistical significance and conversion rates.', requirements: ['Variant comparison', 'Conversion rate display', 'Statistical significance', 'Sample size info', 'Winner declaration'] },
  { title: 'Data Annotation Tool', mission: 'Build a simple data annotation interface for labeling text or images with categories.', requirements: ['Content display area', 'Label selection panel', 'Annotation counter', 'Skip/undo buttons', 'Progress tracking'] },
  { title: 'Recommendation Engine UI', mission: 'Create a UI showing personalized recommendations with "why this was recommended" explanations.', requirements: ['Recommendation cards', 'Similarity score', 'Explanation text', 'Like/dislike feedback', 'Refresh suggestions'] },
  { title: 'Time Series Forecasting', mission: 'Build a time series visualization with historical data and forecasted predictions.', requirements: ['Historical data chart', 'Forecast overlay', 'Confidence interval', 'Date range selector', 'Metric summary'] },
  { title: 'ML Pipeline Builder', mission: 'Create a visual ML pipeline builder where users can chain preprocessing, training, and evaluation steps.', requirements: ['Drag-drop pipeline nodes', 'Connection lines', 'Step configuration', 'Pipeline validation', 'Run/stop controls'] },
];

const dsaChallenges: Partial<Challenge>[] = [
  { title: 'Array Visualizer', mission: 'Build an interactive array visualizer that shows element access, insertion, and deletion operations.', requirements: ['Array element display', 'Index labels', 'Insert/delete animation', 'Search highlight', 'Operation log panel'] },
  { title: 'Sorting Algorithm Visualizer', mission: 'Create a sorting visualizer with bar chart representation and step-by-step animation for bubble sort.', requirements: ['Bar chart display', 'Comparison highlighting', 'Swap animation', 'Speed control slider', 'Step counter'] },
  { title: 'Stack & Queue Simulator', mission: 'Build an interactive stack and queue simulator with push, pop, enqueue, dequeue operations.', requirements: ['Stack LIFO display', 'Queue FIFO display', 'Operation buttons', 'Overflow/underflow alerts', 'Element animation'] },
  { title: 'Binary Search Visualizer', mission: 'Create a binary search visualizer showing the search space reduction at each step.', requirements: ['Sorted array display', 'Search space highlight', 'Mid-point indicator', 'Step-by-step controls', 'Found/not-found state'] },
  { title: 'Linked List Operations', mission: 'Build a linked list visualizer with node creation, insertion, deletion, and traversal.', requirements: ['Node + pointer display', 'Insert at position', 'Delete by value', 'Traversal animation', 'Head/tail indicators'] },
  { title: 'Binary Tree Builder', mission: 'Create a binary tree builder where users can insert nodes and see the tree structure update.', requirements: ['Tree node visualization', 'Insert node input', 'Level-order display', 'Parent-child lines', 'Tree height counter'] },
  { title: 'Graph Traversal (BFS/DFS)', mission: 'Build a graph visualizer with BFS and DFS traversal animations showing visited nodes.', requirements: ['Node and edge display', 'BFS/DFS toggle', 'Visit order numbers', 'Queue/stack display', 'Path highlighting'] },
  { title: 'Hash Table Visualizer', mission: 'Create a hash table visualizer showing hashing, collision handling, and load factor.', requirements: ['Bucket array display', 'Hash function demo', 'Collision chaining', 'Load factor meter', 'Insert/search/delete'] },
  { title: 'Recursion Tree Visualizer', mission: 'Build a recursion tree for fibonacci showing how recursive calls branch and overlap.', requirements: ['Tree of recursive calls', 'Call stack display', 'Memoization highlight', 'Step counter', 'Base case indicator'] },
  { title: 'Dijkstra\'s Algorithm', mission: 'Create a shortest path visualizer using Dijkstra\'s algorithm on a weighted graph.', requirements: ['Weighted graph display', 'Distance table update', 'Path highlighting', 'Priority queue view', 'Step-by-step mode'] },
  { title: 'Dynamic Programming Table', mission: 'Build a DP table visualizer for the knapsack problem showing cell-by-cell computation.', requirements: ['2D table grid', 'Cell computation steps', 'Optimal path trace', 'Item selection display', 'Current cell highlight'] },
  { title: 'Algorithm Complexity Analyzer', mission: 'Create a tool that visualizes Big O complexities with interactive charts comparing growth rates.', requirements: ['Growth rate charts', 'O(1) to O(n!) curves', 'Input size slider', 'Operation count display', 'Comparison mode'] },
];

const appDevChallenges: Partial<Challenge>[] = [
  { title: 'Onboarding Screens', mission: 'Design a set of 3 onboarding screens with illustrations, headlines, pagination dots, and skip/next buttons.', requirements: ['3 swipeable screens', 'Illustration placeholders', 'Pagination dots', 'Skip & Next buttons', 'Smooth transitions'] },
  { title: 'Bottom Tab Navigation', mission: 'Build a bottom tab bar with 5 tabs, active state indicator, and smooth icon transitions.', requirements: ['5 tab icons', 'Active tab highlight', 'Label text', 'Smooth transitions', 'Badge notification dot'] },
  { title: 'Social Feed Layout', mission: 'Create a social media feed with post cards, avatar, timestamp, like/comment actions, and image display.', requirements: ['Post card layout', 'Avatar + username', 'Timestamp display', 'Like/comment buttons', 'Image attachment'] },
  { title: 'Chat Messaging UI', mission: 'Build a chat interface with message bubbles, timestamps, typing indicator, and input bar.', requirements: ['Message bubbles layout', 'Sent/received alignment', 'Timestamp display', 'Typing indicator dots', 'Input with send button'] },
  { title: 'Profile Settings Screen', mission: 'Create a profile settings page with avatar upload, form fields, toggle switches, and save action.', requirements: ['Avatar upload circle', 'Edit form fields', 'Toggle switches', 'Save button', 'Danger zone section'] },
  { title: 'Notification Center', mission: 'Build a notification center with categorized notifications, read/unread states, and swipe actions.', requirements: ['Notification list', 'Read/unread styling', 'Category tabs', 'Time-ago formatting', 'Clear all action'] },
  { title: 'E-commerce Product Card', mission: 'Create product cards with image, price, rating stars, add-to-cart button, and wishlist toggle.', requirements: ['Product image', 'Price display', 'Star rating', 'Add to cart button', 'Wishlist heart toggle'] },
  { title: 'Search with Filters', mission: 'Build a search interface with autocomplete suggestions, filter chips, and result cards.', requirements: ['Search input bar', 'Autocomplete dropdown', 'Filter chip toggles', 'Result cards', 'Empty state display'] },
  { title: 'Calendar Event View', mission: 'Create a monthly calendar view with event indicators, day selection, and event list below.', requirements: ['Monthly grid view', 'Event dot indicators', 'Day selection highlight', 'Event list panel', 'Month navigation'] },
  { title: 'Music Player Interface', mission: 'Build a music player UI with album art, progress bar, play/pause/skip controls, and playlist.', requirements: ['Album art display', 'Progress/seek bar', 'Play/pause/skip buttons', 'Track info display', 'Mini playlist view'] },
  { title: 'Map with Location Pins', mission: 'Create a map-style interface with location pins, info card popups, and a search bar.', requirements: ['Map placeholder area', 'Location pin markers', 'Info card popup', 'Search bar overlay', 'Current location button'] },
  { title: 'App Store Product Page', mission: 'Build an app store style product page with screenshots carousel, ratings, reviews, and install button.', requirements: ['Screenshot carousel', 'App icon and name', 'Rating and reviews', 'Description expand', 'Install CTA button'] },
];

function buildChallengeList(): Challenge[] {
  const allTracks = [
    { name: 'Frontend', items: frontendChallenges },
    { name: 'Backend', items: backendChallenges },
    { name: 'AI / ML', items: aimlChallenges },
    { name: 'DSA', items: dsaChallenges },
    { name: 'App Development', items: appDevChallenges },
  ];
  const result: Challenge[] = [];
  for (let i = 0; i < 60; i++) {
    const trackIndex = i % allTracks.length;
    const track = allTracks[trackIndex];
    const itemIndex = Math.floor(i / allTracks.length) % track.items.length;
    const item = track.items[itemIndex];
    result.push({
      day: i + 1,
      title: item.title || `Challenge Day ${i + 1}`,
      track: track.name,
      duration: item.duration || '45–60 min',
      mission: item.mission || '',
      requirements: item.requirements || [],
    });
  }
  return result;
}

export const challenges = buildChallengeList();

export const milestones: Record<number, string> = {
  1: 'First Step',
  7: 'One Week',
  15: 'Getting Serious',
  30: 'Halfway There',
  45: 'Final Stretch',
  60: 'Challenge Complete',
};
