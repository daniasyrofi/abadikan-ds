const fs = require('fs');
const path = require('path');

// Mappings of UI Component -> Remix Icon File name (without .svg)
const iconMap = {
  // Atoms
  Avatar: 'User & Faces/user-3-line',
  Badge: 'Finance/price-tag-3-line',
  Button: 'Development/cursor-line',
  Checkbox: 'System/checkbox-line',
  Check: 'System/check-line',
  Subtract: 'System/subtract-line',
  Divider: 'Editor/separator',
  Icon: 'Design/magic-line',
  Input: 'Editor/text',
  Radio: 'System/radio-button-line',
  Spinner: 'Design/focus-2-line',
  Textarea: 'Design/t-box-line',
  Toggle: 'System/toggle-line',

  // Molecules
  Accordion: 'Arrows/arrow-down-wide-line',
  Alert: 'System/alert-line',
  AlertInfo: 'System/information-line',
  AlertSuccess: 'System/checkbox-circle-line',
  AlertWarning: 'System/alert-line',
  AlertDanger: 'System/error-warning-line',
  ArrowLeft: 'Arrows/arrow-left-s-line',
  ArrowRight: 'Arrows/arrow-right-s-line',
  ArrowDown: 'Arrows/arrow-down-s-line',
  ArrowUp: 'Arrows/arrow-up-s-line',
  AvatarGroup: 'User & Faces/team-line',
  Breadcrumb: 'Editor/list-check',
  Close: 'System/close-line',
  Card: 'Design/layout-grid-line',
  DatePicker: 'Business/calendar-todo-line',
  DropdownMenu: 'System/menu-3-line',
  FileUpload: 'Document/folder-upload-line',
  InputGroup: 'Editor/font-size',
  LanguageToggle: 'Business/global-line',
  Modal: 'Business/window-line',
  NumberInput: 'Editor/font-size-2',
  Pagination: 'Editor/page-separator',
  Popover: 'Communication/chat-new-line',
  ProgressBar: 'Business/bubble-chart-line',
  SearchInput: 'System/search-line',
  Select: 'Arrows/arrow-down-s-line',
  Slider: 'Design/layout-masonry-line',
  Stepper: 'Design/layout-column-line',
  ThemeToggle: 'Weather/sun-line',
  Toast: 'Media/notification-4-line',
  Tooltip: 'System/information-2-line',
  Tabs: 'Design/layout-top-2-line',

  // Organisms
  Navbar: 'Design/layout-top-line',
  Sidebar: 'Design/layout-left-line',
  ChatMessage: 'Communication/message-2-line',
  ChatInput: 'Business/send-plane-2-line',
  Table: 'Design/table-line',
  Form: 'Document/todo-line',

  // Story Icons (For Demo)
  Dashboard: 'System/dashboard-line',
  Inbox: 'Business/inbox-2-line',
  Calendar: 'Business/calendar-line',
  Team: 'User & Faces/team-line',
  Settings: 'System/settings-line',
  Folder: 'Document/folder-line',
  BarChart: 'Business/bar-chart-2-line',
  Book: 'Document/book-open-line',
  Mail: 'Business/mail-line'
};

const remixDir = path.join(__dirname, 'node_modules', 'remixicon', 'icons');
const outputTs = path.join(__dirname, 'src', 'lib', 'icons.ts');
const outputCssFile = path.join(__dirname, 'tmp-css.txt');

// Ensure lib dir exists
const libDir = path.dirname(outputTs);
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

let tsContent = "// Auto-generated Remix Icons Mapping\n// Use this file to import raw SVG strings for use in your components.\n\nexport const Icons = {\n";
let cssContent = "/* ══ GENERATED REMIX ICONS CONFIG ══ */\n";

const atomsFiles = ['Avatar', 'Badge', 'Button', 'Checkbox', 'Divider', 'Icon', 'Input', 'Radio', 'Spinner', 'Textarea', 'Toggle'];
const moleculesFiles = ['Alert', 'Card', 'DatePicker', 'DropdownMenu', 'FileUpload', 'LanguageToggle', 'Modal', 'Pagination', 'Popover', 'SearchInput', 'Select', 'ThemeToggle', 'Toast', 'Tooltip', 'Tabs'];

function getFolderPrefix(comp) {
  if (atomsFiles.includes(comp)) return 'atoms';
  if (moleculesFiles.includes(comp)) return 'molecules';
  // Check for common story demo categories
  if (['Dashboard', 'Inbox', 'Calendar', 'Team', 'Settings', 'Folder', 'BarChart', 'Book', 'Mail'].includes(comp)) return 'organisms'; // Stories are usually under their main level
  return 'organisms';
}

for (const [component, filePathFragment] of Object.entries(iconMap)) {
  const absolutePath = path.join(remixDir, filePathFragment + '.svg');
  
  if (!fs.existsSync(absolutePath)) {
    console.error("MISSING ICON: " + absolutePath);
    continue;
  }
  
  const rawSvg = fs.readFileSync(absolutePath, 'utf-8');
  
  const startIndex = rawSvg.indexOf('>', rawSvg.indexOf('<svg')) + 1;
  const endIndex = rawSvg.lastIndexOf('</svg>');
  if (startIndex <= 0 || endIndex <= startIndex) continue;
  
  let innerSvg = rawSvg.substring(startIndex, endIndex).replace(/\r?\n|\r/g, '').replace(/ {2,}/g, ' ').trim();
  
  // Build TS code
  const tsSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">' + innerSvg + '</svg>';
  tsContent += "  " + component + ": '" + tsSvg.replace(/'/g, "\\'") + "',\n";
  
  // Build CSS code for Manager Head
  const cleanSvgForMask = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='black'>" + innerSvg + "</g></svg>";
  const encodedSvg = encodeURIComponent(cleanSvgForMask);
  
  const prefix = getFolderPrefix(component);
  const idName = component.toLowerCase();

  cssContent += "\n  /* " + component + " → " + filePathFragment + " */\n";
  // Data-item-id with fuzzy matching (starts with) is much more robust for Storybook re-renders
  cssContent += "  [data-item-id*='" + prefix + "-" + idName + "'] > button > div::after,\n";
  cssContent += "  [data-item-id*='" + prefix + "-" + idName + "'] > button > span::after {\n";
  cssContent += "    mask-image: url('data:image/svg+xml," + encodedSvg + "') !important;\n";
  cssContent += "    -webkit-mask-image: url('data:image/svg+xml," + encodedSvg + "') !important;\n";
  cssContent += "  }\n";
}

tsContent += "};\n";

fs.writeFileSync(outputTs, tsContent);
console.log('✅ Generated TypeScript icon dictionary at src/lib/icons.ts');

fs.writeFileSync(outputCssFile, cssContent);
console.log('✅ Generated CSS blocks for Storybook manager head at tmp-css.txt');
