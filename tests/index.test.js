import SwiftSelect from "../lib";

describe('SwiftSelect', () => {
    let wrapper;
    let swiftSelect;

    beforeEach(() => {
        // Create a container for testing
        wrapper = document.createElement('div');
        document.body.appendChild(wrapper);

        // Initialize the plugin
        swiftSelect = new SwiftSelect(wrapper, [
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' }
        ], { placeholder: 'Select an option', searchable: true }
        );
    });

    afterEach(() => {
        // Clean up after each test
        document.body.removeChild(wrapper);
    });

    test('should initialize correctly', () => {
        const selectText = wrapper.querySelector('.select-text');
        expect(selectText).toBeTruthy(); // Ensure the select text element exists
        expect(selectText.textContent).toBe('Select an option');
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

    test('should select an option', () => {
        const selectText = wrapper.querySelector('.select-text');
        selectText.click(); // Open dropdown

        const option = wrapper.querySelector('.select-list li');

        if (option) option.click(); // Select the first option

        expect(selectText.textContent).toBe('Option 1');
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
});
