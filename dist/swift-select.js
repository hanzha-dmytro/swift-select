function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _wrapper = new WeakMap();
var _valuesWrapper = new WeakMap();
var _selected = new WeakMap();
var _options = new WeakMap();
var _elementToValueMap = new WeakMap();
var _valueToElementMap = new WeakMap();
var _settings = new WeakMap();
var _events = new WeakMap();
var _SwiftSelect_brand = new WeakSet();
var SwiftSelect = function () {
  function SwiftSelect(wrapper) {
    var _options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    _classCallCheck(this, SwiftSelect);
    _classPrivateMethodInitSpec(this, _SwiftSelect_brand);
    _classPrivateFieldInitSpec(this, _wrapper, null);
    _classPrivateFieldInitSpec(this, _valuesWrapper, null);
    _classPrivateFieldInitSpec(this, _selected, []);
    _classPrivateFieldInitSpec(this, _options, []);
    _classPrivateFieldInitSpec(this, _elementToValueMap, new WeakMap());
    _classPrivateFieldInitSpec(this, _valueToElementMap, new Map());
    _classPrivateFieldInitSpec(this, _settings, {
      multiple: false,
      searchable: false,
      placeholder: 'Select an option',
      withDefaultOption: false,
      selectVisibleOptions: 7,
      searchPlaceholder: 'Search...',
      searchNotFoundText: 'Not found',
      searchDefaultOption: null,
      disabled: false
    });
    _classPrivateFieldInitSpec(this, _events, {
      onSelectOpened: function onSelectOpened() {
        return null;
      },
      onSelectClosed: function onSelectClosed() {
        return null;
      },
      onSelectChange: function onSelectChange() {
        return null;
      }
    });
    if (!(wrapper instanceof HTMLElement)) {
      throw new Error("Wrapper must be an HTML element");
    }
    _classPrivateFieldSet(_wrapper, this, wrapper);
    _classPrivateFieldSet(_options, this, _options2);
    _classPrivateFieldSet(_settings, this, _objectSpread(_objectSpread({}, _classPrivateFieldGet(_settings, this)), settings));
    _classPrivateFieldSet(_events, this, _objectSpread(_objectSpread({}, _classPrivateFieldGet(_events, this)), events));
    _assertClassBrand(_SwiftSelect_brand, this, _buildSelect).call(this);
    _assertClassBrand(_SwiftSelect_brand, this, _attachEvents).call(this);
    return this;
  }
  return _createClass(SwiftSelect, [{
    key: "value",
    get: function get() {
      var _classPrivateFieldGet2;
      return !!_classPrivateFieldGet(_settings, this).multiple ? _classPrivateFieldGet(_selected, this) : (_classPrivateFieldGet2 = _classPrivateFieldGet(_selected, this)[0]) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : null;
    },
    set: function set(optionValue) {
      if (!optionValue) return;
      _assertClassBrand(_SwiftSelect_brand, this, _selectOption).call(this, optionValue, true);
    }
  }, {
    key: "options",
    get: function get() {
      return _classPrivateFieldGet(_options, this);
    },
    set: function set(options) {
      _classPrivateFieldSet(_options, this, options);
      _assertClassBrand(_SwiftSelect_brand, this, _closeDropdown).call(this);
      _assertClassBrand(_SwiftSelect_brand, this, _selectDefaultOption).call(this);
      _assertClassBrand(_SwiftSelect_brand, this, _toggleWrapperClasses).call(this);
    }
  }, {
    key: "settings",
    get: function get() {
      return _classPrivateFieldGet(_settings, this);
    },
    set: function set(settings) {
      _classPrivateFieldSet(_settings, this, _objectSpread(_objectSpread({}, _classPrivateFieldGet(_settings, this)), settings));
      _assertClassBrand(_SwiftSelect_brand, this, _closeDropdown).call(this);
      _assertClassBrand(_SwiftSelect_brand, this, _selectDefaultOption).call(this);
      _assertClassBrand(_SwiftSelect_brand, this, _toggleWrapperClasses).call(this);
    }
  }]);
}();
function _buildSelect() {
  _classPrivateFieldGet(_wrapper, this).classList.add('swift-select');
  _classPrivateFieldGet(_wrapper, this).setAttribute('role', 'listbox');
  _classPrivateFieldGet(_wrapper, this).setAttribute('aria-expanded', 'false');
  _classPrivateFieldSet(_valuesWrapper, this, document.createElement('div'));
  _classPrivateFieldGet(_valuesWrapper, this).classList.add('select-values');
  _classPrivateFieldGet(_valuesWrapper, this).setAttribute('aria-haspopup', 'true');
  _assertClassBrand(_SwiftSelect_brand, this, _buildSingleOptionElement).call(this, _classPrivateFieldGet(_settings, this).placeholder);
  _classPrivateFieldGet(_wrapper, this).appendChild(_classPrivateFieldGet(_valuesWrapper, this));
  _assertClassBrand(_SwiftSelect_brand, this, _selectDefaultOption).call(this);
  _assertClassBrand(_SwiftSelect_brand, this, _toggleWrapperClasses).call(this);
}
function _buildDropdown() {
  var _classPrivateFieldGet3;
  (_classPrivateFieldGet3 = _classPrivateFieldGet(_wrapper, this).querySelector('.select-dropdown')) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.remove();
  var dropdown = document.createElement('div');
  dropdown.classList.add('select-dropdown');
  if (!!_classPrivateFieldGet(_settings, this).searchable) {
    var searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = _classPrivateFieldGet(_settings, this).searchPlaceholder;
    searchInput.classList.add('select-search');
    dropdown.appendChild(searchInput);
    searchInput.addEventListener('input', _assertClassBrand(_SwiftSelect_brand, this, _handleSelectSearch).bind(this));
  }
  var list = document.createElement('ul');
  list.classList.add('select-list');
  dropdown.appendChild(list);
  _assertClassBrand(_SwiftSelect_brand, this, _buildOptions).call(this, list);
  _classPrivateFieldGet(_wrapper, this).appendChild(dropdown);
  _assertClassBrand(_SwiftSelect_brand, this, _calculateDropdownHeight).call(this);
}
function _buildOptions(dropdownList) {
  var _classPrivateFieldGet4,
    _this = this;
  dropdownList.innerHTML = '';
  _classPrivateFieldSet(_elementToValueMap, this, new WeakMap());
  _classPrivateFieldGet(_valueToElementMap, this).clear();
  (_classPrivateFieldGet4 = _classPrivateFieldGet(_options, this)) === null || _classPrivateFieldGet4 === void 0 || _classPrivateFieldGet4.forEach(function (option) {
    var li = document.createElement('li');
    li.classList.add('select-list-item');
    li.textContent = option.label;
    li.tabIndex = -1;
    if (_classPrivateFieldGet(_selected, _this).includes(option.value)) {
      li.classList.add('selected');
    }
    _classPrivateFieldGet(_elementToValueMap, _this).set(li, option.value);
    _classPrivateFieldGet(_valueToElementMap, _this).set(option.value, li);
    dropdownList.appendChild(li);
    li.addEventListener('click', _assertClassBrand(_SwiftSelect_brand, _this, _handleListClick).bind(_this));
  });
}
function _toggleWrapperClasses() {
  var _classPrivateFieldGet5;
  _classPrivateFieldGet(_wrapper, this).classList.toggle('disabled', !!_classPrivateFieldGet(_settings, this).disabled || !((_classPrivateFieldGet5 = _classPrivateFieldGet(_options, this)) !== null && _classPrivateFieldGet5 !== void 0 && _classPrivateFieldGet5.length));
}
function _attachEvents() {
  _classPrivateFieldGet(_valuesWrapper, this).addEventListener('click', _assertClassBrand(_SwiftSelect_brand, this, _handleDropdownClick).bind(this));
  _classPrivateFieldGet(_wrapper, this).addEventListener('keydown', _assertClassBrand(_SwiftSelect_brand, this, _handleKeyboardNavigation).bind(this));
  document.addEventListener('click', _assertClassBrand(_SwiftSelect_brand, this, _handleOutsideClick).bind(this));
}
function _selectDefaultOption() {
  var _classPrivateFieldGet6, _classPrivateFieldGet7;
  if (!((_classPrivateFieldGet6 = _classPrivateFieldGet(_options, this)) !== null && _classPrivateFieldGet6 !== void 0 && _classPrivateFieldGet6.length) || !_classPrivateFieldGet(_settings, this).withDefaultOption) return;
  var selectedValue = (_classPrivateFieldGet7 = _classPrivateFieldGet(_options, this)[0]) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.value;
  _assertClassBrand(_SwiftSelect_brand, this, _selectOption).call(this, selectedValue, true);
}
function _selectOption(optionValue) {
  var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!optionValue) return;
  if (!!_classPrivateFieldGet(_settings, this).multiple && _classPrivateFieldGet(_selected, this).includes(optionValue) && !forceUpdate) {
    var optionIndex = _classPrivateFieldGet(_selected, this).findIndex(function (value) {
      return value === optionValue;
    });
    _classPrivateFieldGet(_selected, this).splice(optionIndex, 1);
  } else {
    _classPrivateFieldSet(_selected, this, !!_classPrivateFieldGet(_settings, this).multiple ? _classPrivateFieldGet(_selected, this).concat(optionValue) : [optionValue]);
  }
  _assertClassBrand(_SwiftSelect_brand, this, _updateSelectedOption).call(this);
  _assertClassBrand(_SwiftSelect_brand, this, _closeDropdown).call(this);
  _classPrivateFieldGet(_events, this).onSelectChange.call(this, this.value);
}
function _updateSelectedOption() {
  var _this2 = this;
  var selectedOptions = _classPrivateFieldGet(_options, this).filter(function (option) {
    return _classPrivateFieldGet(_selected, _this2).includes(option.value);
  });
  _classPrivateFieldGet(_valuesWrapper, this).innerHTML = '';
  if (!selectedOptions.length) {
    _assertClassBrand(_SwiftSelect_brand, this, _buildSingleOptionElement).call(this, _classPrivateFieldGet(_settings, this).placeholder);
  } else if (!_classPrivateFieldGet(_settings, this).multiple) {
    _assertClassBrand(_SwiftSelect_brand, this, _buildSingleOptionElement).call(this, selectedOptions[0].label);
  } else {
    _assertClassBrand(_SwiftSelect_brand, this, _buildMultipleOptionElement).call(this, selectedOptions);
  }
}
function _buildSingleOptionElement() {
  var optionText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var selectText = document.createElement('span');
  selectText.classList.add('select-text');
  selectText.textContent = optionText;
  _classPrivateFieldGet(_valuesWrapper, this).appendChild(selectText);
}
function _buildMultipleOptionElement() {
  var _this3 = this;
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  options.forEach(function (option) {
    var selectTag = document.createElement('div');
    selectTag.classList.add('select-tag');
    var selectTagText = document.createElement('span');
    selectTagText.classList.add('select-tag-text');
    selectTagText.textContent = option.label;
    selectTag.appendChild(selectTagText);
    var selectTagButton = document.createElement('button');
    selectTagButton.role = 'button';
    selectTagButton.ariaLabel = 'button';
    selectTagButton.classList.add('select-tag-remove');
    selectTag.appendChild(selectTagButton);
    selectTagButton.addEventListener('click', function (event) {
      return _assertClassBrand(_SwiftSelect_brand, _this3, _handleRemoveButtonClick).call(_this3, event, option.value);
    });
    _classPrivateFieldGet(_valuesWrapper, _this3).appendChild(selectTag);
  });
}
function _openDropdown() {
  _assertClassBrand(_SwiftSelect_brand, this, _buildDropdown).call(this);
  _classPrivateFieldGet(_wrapper, this).classList.toggle('opened', true);
  _classPrivateFieldGet(_wrapper, this).setAttribute('aria-expanded', 'true');
  var focusElement = _classPrivateFieldGet(_wrapper, this).querySelector('.select-search') || _classPrivateFieldGet(_wrapper, this).querySelector('.select-list li.selected') || _classPrivateFieldGet(_wrapper, this).querySelector('.select-list li:first-child');
  focusElement === null || focusElement === void 0 || focusElement.focus();
  _classPrivateFieldGet(_events, this).onSelectOpened.call(this);
}
function _closeDropdown() {
  var _classPrivateFieldGet8;
  _classPrivateFieldGet(_wrapper, this).classList.toggle('opened', false);
  _classPrivateFieldGet(_wrapper, this).setAttribute('aria-expanded', 'false');
  (_classPrivateFieldGet8 = _classPrivateFieldGet(_wrapper, this).querySelector('.select-dropdown')) === null || _classPrivateFieldGet8 === void 0 || _classPrivateFieldGet8.remove();
  _classPrivateFieldGet(_events, this).onSelectClosed.call(this);
}
function _calculateDropdownHeight() {
  var totalHeight = 0;
  var dropdown = _classPrivateFieldGet(_wrapper, this).querySelector('.select-dropdown');
  var search = _classPrivateFieldGet(_wrapper, this).querySelector('.select-search');
  var listWrapper = _classPrivateFieldGet(_wrapper, this).querySelector('.select-list');
  var listLiItems = _toConsumableArray(listWrapper.querySelectorAll('li')).filter(function (li) {
    return li.offsetParent !== null;
  });
  var wrapperStyles = getComputedStyle(listWrapper);
  totalHeight += parseFloat(wrapperStyles.paddingTop);
  totalHeight += parseFloat(wrapperStyles.paddingBottom);
  for (var i = 0; i < _classPrivateFieldGet(_settings, this).selectVisibleOptions && i < listLiItems.length; i++) {
    totalHeight += listLiItems[i].getBoundingClientRect().height;
  }
  totalHeight += search ? search.getBoundingClientRect().height + 1 : 0;
  dropdown.style.height = totalHeight + 'px';
}
function _handleDropdownClick(e) {
  e.preventDefault();
  var opened = _classPrivateFieldGet(_wrapper, this).classList.contains('opened');
  !opened ? _assertClassBrand(_SwiftSelect_brand, this, _openDropdown).call(this) : _assertClassBrand(_SwiftSelect_brand, this, _closeDropdown).call(this);
}
function _handleSelectSearch(e) {
  var _this4 = this;
  e.preventDefault();
  e.stopPropagation();
  var list = _classPrivateFieldGet(_wrapper, this).querySelector('.select-list');
  var searchTerm = e.target.value.toLowerCase();
  var hasVisibleOptions = false;
  var notFoundMessage = list.querySelector('.not-found');
  if (notFoundMessage) notFoundMessage.remove();
  _toConsumableArray(list.children).forEach(function (li) {
    var optionLabel = li.textContent.toLowerCase();
    var defaultOption = _classPrivateFieldGet(_valueToElementMap, _this4).get(_classPrivateFieldGet(_settings, _this4).searchDefaultOption);
    var isMatch = optionLabel.includes(searchTerm) || li === defaultOption;
    li.style.display = isMatch ? 'block' : 'none';
    if (isMatch) hasVisibleOptions = true;
  });
  if (!hasVisibleOptions) {
    var _notFoundMessage = document.createElement('li');
    _notFoundMessage.textContent = _classPrivateFieldGet(_settings, this).searchNotFoundText;
    _notFoundMessage.classList.add('select-list-item', 'not-found');
    list.appendChild(_notFoundMessage);
  }
  _assertClassBrand(_SwiftSelect_brand, this, _calculateDropdownHeight).call(this);
}
function _handleListClick(e) {
  e.preventDefault();
  var selectedListItem = e.currentTarget;
  var selectedOption = _classPrivateFieldGet(_elementToValueMap, this).get(selectedListItem);
  _assertClassBrand(_SwiftSelect_brand, this, _selectOption).call(this, selectedOption);
}
function _handleOutsideClick(e) {
  e.preventDefault();
  if (!_classPrivateFieldGet(_wrapper, this).contains(e.target)) {
    _assertClassBrand(_SwiftSelect_brand, this, _closeDropdown).call(this);
  }
}
function _handleKeyboardNavigation(e) {
  var key = e.which || e.keyCode;
  var list = _classPrivateFieldGet(_wrapper, this).querySelector('.select-list');
  var activeElement = list.querySelector(':focus') || list.querySelector('.selected');
  if (![38, 40, 13, 'Escape'].includes(key)) return;
  e.preventDefault();
  switch (key) {
    case 38:
      var previousElement = (activeElement === null || activeElement === void 0 ? void 0 : activeElement.previousElementSibling) || list.lastChild;
      previousElement === null || previousElement === void 0 || previousElement.focus();
      break;
    case 40:
      var nextElement = (activeElement === null || activeElement === void 0 ? void 0 : activeElement.nextElementSibling) || list.firstChild;
      nextElement === null || nextElement === void 0 || nextElement.focus();
      break;
    case 13:
      if (document.activeElement !== activeElement) break;
      var selectedOption = _classPrivateFieldGet(_elementToValueMap, this).get(activeElement);
      _assertClassBrand(_SwiftSelect_brand, this, _selectOption).call(this, selectedOption);
      break;
    case 'Escape':
      _assertClassBrand(_SwiftSelect_brand, this, _closeDropdown).call(this);
      break;
  }
}
function _handleRemoveButtonClick(e, selectedValue) {
  e.preventDefault();
  e.stopPropagation();
  var optionIndex = _classPrivateFieldGet(_selected, this).findIndex(function (value) {
    return value === selectedValue;
  });
  _classPrivateFieldGet(_selected, this).splice(optionIndex, 1);
  var selectedListItem = _classPrivateFieldGet(_valueToElementMap, this).get(selectedValue);
  selectedListItem.classList.remove('selected');
  _assertClassBrand(_SwiftSelect_brand, this, _updateSelectedOption).call(this);
}
export default SwiftSelect;