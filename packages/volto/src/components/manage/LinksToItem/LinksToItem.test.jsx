import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import { __test__ as LinksToItem } from './LinksToItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));
vi.mock('../Toolbar/More', () => ({
  default: vi.fn(() => <div className="More" />),
}));
describe('LinksToItem', () => {
  it('renders "links and references" view', () => {
    const store = mockStore({
      actions: {
        actions: {
          document_actions: [],
          object: [
            {
              icon: '',
              id: 'edit',
              title: 'Edit',
            },
          ],
        },
      },
      relations: {
        subrequests: {
          '/page-1': {
            data: {
              isReferencing: {
                items: [
                  {
                    source: {
                      '@id': 'http://localhost:3000/page-basil',
                      '@type': 'Document',
                      UID: 'SOMEUID008',
                      description: '',
                      review_state: 'published',
                      title: 'Basil',
                      type_title: 'Document',
                    },
                    target: {
                      '@id': 'http://localhost:3000/page-tomato',
                      '@type': 'Document',
                      UID: 'SOMEUID007',
                      description: '',
                      review_state: 'published',
                      title: 'Tomato',
                      type_title: 'Document',
                    },
                  },
                ],
                items_total: 1,
              },
              relatedItems: {
                items: [
                  {
                    source: {
                      '@id': 'http://localhost:3000/page-cucumber',
                      '@type': 'Document',
                      UID: 'SOMEUID008',
                      description: '',
                      review_state: 'published',
                      title: 'Cucumber',
                      type_title: 'Document',
                    },
                    target: {
                      '@id': 'http://localhost:3000/page-tomato',
                      '@type': 'Document',
                      UID: 'SOMEUID007',
                      description: '',
                      review_state: 'published',
                      title: 'Tomato',
                      type_title: 'Document',
                    },
                  },
                ],
                items_total: 1,
              },
            },
          },
        },
      },
      content: {
        data: {
          UID: 'SOMEUID007',
          title: 'page #1',
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LinksToItem location={{ pathname: '/page-1/links-to-item' }} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
