# About

This project documents the way I use [NgRx](https://ngrx.io/),
focusing on different aspects and providing examples.

To start using NgRx in your project, you may need to add at least the following library:

```
ng add @ngrx/store@latest
```

For starters, consider the following entity:

```typescript
export type SimpleEntity = {
  name: string;
  description: string;
};
```
