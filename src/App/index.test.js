import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import 'jest-localstorage-mock';
import { ToastContainer } from 'react-toastify';
import Tasks from '../../components/Tasks';

import App from './';

configure({ adapter: new Adapter() });

const result = shallow(<App />);

describe('Root container: ', () => {
    test('Should containe Tasks & ToastContainer', () => {
        expect(result.containsAllMatchingElements([
            <Tasks />,
            <ToastContainer />
        ])).toEqual(true);
    });
});