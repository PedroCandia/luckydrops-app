import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders Lucky Blocks RL game title', () => {
  render(<App />);
  const title = screen.getByRole('heading', { name: /lucky blocks rl/i });
  expect(title).toBeInTheDocument();
});
