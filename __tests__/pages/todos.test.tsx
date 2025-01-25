import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TodosPage from '@/app/chats/page';
import { useAuth } from '@/context/AuthContext';

// Mock auth context
jest.mock('@/context/AuthContext');

// Mock API calls
jest.mock('axios');
import axios from 'axios';

const mockUser = { id: '1', email: 'test@example.com' };

describe('TodosPage', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  });

  it('renders todos page when authenticated', async () => {
    // Mock successful API response
    (axios.get as jest.Mock).mockResolvedValue({
      data: [{ _id: '1', text: 'Test Todo', completed: false }]
    });

    render(<TodosPage />);
    
    // Check if loading state appears
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
  });

  it('allows adding a new todo', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: { _id: '2', text: 'New Todo', completed: false }
    });

    render(<TodosPage />);
    
    const input = screen.getByPlaceholderText(/add a new todo/i);
    const button = screen.getByText(/add todo/i);

    // Add new todo
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/todos', { text: 'New Todo' });
    });
  });
});