This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies and run the project

```bash
npm i 
# or
pnpm i
# and
npm run dev + npm run convex:dev
# or
yarn dev + yarn convex:dev
# or
pnpm dev + pnpm convex:dev
```
----

## About

A clone of the popular corporate messenger Slack, developed to learn and demonstrate modern web development best practices. 

This project includes features like real-time communication, reactions to messages, threads/replies system, editing/deleting messages, role-based access control, image uploads, invite system, user profiles, direct messages, and channel/workspace creation.

That was the basic functionality, next let's go through each section of the app in more detail.

----

## Architecture

The project was written on a modern Front-end architecture - FSD (Feature Sliced Design)

Read more about the architecture - [here](https://feature-sliced.design/docs/get-started/overview)

In a nutshell, the architecture is a file structure divided into layers (hereafter referred to as `LAYER`'s). Each `LAYER` has its own slice (hereinafter referred to as `SLICE`'s), and each `SLICE` has its own segments (hereinafter referred to as `SEGMENT`'s).

The architecture is presented in a hierarchical structure: **`app/pages/widgets/features/entities/shared`**

3 pillars of the architecture:

1) Each `LAYER` can only import from underlying `LAYER`'s. That is, from pages can't import anything from app, can't use in `entities` something from `widgets` / `features`, `shared` can't use anything "from above" at all. There are valid exceptions that are customized for the project, like redux state, some configs and such.

2) Every SLICE should have a public-api, from which only what is really needed is exported, and nothing more.

3) Also, you can't use `LAYER-in-LAYER`. The exceptions are `entities` (more on the types level) and `shared`. Shared doesn't really have much structure, basic `lib/api/types/config/ui` are welcome there. 

----

## Users
A user can authorize or register in several ways: Through 2 available providers: Google and GitHub, or through credentials provider. 

These providers can be used to log in to the application as well as to register, since the event itself is essentially the same.

You can also register an account using your email. There is no email confirmation here, as this is a training application.

When creating a workspace, the “Admin” role is automatically generated for the user. He can fully manage this workspace, and give or demote the “Admin” role to other users.

----

## Scripts

- `npm run dev - ` application launch in development mode
- `npm run build - ` building an application for production mode via webpack
- `npm run lint - ` runs ESlint rules compliance check
- `npm run lint:fix - ` fix all auto-fixable ESLint problems
- `npm run add:component` - adds component from shadcn-ui, for ex `npm run add:component button`
- `npm run convex:dev` - runs a local convex server for dev development and debugging.

----

## Technology Stack

The main infrastructure of the application is built on a modern framework for building fullstack applications, NextJS 14. 

A complete list of the entire technology stack is given below

- **[React 18.2](https://react.dev/learn)**
- **[NextJS 14](https://nextjs.org/docs/14)**
- **[Tailwind CSS](https://tailwindcss.com/docs/installation)**
- **[react-hook-form](https://react-hook-form.com/get-started)**
- **[shadcn-ui](https://ui.shadcn.com/docs)**
- **[zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)**
- **[Convex](https://docs.convex.dev/home)**

----


## Database & ORM system

For the project, I used Convex, a solution that provides a database and SDK to interact with it. 
This technology provides many out-of-the-box solutions, here are some of them: real-time communication with the database via WebSockets, which makes the process of receiving and sending data very simple and fast.

Convex has data caching which does not cause unnecessary re-rendering.

I like the idea very much - to build all CRUD operations on the basis of WebSockets and use hooks to get the necessary data.

----

## Environment

As mentioned above, the application is built on an architecture for Front-end applications - Feature Sliced Design. The advantage of any architecture is how modules (in our case layers) interact with each other, where to put a new component, module. There is also distribution of responsibility zones. Featured Sliced Design handles this perfectly. The application is easy to maintain and scale.

Server side, routing and SSR, SEO is handled using the framework for FullStack applications - Next JS. 

The application intelligently interacts modules with each other and maintains good code quality.

The `shared` layer, as always, contains useful and handy utilities that make it easy to work with the environment, or with libraries.

----

## Working with forms

There are not many forms in the application, but a very useful and cool utility has been created that makes it very easy to create and control forms without any labor. Also, it can be adapted to any kind of component, just follow the two examples that are written beforehand.

We are talking about [FormFactory](/src/shared/lib/components/form-factory/form-factory.tsx)

Combined with [FormFieldWrapper](/src/shared/lib/components/form-factory/form-field-wrapper.tsx), the result is a powerful tool for managing forms.

FormFactory was used for almost all forms in the application, so working with forms is a pleasure as they are very easy to maintain and extend.

Simple passing of the form schema and its components gave an amazing result.

----

## ENV Structure

```js
CONVEX_DEPLOYMENT= /* Convex deploy URL */

NEXT_PUBLIC_CONVEX_URL= /* Public convex URL */
```
----

## Disclaimer

This project is developed for educational purposes and is **not affiliated with, endorsed by, or associated with Slack Technologies, Inc.**