import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConnectedEmail } from '../connected-email';

describe('ConnectedEmail', () => {
  it('renders the card title and description', () => {
    render(<ConnectedEmail />);
    
    expect(screen.getByText('Connected email')).toBeInTheDocument();
    expect(screen.getByText('Select one account as your account email.')).toBeInTheDocument();
  });

  it('displays the account email input', () => {
    render(<ConnectedEmail />);
    
    const emailInput = screen.getByDisplayValue('olivia@untitledui.com');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('readonly');
  });

  it('displays the alternative email label', () => {
    render(<ConnectedEmail />);
    
    expect(screen.getByText('An alternative email')).toBeInTheDocument();
  });

  it('has an input for alternative email', () => {
    render(<ConnectedEmail />);
    
    const altEmailInput = screen.getByPlaceholderText('billing@untitledui.com');
    expect(altEmailInput).toBeInTheDocument();
  });
});
