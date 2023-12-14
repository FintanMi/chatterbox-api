import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from '../../contexts/CurrentUserContext';
import NavBar from "../NavBar";

test('renders NavBar', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );

    // screen.debug();
    const signInLink = screen.getByRole('link', { name: 'Login' });
    expect(signInLink).toBeInTheDocument();
});

test('renders link to the user profile for a logged in user', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileAvatar = await screen.findByText('Profile');
    expect(profileAvatar).toBeInTheDocument();
});

test('renders Login and Register buttons again on logout', async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('link', { name: 'Logout' });
    fireEvent.click(signOutLink);

    const loginLink = await screen.findByText('link', { name: 'Login' });
    const registerLink = await screen.findByText('link', { name: 'Register' });

    expect(loginLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
});