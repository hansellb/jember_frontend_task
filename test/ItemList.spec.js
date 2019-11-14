import { mount, shallowMount } from '@vue/test-utils'
import ItemList from '@/components/ItemList.vue'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';

// Add bootstrap-vue to vue to prevent "Unknown custom element" warnings (Vue warn) / errors (console.error)
Vue.use(BootstrapVue, {});

/**
 * Tests ItemList as a search results component
 */
describe('ItemList (type=searchResults)', () => {
  let wrapper;
  let listItems = [{title: 'ListItem title'}]
  let filter = 'listitem title'
  let type = 'searchResults'

  // Set up for each test
  beforeEach(() => {
    wrapper = mount(ItemList, {
      propsData: {
        list: listItems,
        listFilter: filter,
        type: type,
      }
    });
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  });

  it('should have one list item when prop "list" is an array with length 1', () => {
    expect(wrapper.findAll('button').length).toEqual(1);
  });

  it('should trigger "itemsSelected" event when clicking on a list item', () => {
    // Get the list item
    let listItem = wrapper.find('button');
    
    // Trigger the event by "clicking" the list item
    listItem.trigger('click');

    // If the event exists in emitted(), it was triggered
    expect(wrapper.emitted().itemSelected).toBeTruthy();
    
    // The event should have been triggered only once
    expect(wrapper.emitted().itemSelected.length).toEqual(1);
  });

  it('should have list items with a "title" property', () => {
    expect(typeof(wrapper.vm.list[0].title) !== 'undefined').toBeTruthy();
  });

  it('should send a list item when event "itemSelected" is triggered', () => {
    // Get the list item
    let listItem = wrapper.find('button');
    
    // Trigger the event by "clicking" the list item
    listItem.trigger('click');

    // Data sent when the event is triggered should be one of the elements in the "list" array
    expect(wrapper.emitted().itemSelected[0][0]).toEqual(wrapper.vm.list[0]);
  });
})

/**
 * Test suite for ItemList as a card list component
 */
describe('ItemList (type=cards)', () => {
  let wrapper;
  let listItems = [
    { title: 'First card item title' },
    { title: 'Second card' },
    { title: 'third list element' },
    { title: '4th item in the list' }
  ]
  let filter = 'item'
  let type = 'cards'

  // Set up for each test
  beforeEach(() => {
    wrapper = mount(ItemList, {
      propsData: {
        list: listItems,
        listFilter: filter,
        type: type,
      }
    });
  });

  it('should trigger "removeItem" event when clicking on a list item\'s remove button', () => {
    // Get the list item
    let listItemRemoveBtn = wrapper.find('button');
    
    // Trigger the event by "clicking" the list item
    listItemRemoveBtn.trigger('click');

    // If the event exists in emitted(), it was triggered
    //expect(wrapper.emitted().removeItem).toBeTruthy();
    
    // The event should have been triggered only once
    expect(wrapper.emitted().removeItem.length).toEqual(1);
  });

  it('should send a list item when event "removeItem" is triggered', () => {
    // Get the list item's remove button
    let listItemRemoveBtn = wrapper.find('button');
    
    // Trigger the event by "clicking" the button
    listItemRemoveBtn.trigger('click');

    // Data sent when the event is triggered should be one of the elements in the "list" array
    expect(wrapper.emitted().removeItem[0][0]).toEqual(wrapper.vm.list[0]);
  });

  it('should return a filtered array of list elements', () => {
    expect(ItemList.computed.filteredList.call(
      { list: listItems, listFilter: filter })).toEqual([
      listItems[0],
      listItems[3]
    ])
  });

  it('should show empty list when prop "list" is not passed', () => {
    wrapper = mount(ItemList, {
      propsData: {
        listFilter: filter,
        type: type,
      }
    });
    expect(wrapper.html()).toEqual('<div><div class="mt-5 d-flex flex-wrap"></div></div>')
  });
})