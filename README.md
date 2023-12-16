# About

This project documents the way I use [NgRx](https://ngrx.io/),
focusing on different aspects and providing examples.

## Why NgRx, and Caveats

### Caveats

So far I see two or three caveats:

1. It's free and open source, the [documentation](https://ngrx.io/docs) seems to be well maintained,
   and the community on [Stack Overflow](https://stackoverflow.com/questions/tagged/ngrx) is usually
   helpful, and there are some active blogs on how to use it. But apparently the company behind still
   wants or needs some money from the users: Hence **their official documentation** is only very basic and
   **does not provide enterprise-ready recipies or current best practices**; you either have to invest
   more time to figure it out for yourself, or to book support or workshops from them.

2. It's locked to the latest Angular version at the time of development, so if you use NgRx in your
   project and a new Angular version comes out, **NgRx may prevent you from upgrading Angular** immediately.
   At the time being, you just have to wait a few days for NgRx to catch up. In case NgRx stops
   providing updates, your Angular-NgRx project may not be upgradable to coming versions of Angular.

3. Minor: Although being arround for a while already and being conceptually mature, there has still been
   considerable evolution on the API level in the last year; probably also due to the pace of changes of
   the underlying Angular and TypeScript. As a consequence, **recipies and best practices may continue to change**
   in the future, impeding on the code style consistency in long-term projects.


## Simple-Entity Example

For starters, consider the following entity:

```typescript
export type SimpleEntity = {
  name: string;
  description: string;
};
```

Have the `@ngrx/store` library added to your project:

```
npm install @ngrx/store --save
```

Configure you app to provide the store, through your Angular project's `app.config.ts`:

```
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    // ... and more providers
  ]
};

```
