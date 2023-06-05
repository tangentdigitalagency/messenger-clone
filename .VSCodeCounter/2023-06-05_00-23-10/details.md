# Details

Date : 2023-06-05 00:23:10

Directory c:\\Users\\Owner\\messenger-app

Total : 52 files,  10433 codes, 17 comments, 327 blanks, all 10777 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.env](/.env) | Properties | 6 | 4 | 2 | 12 |
| [.eslintrc.json](/.eslintrc.json) | JSON with Comments | 3 | 0 | 1 | 4 |
| [README.md](/README.md) | Markdown | 21 | 0 | 14 | 35 |
| [app/(site)/components/AuthForm.tsx](/app/(site)/components/AuthForm.tsx) | TypeScript JSX | 175 | 2 | 23 | 200 |
| [app/(site)/components/AuthSocialButton.tsx](/app/(site)/components/AuthSocialButton.tsx) | TypeScript JSX | 14 | 0 | 3 | 17 |
| [app/(site)/page.tsx](/app/(site)/page.tsx) | TypeScript JSX | 24 | 0 | 6 | 30 |
| [app/actions/getConversations.ts](/app/actions/getConversations.ts) | TypeScript | 34 | 0 | 5 | 39 |
| [app/actions/getCurrentUser.ts](/app/actions/getCurrentUser.ts) | TypeScript | 23 | 0 | 10 | 33 |
| [app/actions/getSession.ts](/app/actions/getSession.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [app/actions/getUsers.ts](/app/actions/getUsers.ts) | TypeScript | 25 | 0 | 9 | 34 |
| [app/api/auth/[...nextauth]/route.ts](/app/api/auth/%5B...nextauth%5D/route.ts) | TypeScript | 57 | 0 | 11 | 68 |
| [app/api/conversations/components/ConversationBox.tsx](/app/api/conversations/components/ConversationBox.tsx) | TypeScript JSX | 57 | 0 | 18 | 75 |
| [app/api/conversations/route.ts](/app/api/conversations/route.ts) | TypeScript | 81 | 0 | 8 | 89 |
| [app/api/register/route.ts](/app/api/register/route.ts) | TypeScript | 29 | 0 | 9 | 38 |
| [app/components/Avatar.tsx](/app/components/Avatar.tsx) | TypeScript JSX | 17 | 0 | 6 | 23 |
| [app/components/Button.tsx](/app/components/Button.tsx) | TypeScript JSX | 48 | 0 | 3 | 51 |
| [app/components/EmptyState.tsx](/app/components/EmptyState.tsx) | TypeScript JSX | 10 | 0 | 1 | 11 |
| [app/components/inputs/Input.tsx](/app/components/inputs/Input.tsx) | TypeScript JSX | 67 | 0 | 4 | 71 |
| [app/components/sidebar/DesktopItem.tsx](/app/components/sidebar/DesktopItem.tsx) | TypeScript JSX | 48 | 0 | 4 | 52 |
| [app/components/sidebar/DesktopSidebar.tsx](/app/components/sidebar/DesktopSidebar.tsx) | TypeScript JSX | 37 | 3 | 15 | 55 |
| [app/components/sidebar/MobileFooter.tsx](/app/components/sidebar/MobileFooter.tsx) | TypeScript JSX | 25 | 0 | 8 | 33 |
| [app/components/sidebar/MobileItem.tsx](/app/components/sidebar/MobileItem.tsx) | TypeScript JSX | 27 | 0 | 9 | 36 |
| [app/components/sidebar/Sidebar.tsx](/app/components/sidebar/Sidebar.tsx) | TypeScript JSX | 16 | 0 | 6 | 22 |
| [app/context/AuthContext.tsx](/app/context/AuthContext.tsx) | TypeScript JSX | 12 | 0 | 3 | 15 |
| [app/context/ToasterContext.tsx](/app/context/ToasterContext.tsx) | TypeScript JSX | 11 | 0 | 6 | 17 |
| [app/conversations/components/ConversationList.tsx](/app/conversations/components/ConversationList.tsx) | TypeScript JSX | 41 | 0 | 11 | 52 |
| [app/conversations/layout.tsx](/app/conversations/layout.tsx) | TypeScript JSX | 18 | 1 | 3 | 22 |
| [app/conversations/page.tsx](/app/conversations/page.tsx) | TypeScript JSX | 13 | 0 | 5 | 18 |
| [app/globals.css](/app/globals.css) | CSS | 6 | 0 | 2 | 8 |
| [app/hooks/useConversation.ts](/app/hooks/useConversation.ts) | TypeScript | 17 | 0 | 8 | 25 |
| [app/hooks/useOtherUser.ts](/app/hooks/useOtherUser.ts) | TypeScript | 14 | 0 | 6 | 20 |
| [app/hooks/useRoutes.ts](/app/hooks/useRoutes.ts) | TypeScript | 32 | 0 | 5 | 37 |
| [app/layout.tsx](/app/layout.tsx) | TypeScript JSX | 25 | 0 | 5 | 30 |
| [app/libs/prismadb.ts](/app/libs/prismadb.ts) | TypeScript | 7 | 0 | 4 | 11 |
| [app/types/index.ts](/app/types/index.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [app/users/components/UserBox.tsx](/app/users/components/UserBox.tsx) | TypeScript JSX | 38 | 0 | 13 | 51 |
| [app/users/components/UserList.tsx](/app/users/components/UserList.tsx) | TypeScript JSX | 23 | 0 | 7 | 30 |
| [app/users/layout.tsx](/app/users/layout.tsx) | TypeScript JSX | 18 | 1 | 3 | 22 |
| [app/users/page.tsx](/app/users/page.tsx) | TypeScript JSX | 9 | 0 | 3 | 12 |
| [middleware.ts](/middleware.ts) | TypeScript | 11 | 0 | 4 | 15 |
| [next.config.js](/next.config.js) | JavaScript | 12 | 1 | 6 | 19 |
| [package-lock.json](/package-lock.json) | JSON | 8,503 | 0 | 1 | 8,504 |
| [package.json](/package.json) | JSON | 42 | 0 | 1 | 43 |
| [postcss.config.js](/postcss.config.js) | JavaScript | 6 | 0 | 1 | 7 |
| [prisma/schema.prisma](/prisma/schema.prisma) | Prisma | 62 | 2 | 16 | 80 |
| [public/images/avatar.png](/public/images/avatar.png) | Image | 23 | 0 | 1 | 24 |
| [public/images/bg-image.jpg](/public/images/bg-image.jpg) | Image | 244 | 0 | 31 | 275 |
| [public/images/logo.png](/public/images/logo.png) | Image | 344 | 0 | 1 | 345 |
| [public/next.svg](/public/next.svg) | XML | 1 | 0 | 0 | 1 |
| [public/vercel.svg](/public/vercel.svg) | XML | 1 | 0 | 0 | 1 |
| [tailwind.config.js](/tailwind.config.js) | JavaScript | 16 | 1 | 2 | 19 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 26 | 2 | 1 | 29 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)