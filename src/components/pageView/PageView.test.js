import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen} from '@testing-library/react';
import PageView from './PageView';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<PageView />, div);
	ReactDOM.unmountComponentAtNode(div);
});

test('call pageview compoennt with props', () => {
  render(<PageView name="/home" total={2} text="views" />)
  expect(screen.getByText('/home 2 views')).toBeInTheDocument()
})