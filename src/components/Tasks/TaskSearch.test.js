import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount } from 'enzyme';
import 'jest-localstorage-mock';

import TaskSearch from './TaskSearch';

configure({ adapter: new Adapter() });

const fetchData = jest.fn();

const searchText = 'Task 1';

const mutatedData  = {
    searchText: searchText
};

const result = mount(
    <TaskSearch fetchTasks = {fetchData} />
);

test('fetchTasks() вызывается один раз', () => {
    expect(fetchData.mock.calls.length).toBe(1);
});

test(`Поле поиска должно реагировать на изменени`, () => {
    result.find('input').simulate('change', {
        target: {
            value: searchText
        }
    });

    expect(result.state()).toEqual(mutatedData);
    expect(result.find('input').text()).toBe(searchText);
});
