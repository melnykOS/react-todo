import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import 'jest-localstorage-mock';

import App from './';

configure({ adapter: new Adapter() });

const result = shallow(<App />);

describe('Главный контейнер: ', () => {
    test('Должен содержать компонент ToastContainer', () => {
        expect(result.find('ToastContainer').length).toBe(1);
    });
});