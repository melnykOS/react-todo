import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';
import 'jest-localstorage-mock';

import TaskSearch from './TaskSearch';

configure({ adapter: new Adapter() });

const fetchData = jest.fn();

const searchText = 'Task 1';

const state  = {
    searchText: ''
};

const mutatedState  = {
    searchText: searchText
};

const result = mount(
    <TaskSearch fetchTasks = {fetchData} />
);

test('fetchTasks() should run once', () => {
    expect(fetchData.mock.calls.length).toBe(1);
});

test(`input value should response to value change`, () => {
    result.find('input').simulate('change', {
        target: {
            value: searchText
        }
    });

    expect(result.state()).toEqual(mutatedState);
    expect(result.find('input').instance().value).toBe(searchText);
});

test(`input value should response to state change`, () => {
    result.setState(() => ({
        searchText: searchText
    }));
    
    expect(result.state()).toEqual(mutatedState);
    expect(result.find('input').instance().value).toBe(searchText);
    
    result.setState(() => ({
        searchText: ''
    }));
    
    expect(result.state()).toEqual(state);
    expect(result.find('input').instance().value).toBe('');        
});
