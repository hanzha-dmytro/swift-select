class SwiftSelect {

    #wrapper = null;
    #valuesWrapper = null;
    #options = [];
    #selected = [];

    #elementToValueMap = new WeakMap();
    #valueToElementMap = new Map();

    #settings = {
        multiple: false, //  If true, allows selecting multiple options
        searchable: false, // Whether the dropdown should have a search input
        placeholder: 'Select an option', // Placeholder text when no option is selected
        withDefaultOption: false, // Whether to show a default option
        selectVisibleOptions: 7, // Number of options visible in the dropdown
        searchPlaceholder: 'Search...', // Placeholder text for search input
        searchNotFoundText: 'Not found', // Text to display when no options match the search
        searchDefaultOption: null, // Default option value for search
        disabled: false, // Whether the select is disabled
    };

    #events = {
        onSelectOpened: () => null, // Handler for when the select dropdown is opened
        onSelectClosed: () => null, // Handler for when the select dropdown is closed
        onSelectChange: () => null, // Handler for when the selected value changes
    }

    constructor(wrapper, options = [], settings = {}, events = {}) {
        if (!(wrapper instanceof HTMLElement)) {
            throw new Error("Wrapper must be an HTML element");
        }

        this.#wrapper = wrapper;
        this.#options = options;

        // Merge the provided settings and events with the existing ones.
        this.#settings = {...this.#settings, ...settings}
        this.#events = {...this.#events, ...events}

        // Build the select element and initialize it with the necessary options
        this.#buildSelect();

        // Attach event listeners to the relevant elements to handle user interactions
        this.#attachEvents();

        return this;
    }

    get value() {
        return !!this.#settings.multiple ? this.#selected : this.#selected[0] ?? null;
    }

    set value(optionValue) {
        if (!optionValue && this.#isOptionAvailable(optionValue)) return;

        this.#selectOption(optionValue, true);
    }

    get options() {
        return this.#options;
    }

    set options(options) {
        this.#options = options;

        this.#closeDropdown();
        this.#selectDefaultOption();
        this.#toggleWrapperClasses();
    }

    get settings() {
        return this.#settings;
    }

    set settings(settings) {
        this.#settings = {...this.#settings, ...settings};

        this.#closeDropdown();
        this.#selectDefaultOption();
        this.#toggleWrapperClasses();
    }

    #isOptionAvailable(optionValue) {
        return this.options.some(option => option.value === optionValue);
    }

    #isValidOption(optionValue) {
        return optionValue === null || this.#isOptionAvailable(optionValue);
    }

    #buildSelect() {
        // Set up the wrapper with class and ARIA attributes for accessibility
        this.#wrapper.classList.add('swift-select');
        this.#wrapper.setAttribute('role', 'listbox');
        this.#wrapper.setAttribute('aria-expanded', 'false');

        // Create a wrapper div for values and set its class and ARIA attribute
        this.#valuesWrapper = document.createElement('div');
        this.#valuesWrapper.classList.add('select-values');
        this.#valuesWrapper.setAttribute('aria-haspopup', 'true');

        // Calls a method to build a single option element, passing the placeholder from the settings
        this.#buildSingleOptionElement(this.#settings.placeholder);

        // Append the values wrapper to the main wrapper
        this.#wrapper.appendChild(this.#valuesWrapper);

        this.#selectDefaultOption();
        this.#toggleWrapperClasses();
    }

    #buildDropdown() {
        // Clear dropdown
        this.#wrapper.querySelector('.select-dropdown')?.remove();

        // Reinitialize the dropdown component
        const dropdown = document.createElement('div');
        dropdown.classList.add('select-dropdown');

        if (!!this.#settings.searchable) {
            const searchInput = document.createElement('input');

            searchInput.type = 'text';
            searchInput.placeholder = this.#settings.searchPlaceholder;
            searchInput.classList.add('select-search');
            dropdown.appendChild(searchInput);

            // Attach event to search input
            searchInput.addEventListener('input', this.#handleSelectSearch.bind(this));
        }

        const list = document.createElement('ul');
        list.classList.add('select-list');
        dropdown.appendChild(list);

        // Render the list of options by building them based on the provided data
        this.#buildOptions(list);

        this.#wrapper.appendChild(dropdown);

        // Calculate custom height for the dropdown menu
        this.#calculateDropdownHeight();
    }

    #buildOptions(dropdownList) {
        dropdownList.innerHTML = '';

        // Initialize a new WeakMap and clear the value-to-element map
        this.#elementToValueMap = new WeakMap();
        this.#valueToElementMap.clear();

        // Iterate over the list of options and create a corresponding list item (<li>) for each
        this.#options?.forEach(option => {
            const li = document.createElement('li');
            li.classList.add('select-list-item');
            li.textContent = option.label;
            li.tabIndex = -1; // Set tabindex to -1 to make the <li> non-focusable

            if (this.#selected.includes(option.value)) {
                li.classList.add('selected');
            }

            // Map the list item to its value and the value to the list item
            this.#elementToValueMap.set(li, option.value);
            this.#valueToElementMap.set(option.value, li);

            dropdownList.appendChild(li);

            // Adds a click event listener to the list item, calling the handleListClick method
            li.addEventListener('click', this.#handleListClick.bind(this));
        });
    }

    #toggleWrapperClasses() {
        // Toggle the 'disabled' class on the wrapper element
        this.#wrapper.classList.toggle('disabled', !!this.#settings.disabled || !this.#options?.length);
    }

    #attachEvents() {
        this.#valuesWrapper.addEventListener('click', this.#handleDropdownClick.bind(this));
        this.#wrapper.addEventListener('keydown', this.#handleKeyboardNavigation.bind(this));
        document.addEventListener('click', this.#handleOutsideClick.bind(this));
    }

    #selectDefaultOption() {
        if (!this.#options?.length || (!this.#settings.withDefaultOption && this.#isValidOption(this.value))) return;

        const selectedValue = this.#options[0]?.value;
        this.#selectOption(selectedValue, true);
    }

    #selectOption(optionValue, forceUpdate = false) {
        if (!optionValue) return;

        if (!!this.#settings.multiple && this.#selected.includes(optionValue) && !forceUpdate) {
            const optionIndex = this.#selected.findIndex((value) => value === optionValue);
            this.#selected.splice(optionIndex, 1);
        } else {
            this.#selected = !!this.#settings.multiple ? this.#selected.concat(optionValue) : [optionValue];
        }

        this.#updateSelectedOption();
        this.#closeDropdown();

        this.#events.onSelectChange.call(this, this.value);
    }

    #updateSelectedOption() {
        // Find the option object in the options array that matches the given value
        const selectedOptions = this.#options.filter((option) => this.#selected.includes(option.value));

        // Clear the content of the values wrapper
        this.#valuesWrapper.innerHTML = '';

        if (!selectedOptions.length) {
            this.#buildSingleOptionElement(this.#settings.placeholder);
        } else if(!this.#settings.multiple) {
            this.#buildSingleOptionElement(selectedOptions[0].label);
        } else {
            this.#buildMultipleOptionElement(selectedOptions);
        }
    }

    #buildSingleOptionElement(optionText = '')
    {
        const selectText = document.createElement('span');
        selectText.classList.add('select-text');
        selectText.textContent = optionText;
        this.#valuesWrapper.appendChild(selectText);
    }

    #buildMultipleOptionElement(options = [])
    {
        options.forEach((option) => {

            // Create a div for the select tag and set its value and class
            const selectTag = document.createElement('div');
            selectTag.classList.add('select-tag');

            // Create and append a span element for the select tag's text
            const selectTagText = document.createElement('span');
            selectTagText.classList.add('select-tag-text');
            selectTagText.textContent = option.label;
            selectTag.appendChild(selectTagText);

            // Create a button for removing the select tag and set its attributes and class
            const selectTagButton = document.createElement('button');
            selectTagButton.role = 'button';
            selectTagButton.ariaLabel = 'button';
            selectTagButton.classList.add('select-tag-remove');
            selectTag.appendChild(selectTagButton);

            // Adds a click event listener to the selectTagButton, invoking the handleRemoveButtonClick method with the event and the option value
            selectTagButton.addEventListener('click', (event) => this.#handleRemoveButtonClick.call(this, event, option.value));

            this.#valuesWrapper.appendChild(selectTag);
        })
    }

    #openDropdown() {
        this.#buildDropdown();
        this.#wrapper.classList.toggle('opened', true);
        this.#wrapper.setAttribute('aria-expanded', 'true');

        const focusElement = this.#wrapper.querySelector('.select-search')
            || this.#wrapper.querySelector('.select-list li.selected')
            || this.#wrapper.querySelector('.select-list li:first-child');

        focusElement?.focus();

        this.#events.onSelectOpened.call(this);
    }

    #closeDropdown() {
        this.#wrapper.classList.toggle('opened', false);
        this.#wrapper.setAttribute('aria-expanded', 'false');
        this.#wrapper.querySelector('.select-dropdown')?.remove();

        this.#events.onSelectClosed.call(this);
    }

    #calculateDropdownHeight() {
        let totalHeight = 0;

        const dropdown = this.#wrapper.querySelector('.select-dropdown');
        const search = this.#wrapper.querySelector('.select-search');
        const listWrapper = this.#wrapper.querySelector('.select-list');
        const listLiItems = [...listWrapper.querySelectorAll('li')].filter(li => li.offsetParent !== null);

        // Get computed styles of the wrapper and add the top and bottom padding to the total height
        const wrapperStyles = getComputedStyle(listWrapper);
        totalHeight += parseFloat(wrapperStyles.paddingTop);
        totalHeight += parseFloat(wrapperStyles.paddingBottom);

        // Calculate total height of visible options up to the specified limit
        for (let i = 0; i < this.#settings.selectVisibleOptions && i < listLiItems.length; i++) {
            totalHeight += listLiItems[i].getBoundingClientRect().height; // 1px for border
        }

        // Add the height of the search block to the total height calculation
        totalHeight += search ? search.getBoundingClientRect().height + 1 : 0;

        dropdown.style.height = totalHeight + 'px';
    }

    #handleDropdownClick(e) {
        e.preventDefault();

        const opened = this.#wrapper.classList.contains('opened');
        !opened ? this.#openDropdown() : this.#closeDropdown();
    }

    #handleSelectSearch(e) {
        e.preventDefault();
        e.stopPropagation();

        const list = this.#wrapper.querySelector('.select-list');
        const searchTerm = e.target.value.toLowerCase();
        let hasVisibleOptions = false;

        // Remove existing "Not found" message if present
        const notFoundMessage = list.querySelector('.not-found');
        if (notFoundMessage) notFoundMessage.remove();

        // Loop through all options and manage visibility
        [...list.children].forEach(li => {
            const optionLabel = li.textContent.toLowerCase();
            const defaultOption = this.#valueToElementMap.get(this.#settings.searchDefaultOption);
            const isMatch = optionLabel.includes(searchTerm) || li === defaultOption;

            li.style.display = isMatch ? 'block' : 'none';
            if (isMatch) hasVisibleOptions = true;
        });

        // If no options match the search term, display "Not found"
        if (!hasVisibleOptions) {
            const notFoundMessage = document.createElement('li');
            notFoundMessage.textContent = this.#settings.searchNotFoundText;
            notFoundMessage.classList.add('select-list-item', 'not-found');
            list.appendChild(notFoundMessage);
        }

        // Calculate and set custom height for dropdown
        this.#calculateDropdownHeight();
    }

    #handleListClick(e) {
        e.preventDefault();

        const selectedListItem = e.currentTarget;
        const selectedOption = this.#elementToValueMap.get(selectedListItem);

        this.#selectOption(selectedOption);
    }

    #handleOutsideClick(e) {
        if (!this.#wrapper.contains(e.target)) {
            this.#closeDropdown();
        }
    }

    #handleKeyboardNavigation(e) {
        const key = e.which || e.keyCode;
        const list = this.#wrapper.querySelector('.select-list');
        const activeElement = list.querySelector(':focus') || list.querySelector('.selected');

        // Exit if key is not up, down, enter, or escape
        if(![38, 40, 13, 'Escape'].includes(key)) return;

        e.preventDefault();

        switch (key) {
            case 38: // Up arrow
                const previousElement = activeElement?.previousElementSibling || list.lastChild;
                previousElement?.focus();
                break;
            case 40: // Down arrow
                const nextElement = activeElement?.nextElementSibling || list.firstChild;
                nextElement?.focus();
                break;
            case 13: // Enter key
                // Exit if the active element is not the current element
                if(document.activeElement !== activeElement) break;

                const selectedOption = this.#elementToValueMap.get(activeElement);
                this.#selectOption(selectedOption);
                break;
            case 'Escape':
                this.#closeDropdown();
                break;
        }
    }

    #handleRemoveButtonClick(e, selectedValue) {
        e.preventDefault();
        e.stopPropagation();

        // Get the index of the selected value in the selected options
        const optionIndex = this.#selected.findIndex((value) => value === selectedValue);
        this.#selected.splice(optionIndex, 1);

        // Remove the 'selected' class from the selected list item
        const selectedListItem = this.#valueToElementMap.get(selectedValue);
        selectedListItem.classList.remove('selected');

        this.#updateSelectedOption();
    }
}

export default SwiftSelect;
