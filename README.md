# ChatCraftAI

## Overview

ChatCraftAI is a real-time, AI-augmented messaging platform.

## User Flow

From a user's perspective, it should work like this:

### Sign Up & Sign In

*   New users register with email, password, display name, and optional avatar.
*   Registered users log in and land on their Conversations dashboard.

### Conversation Management

*   **1:1 Chat**: Click "New Chat," select another user by email or username to start a private conversation.
*   **Group Chats**: Managed exclusively by an Admin user. The Admin creates and configures all group conversations (sets title, invites users).
*   **Group Discovery**: All non-admin users can view and join existing groups from the dashboard without requiring an invitation.
*   **Dashboard** lists all conversations with:
    *   Title (or other user's name for 1:1 chats)
    *   Last message snippet
    *   Unread message count badge

### Real-Time Messaging

*   Enter a conversation: message feed auto-loads recent history and listens for new messages via WebSocket.
*   Typing indicators show when others are typing.
*   Presence: Avatars of currently online conversation members.

### AI-Powered Enhancements

*   **Inline Grammar Correction**: As you type, underlined errors appear; hover or press a shortcut to accept corrections.
*   **Quick-Reply Suggestions**: Click the "🤖" button to fetch 3–5 AI-generated reply options based on the last few messages. Click to send.
*   **Post-Chat Summaries**: If a conversation is inactive for 1 hour, an AI-generated summary and sentiment chart become available in the Analytics tab.

### Analytics & Insights

Within each conversation:

*   **Summary**: 2–3 sentence overview of the chat.
*   **Stats**: Total messages, word count, number of AI suggestions used.

## Setup

_Detailed setup instructions will be added here._

## Environment Variables

*   `DATABASE_URL`
*   `REDIS_URL`
*   `OPENAI_KEY`
*   `JWT_SECRET`

