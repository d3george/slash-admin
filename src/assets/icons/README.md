# SVG Icon Naming Conventions

## Format
Icons should be named following this pattern:
```
prefix-name[-variant]
```

For example:
- `ic-home` - standard home icon
- `ic-user` - user icon
- `ic-settings-dark` - settings icon dark variant

## Prefixes
Use these standard prefixes to categorize icons:
- `ic-` - Interface/UI icons (buttons, navigation, etc.)
- `logo-` - Brand logos
- `flag-` - Country/region flags
- `ill-` - Illustrations

## Naming Guidelines
1. Use lowercase letters
2. **Always use hyphens (-) to separate words, never underscores (_)**
3. Use descriptive, clear names
4. For variants, add a hyphen followed by the variant name (e.g., `-dark`, `-filled`)
5. Keep names concise but meaningful

## File Requirements
- Format: SVG only
- Clean SVG code without unnecessary elements
- Ensure proper viewBox attributes
- Use currentColor for fills to support theme changes

## Registration Process

These SVG icons are automatically registered with Iconify using the `registerIcons` function. Here's how it works:

1. The `registerIcons` function is called when the application starts (in `main.tsx`)
2. It scans the `src/assets/icons` directory for all SVG files
3. Each SVG is parsed and converted to the Iconify format
4. Icons are registered with the `local:` prefix
5. For example, a file named `ic-home.svg` will be registered as `local:ic-home`

### How Registration Works

The process involves these steps:
- Extracting the SVG content
- Parsing the SVG structure
- Determining width and height from viewBox or attributes
- Creating an IconifyIcon object with body, width, and height
- Registering the icon with Iconify using `addIcon`

### Troubleshooting

If an icon doesn't display:
- Check console for warnings during the registration process
- Ensure the SVG has a valid structure
- Verify you're using the correct name with the `local:` prefix

## Examples
```
ic-dashboard        // Dashboard icon
ic-user             // User icon
ic-file-pdf         // PDF file icon
logo-company        // Company logo
flag-usa            // USA flag
ic-home-outlined    // Home icon with outline style
```

When using these icons with our Icon component:
```jsx
<Icon icon="local:ic-dashboard" />
<Icon icon="local:logo-company" />
```