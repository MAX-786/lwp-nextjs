import { render, screen, fireEvent, act } from "@testing-library/react";
import ChatPage from "../app/chats/page";
import { io } from "socket.io-client";

jest.mock("socket.io-client", () => {
    const mockSocket = {
        on: jest.fn(),
        emit: jest.fn(),
        disconnect: jest.fn(),
    };
    return {
        io: jest.fn(() => mockSocket),
    };
});

describe("ChatPage Component", () => {
    let mockSocket: any;

    beforeEach(() => {
        mockSocket = io();
        jest.clearAllMocks();
    });

    it("renders the chat page with the correct elements", () => {
        render(<ChatPage />);

        expect(screen.getByText(/Live Chat/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Type your message.../i)).toBeInTheDocument();
        expect(screen.getByText(/Send/i)).toBeInTheDocument();
    });

    it("connects to the socket and listens for messages", () => {
        render(<ChatPage />);

        expect(io).toHaveBeenCalled();
        expect(mockSocket.on).toHaveBeenCalledWith("message", expect.any(Function));
    });

    it("updates the message input value when typing", () => {
        render(<ChatPage />);

        const input = screen.getByPlaceholderText(/Type your message.../i);
        fireEvent.change(input, { target: { value: "Hello" } });

        expect(input).toHaveValue("Hello");
    });

    it("sends a message and clears the input when clicking the send button", () => {
        render(<ChatPage />);

        const input = screen.getByPlaceholderText(/Type your message.../i);
        const button = screen.getByText(/Send/i);

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.click(button);

        expect(mockSocket.emit).toHaveBeenCalledWith("user-message", { text: "Hello", id: expect.any(String) });
        expect(input).toHaveValue("");
    });

    it("adds a new message to the chat when a message is received", () => {
        render(<ChatPage />);

        const mockMessage = { text: "New message", id: "123" };

        act(() => {
            mockSocket.on.mock.calls[0][1](mockMessage); // Simulate receiving a message
        });

        expect(screen.getByText(/New message/i)).toBeInTheDocument();
    });

    it("disconnects from the socket on unmount", () => {
        const { unmount } = render(<ChatPage />);

        unmount();

        expect(mockSocket.disconnect).toHaveBeenCalled();
    });

    it("handles sending a message on Enter key press", () => {
        render(<ChatPage />);

        const input = screen.getByPlaceholderText(/Type your message.../i);

        fireEvent.change(input, { target: { value: "Hello" } });
        fireEvent.keyUp(input, { key: "Enter", shiftKey: false });

        expect(mockSocket.emit).toHaveBeenCalledWith("user-message", { text: "Hello", id: expect.any(String) });
        expect(input).toHaveValue("");
    });

    it("does not send a message if the input is empty", () => {
        render(<ChatPage />);

        const button = screen.getByText(/Send/i);

        fireEvent.click(button);

        expect(mockSocket.emit).not.toHaveBeenCalled();
    });
});
