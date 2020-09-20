import React from 'react';
import { renderWithRouter } from 'test-library';
import TabPanel, { Tab } from '../index';

describe('Tab Panel', () => {
  it('tab panel render without error', () => {
    const { container } = renderWithRouter(
      <TabPanel testId="tabPanel">
        <Tab name="One" route="/one" />
        <Tab name="Two" route="/two" />
      </TabPanel>
    );
    expect(container).toMatchSnapshot();
  });
});
