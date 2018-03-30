import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

import TasksWrapper from './TasksWrapper';

configure({ adapter: new Adapter() });

const fetchData = jest.fn();

const completedAll = true;

const state = {
    completedAll: false,
}

const mutatedState  = {
    completedAll: completedAll
};

const result = mount(
    <TasksWrapper />
);

test(`Should have 1 Checkbox element`, () => {
    expect(result.find('checkbox')).toHaveLength(1);
});

test(`allCompleted value should response to state change`, () => {
    result.setState(() => ({
        completedAll: completedAll
    }));
    
    expect(result.find('Checkbox').props('checked')).toEqual(completedAll);

});
