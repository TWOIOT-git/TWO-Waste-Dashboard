import React from 'react';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter } from 'react-router-dom';

import Application from '../';
import GenerateRoutes from '../../components/GenerateRoutes';
import { UserProvider } from '../../providers/UserProvider';

configure({ adapter: new Adapter() })

describe('<Application />', () => {
  let wrapper;

  let app = (
    <BrowserRouter>
      <UserProvider>
        <Application defaultScreenClass='xl' />
      </UserProvider>
    </BrowserRouter>
  );

  beforeEach(() => {
    // https://github.com/facebook/create-react-app/issues/967#issuecomment-256358738
    global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({});
      });

      return p;
    });

    wrapper = mount(app)
  })

  it('Have the <GenerateRoutes />', () => {
    expect(wrapper.find(GenerateRoutes).length).toBe(1)
  })
})