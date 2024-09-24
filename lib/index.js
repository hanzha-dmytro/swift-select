class SwiftSelect {

    #wrapper = null;
    #selectedValue = null;
    #selectText = null;
    #options = [];

    #settings = {
        type: 'single', // Type of select (single or multiple)
        placeholder: 'Select option', // Placeholder text when no option is selected
        withDefaultOption: false, // Whether to show a default option
        selectVisibleOptions: 7, // Number of options visible in the dropdown
        searchable: false, // Whether the dropdown should have a search input
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

    constructor(wrapper, options, settings, events) {
        this.#wrapper = wrapper;
        this.#options = options;

        // Merge the provided settings and events with the existing ones.
        this.#settings = { ...this.#settings, ...settings }
        this.#events = { ...this.#events, ...events }

        // Build the select element and initialize it with the necessary options
        this.#buildSelect();

        // Attach event listeners to the relevant elements to handle user interactions
        this.#attachEvents();

        return this;
    }

    get value() {
        return this.#selectedValue;
    }

    set value(optionValue) {
        if(!optionValue) return;

        this.#selectOption(optionValue);
    }

    get options() {
        return this.#options;
    }

    set options(options) {
        this.#options = options;

        this.#closeDropdown();
        this.#selectDefaultOption();
    }

    get settings() {
        return this.#settings;
    }

    set settings(settings) {
        this.#settings = { ...this.#settings, ...settings };

        this.#closeDropdown();
        this.#selectDefaultOption();
    }

    #buildSelect() {
        this.#wrapper.classList.add('swift-select');

        // Create a new 'div' element to display the selected text
        this.#selectText = document.createElement('div');
        this.#selectText.classList.add('select-text');
        this.#wrapper.appendChild(this.#selectText);

        // Toggle the 'disabled' class on the wrapper element
        this.#wrapper.classList.toggle('disabled', !!this.#settings.disabled || !this.#options.length);

        this.#selectDefaultOption();
    }

    #buildDropdown() {
        // Clear dropdown
        this.#wrapper.querySelector('.select-dropdown')?.remove();

        // Reinitialize the dropdown component
        const dropdown = document.createElement('div');
        dropdown.classList.add('select-dropdown');

        if(!!this.#settings.searchable) {
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

        // Calculate and set a custom height for the dropdown menu
        this.#calculateDropdownHeight();

        list.addEventListener('click', this.#handleListClick.bind(this));
    }

    #buildOptions(dropdownList) {
        dropdownList.innerHTML = ''; // Очищаємо поточний список

        // Iterate over the list of options and create a corresponding list item (<li>) for each
        this.#options.forEach(option => {
            const li = document.createElement('li');
            li.textContent = option.label;
            li.dataset.value = option.value;
            li.tabIndex = -1; // Set tabindex to -1 to make the <li> non-focusable

            if (option.disabled) {
                li.classList.add('disabled');
            }

            if (this.#selectedValue == option.value) {
                li.classList.add('selected');
            }

            dropdownList.appendChild(li);
        });
    }

    #attachEvents() {
        this.#selectText.addEventListener('click', this.#toggleDropdown.bind(this));
        document.addEventListener('click', this.#handleOutsideClick.bind(this));
        document.addEventListener('keydown', this.#handleEscape.bind(this));
        this.#wrapper.addEventListener('keydown', this.#handleKeyboardNavigation.bind(this));
    }

    #selectDefaultOption() {
        if(!this.#settings.withDefaultOption || !this.#options.length) {
            this.#selectedValue = null;
            this.#selectText.textContent = this.#settings.placeholder;
        } else {
            const activeOption = this.#options[0];
            this.#selectedValue = activeOption.value;
            this.#selectText.textContent = activeOption.label;
        }
    }

    #selectOption(optionValue) {
        if (!optionValue) return;

        // Find the option object in the options array that matches the given value
        const selectedOption = this.#options.find((option) => option.value == optionValue);

        this.#selectedValue = selectedOption.value;
        this.#selectText.textContent = selectedOption.label;

        this.#closeDropdown();

        this.#events.onSelectChange.call(this, this.#selectedValue);
    }

    #toggleDropdown() {
        const opened = this.#wrapper.classList.contains('opened');
        !opened ? this.#openDropdown() : this.#closeDropdown();
    }

    #openDropdown() {
        this.#buildDropdown();
        this.#wrapper.classList.toggle('opened', true);
        this.#wrapper.querySelector('.select-search')?.focus();

        this.#events.onSelectOpened.call(this);
    }

    #closeDropdown() {
        this.#wrapper.classList.toggle('opened', false);
        this.#wrapper.querySelector('.select-dropdown')?.remove();

        this.#events.onSelectClosed.call(this);
    }

    #calculateDropdownHeight () {
        const dropdown = this.#wrapper.querySelector('.select-dropdown');
        const search = this.#wrapper.querySelector('.select-search');
        const list = [...this.#wrapper.querySelectorAll('.select-list > *')].filter(li => li.offsetParent !== null);

        let totalHeight = 0;
        for (let i = 0; i < this.#settings.selectVisibleOptions && i < list.length; i++) {
            totalHeight += list[i].getBoundingClientRect().height + 1; // 1px for border
        }

        // Add the height of the search block to the total height calculation
        totalHeight += search ? search.getBoundingClientRect().height : 0;

        dropdown.style.height = totalHeight + 'px'
    }

    #handleSelectSearch(e) {
        e.preventDefault();

        const list = this.#wrapper.querySelector('.select-list');
        const searchTerm = e.target.value.toLowerCase();
        let hasVisibleOptions = false;

        // Remove existing "Not found" message if present
        const notFoundMessage = list.querySelector('.not-found');
        if (notFoundMessage) notFoundMessage.remove();

        // Loop through all options and manage visibility
        [...list.children].forEach(li => {
            const optionLabel = li.textContent.toLowerCase();
            const optionValue = li.dataset.value;
            const isMatch = optionLabel.includes(searchTerm) || optionValue == this.#settings.searchDefaultOption;

            li.style.display = isMatch ? 'block' : 'none';
            if (isMatch) hasVisibleOptions = true;
        });

        // If no options match the search term, display "Not found"
        if (!hasVisibleOptions) {
            const notFoundMessage = document.createElement('li');
            notFoundMessage.textContent = this.#settings.searchNotFoundText;
            notFoundMessage.classList.add('not-found');
            list.appendChild(notFoundMessage);
        }

        // Set custom height for dropdown
        this.#calculateDropdownHeight();
    }

    #handleListClick(e) {
        if (e.target.tagName === 'LI') {
            const optionValue = e.target.dataset.value;
            this.#selectOption(optionValue);
        }
    }

    #handleOutsideClick(e) {
        if (!this.#wrapper.contains(e.target)) {
            this.#closeDropdown();
        }
    }

    #handleEscape(e) {
        if (e.key === 'Escape') {
            this.#closeDropdown();
        }
    }

    #handleKeyboardNavigation(e) {
        const key = e.which || e.keyCode;
        const list = this.#wrapper.querySelector('.select-list');
        const activeElement = list.querySelector(':focus') || list.querySelector('.selected');

        if(![38, 40, 13].includes(key) || !activeElement) return;

        e.preventDefault();

        if (key === 38) { // Up arrow
            const targetElement = activeElement ? activeElement?.previousElementSibling : list.querySelector(':last-child');
            targetElement?.focus();
        } else if (key === 40) { // Down arrow
            const targetElement = activeElement ? activeElement?.nextElementSibling : list.querySelector(':first-child');
            targetElement?.focus();
        } else if (key === 13) { // Enter key
            const optionValue = activeElement.dataset.value;
            this.#selectOption(optionValue);
        }
    }
}

export default SwiftSelect;
