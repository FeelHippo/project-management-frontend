## Project Management Frontend

An internal tool for managing projects.

## Getting Started

To run this application locally, first obtain copy of the `.env` file containing the secret environment variables. 

This project requires NodeJs version 21 and higher. I recommend installing `NVM` for that.

Second, run the development server:

```bash
nvm use 21
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is served through AWS Amplify, and is publicly accessible [here](https://main.d3bd2fu6kg05nw.amplifyapp.com/)

## Dependencies:

- Authentication and Session management:
  - SuperTokens frontend [SDK](https://supertokens.com/docs/quickstart/frontend-setup)
  - NextJs [Page Directory](https://supertokens.com/docs/quickstart/integrations/nextjs/pages-directory/about)
  - SuperTokens [Dashboard](https://supertokens.com/dashboard-saas/core-management/managed/cadda850f1de1b537ac69e91404b02a6df39f1aaad30c519862d09664cb1715b/public/development) (Please request credentials to me if necessary)
- State Management:
  - [TanStack Query](https://tanstack.com/query/latest)
- Design System:
  - [ShadCn](https://ui.shadcn.com/)

## Tradeoffs and UX decisions

- Layout:
    - Left Panel: Sidebar list of projects:
        - scrollable
        - Shows: name, description, status badge
        - ToolBar:
          - filter by text, case insensitive
          - filter by status
          - option to delete selected projects
        - Projects:
          - Click to select and display details
          - `up/down` to move selection
          - `Enter` opens/focuses detail
          - `/` focuses search
          - Empty + loading (taken care of by hydration) + error states (handled by mutations)
    - Detail view of selected project with inline editing:
      - Timeline Card:
        - shows meaningful information regarding the project status over time
          - the idea would be to expand this feature, though it would require a different data structure in the BE
      - Update Project Card:
        - Shows: project name, status, description, tags
        - Updates: name, description, tags, status (timestamps updated by Postgres in the BE)
          - calls to BE minimized by leveraging on TanStack Query ability to mutate date in place
          - same when it comes to errors, everything is handled in the dedicated mutations

## What to improve

The code is clean and adheres to NextJs and TanStack Query's best practices. The project is set up in a way, that any of these could be implemented very easily:

- Split-pane resizing: swap UI component with [this](https://github.com/lumpinif/shadcn-resizable-sidebar)
- “Recent projects” section in sidebar: projects are ordered `recent to first created`, but to display a dedicated section would require some UI effort, since the sidebar is already cramped with information and input components.
- Command palette (Cmd+K) to jump projects / actions: Nextjs and ShadCn do not support keyboard commands by default. To make it work, I leveraged on good old DOM manipulation, by selecting and modifying HTMLElements directly. [This](https://github.com/FeelHippo/project-management-frontend/blob/main/src/hooks/useKeyboard.tsx) is the result, and one of the most time consuming tasks in this project
- Offline-ish behavior (queue mutation / retry): this would be a very interesting challenge. The mutations persist some data already, in case of failure or outage, but the details section doesn't, and would fail upon navigating to a project.
- “Last saved at …” timestamp + subtle save indicator: this is what the timeline tries to achieve, though there is a lot of room for improvement