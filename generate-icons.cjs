const fs = require('fs');
const path = require('path');

// Mappings of UI Component -> Remix Icon File name (without .svg)
const iconMap = {
  // Atoms
  Avatar: 'User & Faces/user-3-line',
  Badge: 'Finance/price-tag-3-line',
  Button: 'Development/cursor-line',
  Checkbox: 'System/checkbox-line',
  Divider: 'Editor/separator',
  Icon: 'Design/magic-line',
  Input: 'Editor/text',
  Radio: 'System/radio-button-line',
  Spinner: 'System/loader-4-line',
  Textarea: 'Editor/text-wrap',
  Toggle: 'System/toggle-line',

  // Molecules
  Alert: 'System/alert-line',
  Card: 'Design/layout-column-line',
  DatePicker: 'Business/calendar-line',
  DropdownMenu: 'System/menu-3-line',
  FileUpload: 'Document/folder-upload-line',
  LanguageToggle: 'Business/global-line',
  Modal: 'Business/window-line',
  Pagination: 'Editor/page-separator',
  Popover: 'Communication/chat-new-line',
  SearchInput: 'System/search-line',
  Select: 'Arrows/arrow-down-s-line',
  ThemeToggle: 'Weather/sun-line',
  Toast: 'Media/notification-4-line',
  Tooltip: 'System/information-line',
  Tabs: 'Design/layout-top-2-line',

  // Organisms
  Navbar: 'Design/layout-top-line',
  Sidebar: 'Design/layout-left-line',
  ChatMessage: 'Communication/message-2-line',
  ChatInput: 'Business/send-plane-2-line',
  Table: 'Design/table-line',
  Form: 'Document/todo-line'
};

const remixDir = path.join(__dirname, 'node_modules', 'remixicon', 'icons');
const outputTs = path.join(__dirname, 'src', 'lib', 'icons.ts');
const outputCssFile = path.join(__dirname, 'tmp-css.txt');

// Ensure lib dir exists
const libDir = path.dirname(outputTs);
if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });

let tsContent = "// Auto-generated Remix Icons Mapping\n// Use this file to import raw SVG strings for use in your components.\n\nexport const Icons = {\n";
let cssContent = "/* \u2550\u2550 GENERATED REMIX ICONS CONFIG \u2550\u2550 */\n";

const atomsFiles = ['Avatar', 'Badge', 'Button', 'Checkbox', 'Divider', 'Icon', 'Input', 'Radio', 'Spinner', 'Textarea', 'Toggle'];
const moleculesFiles = ['Alert', 'Card', 'DatePicker', 'DropdownMenu', 'FileUpload', 'LanguageToggle', 'Modal', 'Pagination', 'Popover', 'SearchInput', 'Select', 'ThemeToggle', 'Toast', 'Tooltip', 'Tabs'];

function getFolder(component) {
  if (atomsFiles.includes(component)) return 'atoms';
  if (moleculesFiles.includes(component)) return 'molecules';
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
  
  let innerSvg = rawSvg.substring(startIndex, endIndex).replace(/\\r?\\n|\\r/g, '').replace(/ {2,}/g, ' ').trim();
  
  // Build TS code
  const tsSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">' + innerSvg + '</svg>';
  tsContent += "  " + component + ": '" + tsSvg.replace(/'/g, "\\'") + "',\n";
  
  // Build CSS code for Manager Head
  const cleanSvgForMask = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='black'>" + innerSvg + "</g></svg>";
  const encodedSvg = encodeURIComponent(cleanSvgForMask);
  
  const folder = getFolder(component);
  const idName = component.toLowerCase();
  
  cssContent += "\n  /* " + component + " \u2192 " + filePathFragment + " */\n";
  cssContent += "  #" + folder + "-" + idName + " > div::after {\n";
  cssContent += "    mask-image: url('data:image/svg+xml," + encodedSvg + "') !important;\n";
  cssContent += "    -webkit-mask-image: url('data:image/svg+xml," + encodedSvg + "') !important;\n";
  cssContent += "  }\n";
}

tsContent += "};\n";

fs.writeFileSync(outputTs, tsContent);
console.log('✅ Generated TypeScript icon dictionary at src/lib/icons.ts');

fs.writeFileSync(outputCssFile, cssContent);
console.log('✅ Generated CSS blocks for Storybook manager head at tmp-css.txt');
