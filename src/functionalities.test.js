import ListDom from './mocks/dummyAddItem.js';
import trashDom from './mocks/dummyDeleteItem.js';
import checkedDom from './mocks/dummyRemoveChecked.js';
import Tasks from './functionalities.js';
import MockStorage from './mocks/dummystorage.js';

const task = {
  index: 1,
  complete: false,
  description: 'eat',
};

describe('should add item', () => {
  const list = ListDom.window.document.getElementById('list');
  Tasks.createElement(task, list);
  test('create one list Item', () => {
    expect(list.childElementCount).toBe(1);
  });

  test('should save one Item to local storage at a time', () => {
    const data = [];
    data.push(task);
    const storage = new MockStorage();
    storage.setItem('list', data);
    const result = storage.getItem('list');
    expect(result.length).toBe(1);
  });
});

describe('should remove Item', () => {
  test('should remove item from local storage', () => {
    const index = 0;
    const storage = new MockStorage();
    const data = [];
    data.push(task);
    storage.setItem('list', data);
    const arr = storage.getItem('list');
    Tasks.removeToLocalStorage(arr, index);
    expect(arr.length).toBe(0);
  });

  test('should delete Item form the browser', () => {
    const trash = trashDom.window.document.getElementById('trash');
    expect(Tasks.removeElementDom(trash)).toBeUndefined();
  });
});

describe('should remove all checked Items', () => {
  const checkedBox = checkedDom.window.document.getElementById('checkbox');
  const parent = checkedDom.window.document.getElementById('check-list');
  test('remove checked Item in the browser', () => {
    const result = Tasks.removeCheckeDom(checkedBox, parent);
    expect(result).toBeUndefined();
  });
});

test('remove all complete from localStorage', () => {
  const arr = [
    {
      index: 1,
      complete: false,
      description: 'sleep',
    },
    {
      index: 2,
      complete: true,
      description: 'sleep',
    },
    {
      index: 3,
      complete: true,
      description: 'run',
    }];
  expect(Tasks.removeCheckedInLocal(arr)).toEqual([{ index: 1, complete: false, description: 'sleep' }]);
});