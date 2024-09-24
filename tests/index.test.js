import SwiftSelect from "../lib";

// Simple Mode Tests
describe('SwiftSelect [Simple Mode]', () => {
    let wrapper;
    let swiftSelect;

    beforeEach(() => {
        wrapper = document.createElement('div');
        document.body.appendChild(wrapper);


        // Initialize the plugin in simple mode
        swiftSelect = new SwiftSelect(wrapper, [
            {value: '1', label: 'Option 1'},
            {value: '2', label: 'Option 2'},
            {value: '3', label: 'Option 3'}
        ], {placeholder: 'Select an option', searchable: true});
    });

    afterEach(() => {
        // Clean up after each test
        document.body.removeChild(wrapper);
    });


    test('should initialize correctly in simple mode', () => {
        const selectText = wrapper.querySelector('.select-text');
        expect(selectText).toBeTruthy();
        expect(selectText.textContent).toBe('Select an option');
    });

    test('should open and close dropdown on click', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click(); // Open dropdown

        expect(wrapper.querySelector('.select-dropdown')).toBeTruthy(); // Dropdown is open

        document.body.click(); // Click outside to close
        expect(wrapper.querySelector('.select-dropdown')).toBeFalsy(); // Dropdown is closed
    });

    test('should display "Not found" message when no options match the search', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click(); // Open dropdown

        const searchInput = wrapper.querySelector('.select-search');
        if (searchInput) {
            searchInput.value = 'Nonexistent';
            searchInput.dispatchEvent(new Event('input')); // Trigger update
        }

        expect(wrapper.querySelector('.not-found')).toBeTruthy(); // "Not found" message appears
    });

    // Additional Test: Searchable dropdown filtering
    test('should filter options based on search input', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click(); // Open dropdown

        const searchInput = wrapper.querySelector('.select-search');
        if (searchInput) {
            searchInput.value = 'Option 2';
            searchInput.dispatchEvent(new Event('input')); // Trigger search
        }

        const visibleOptions = [...wrapper.querySelectorAll('.select-list .select-list-item')].filter(li => li.style.display !== 'none');
        expect(visibleOptions.length).toBe(1); // Only one option should remain
        expect(visibleOptions[0].textContent).toBe('Option 2');
    });

    test('should select an option', async () => {
        const selectValues = wrapper.querySelector('.select-values');
        selectValues.click(); // Open dropdown

        const option = wrapper.querySelector('.select-list .select-list-item');
        if (option) option.click(); // Select first option

        expect(swiftSelect.value).toBe('1'); // Check value

        const selectText = wrapper.querySelector('.select-text');
        expect(selectText.textContent).toBe('Option 1'); // Check selected text
    });
});

// Multiple Mode Tests
describe('SwiftSelect [Multiple Mode]', () => {
    let wrapper;
    let swiftSelect;

    beforeEach(() => {
        wrapper = document.createElement('div');
        document.body.appendChild(wrapper);

        // Initialize the plugin in multiple mode
        swiftSelect = new SwiftSelect(wrapper, [
            {value: '1', label: 'Option 1'},
            {value: '2', label: 'Option 2'}
        ], {placeholder: 'Select options', multiple: true, searchable: true});
    });

    afterEach(() => {
        // Clean up after each test
        document.body.removeChild(wrapper);
    });

    test('should initialize correctly in multiple mode', () => {
        const selectText = wrapper.querySelector('.select-text');
        expect(selectText).toBeTruthy(); // Ensure the select text element exists
        expect(selectText.textContent).toBe('Select options');
    });

    test('should open dropdown on click', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click();

        expect(wrapper.querySelector('.select-dropdown')).toBeTruthy();
    });

    test('should close dropdown on outside click', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click(); // Open dropdown
        expect(wrapper.querySelector('.select-dropdown')).toBeTruthy();

        document.body.click(); // Click outside
        expect(wrapper.querySelector('.select-dropdown')).toBeFalsy();
    });

    test('should select multiple options', async () => {
        const selectValues = wrapper.querySelector('.select-values');
        selectValues.click(); // Open dropdown

        const options = wrapper.querySelectorAll('.select-list .select-list-item');
        if (options[0]) await options[0].click(); // Select first option
        if (options[1]) await options[1].click(); // Select second option

        expect(swiftSelect.value).toEqual(['1', '2']); // Multiple selection
    });

    test('should remove selected options on close', async () => {
        const selectValues = wrapper.querySelector('.select-values');
        selectValues.click(); // Open dropdown

        const options = wrapper.querySelectorAll('.select-list .select-list-item');
        if (options[0]) await options[0].click(); // Select first option

        // Simulate closing the dropdown
        document.body.click();

        expect(swiftSelect.value).toEqual(['1']); // Check that selected value persists
    });

    test('should display "Not found" message when no options match the search', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click(); // Open dropdown

        const searchInput = wrapper.querySelector('.select-search');
        if (searchInput) {
            searchInput.value = 'Nonexistent';
            searchInput.dispatchEvent(new Event('input')); // Trigger update
        }

        expect(wrapper.querySelector('.not-found')).toBeTruthy();
    });

    // Additional Test: Deselecting an option
    test('should deselect an option in multiple mode', async () => {
        const selectValues = wrapper.querySelector('.select-values');
        selectValues.click(); // Open dropdown

        const options = wrapper.querySelectorAll('.select-list .select-list-item');
        if (options[0]) await options[0].click(); // Select first option
        expect(swiftSelect.value).toEqual(['1']); // Ensure option is selected

        if (options[0]) await options[0].click(); // Deselect first option
        expect(swiftSelect.value).toEqual([]); // Ensure option is deselected
    });
});
