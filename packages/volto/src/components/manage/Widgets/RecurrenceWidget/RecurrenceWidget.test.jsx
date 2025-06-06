import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor } from '@testing-library/react';
import RecurrenceWidget from './RecurrenceWidget';

vi.mock('@plone/volto/helpers/Loadable/Loadable', async () => {
  return await import(
    '@plone/volto/helpers/Loadable/__mocks__/Loadable.vitest.jsx'
  );
});

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

const mockStore = configureStore();

test('renders a recurrence widget component with aligned columns', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <RecurrenceWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        value={'RRULE:FREQ=DAILY;UNTIL=20200324T000000'}
        formData={{
          start: '2020-03-11T15:00:00+00:00',
          end: '2020-04-07T16:00:00+00:00',
        }}
      />
    </Provider>,
  );
  await waitFor(() => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
