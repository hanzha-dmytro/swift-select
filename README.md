# SwiftSelect

`SwiftSelect` is a customizable plugin to enhance select elements with support for multi-selection, searching, custom events, and keyboard navigation.

## Installation

Install via npm:

```bash
npm install swift-select
```

## Usage

### Initialization

To initialize `SwiftSelect`, pass in the wrapper element, options array, and (optionally) settings and events.

```javascript
import SwiftSelect from 'swift-select';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' }
];

const settings = {
  multiple: true,             // Enables multi-selection
  searchable: true,           // Adds a search input field
  placeholder: 'Select...',   // Placeholder text
};

const events = {
  onSelectChange: (value) => {
    console.log('Selected value:', value);
  }
};

// Initialization
const selectWrapper = document.querySelector('#select-wrapper');
const swiftSelect = new SwiftSelect(selectWrapper, options, settings, events);
```

### HTML Structure

Ensure the element you want to transform into a select has a wrapper:

```html
<div id="select-wrapper"></div>
```

### Options

`SwiftSelect` supports the following settings:

| Option                   | Type    | Description                                                                                             | Default           |
|--------------------------|---------|---------------------------------------------------------------------------------------------------------|-------------------|
| `multiple`               | Boolean | If set to `true`, allows selecting multiple options. If set to `false`, only a single option can be selected. | `false`           |
| `searchable`             | Boolean | If set to `true`, adds a search input field in the dropdown, allowing users to filter options by typing.  | `false`           |
| `placeholder`            | String  | Placeholder text displayed when no option is selected. This provides guidance for the user on what to do. | `'Select an option'` |
| `withDefaultOption`      | Boolean | If set to `true`, displays a default option when the dropdown is opened. Useful for prompting user action. | `false`           |
| `selectVisibleOptions`    | Number  | Determines how many options are visible in the dropdown at a time. This helps manage space and usability.   | `7`               |
| `searchPlaceholder`      | String  | Placeholder text for the search input field. This informs users what they can enter in the search box.      | `'Search...'`     |
| `searchNotFoundText`     | String  | Text displayed when no options match the search query. This provides feedback to users when their search yields no results. | `'Not found'`     |
| `searchDefaultOption`    | String  | A specific option value that should always be visible in the dropdown, even if it doesn't match the search query. | `null`            |
| `disabled`               | Boolean | If set to `true`, disables the select component, preventing user interaction. Useful for managing form states. | `false`           |


### Events

You can hook into different events by passing an `events` object during initialization. For example:

- `onSelectChange`: Triggered when an option is selected or deselected.

```javascript
const events = {
  onSelectChange: (value) => {
    console.log('Current selected value:', value);
  }
};
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
