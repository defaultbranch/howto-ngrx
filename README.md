# About

This project documents the way I prefer to use [NgRx](https://ngrx.io/),
focusing on different aspects and providing examples.


## Why NgRx, and Caveats

If you use plain RxJs today to pipe data through your application, you may want to switch to NgRx instead.

Primarily, NgRx puts a conceptual layer over the vast and complex [RxJs API](https://rxjs.dev/guide/overview).
While RxJs enables reactive programming on the technical level, NgRx casts a large portion of that into
high-level patterns and concepts.

So in total:

- less boiler-plate and less low-level code
- fewer technical details and
- more standardized code patterns

Main concepts NgRx addresses are:

- application state as a tree of immutable data
- storing and providing entity collections
- handling of asynchronous events and messages


### Caveats

So far I see two or three caveats, in descending order:

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


## Enable NgRx Store

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

With that, you get the NgRx store, where the application state will be kept.
So far nothing else was defined, so the store is empty (like an empty object `{}`),
there is nothing to query from it, and there is nothing to change it.


## Simple Entity Collection Example

For starters, consider the following entity `SimpleEntity`:

```typescript
export type SimpleEntity = {
  name: string;
  description: string;
};
```

In this example, we will define a collection `SimpleEntity[]` in the store,
and means to query and change the collection.

### Feature Key and Actions

As the store resembles a tree, **features** in NgRx refer to the top-level
entries of that tree. Our collection will be a top-level entry, and needs a
key string for identification:

```typescript
export const SIMPLE_ENTITIES_FEATURE_KEY = 'simple-entities';
```

Actions may serve two purposes – change the application state, and/or trigger side
effects – but always come in the same shape, consisting of an identifier and a property
list.

The following code defines the `addSimpleEntity` action:

```typescript
const actions = createActionGroup({
  source: SIMPLE_ENTITIES_FEATURE_KEY,
  events: {
    addSimpleEntity: props<SimpleEntity>(),
    // ... more (namespaced) actions later
  }
})

export const {
  addSimpleEntity,
  // ... more (public) actions later
} = actions;
```

Which by the way is equivalent to:

```typescript
// don't use this !!!
export const addSimpleEntity = createAction(
  `[${SIMPLE_ENTITIES_FEATURE_KEY}] addSimpleEntity`,
  props<SimpleEntity>()
);
```






# Rest

I usually prefer to use one feature for each entity collection in the store;
i.e., I have all entity collections as top-level entries in the store.

Nesting entities – the placement of entities not at the root level, but beneath
other parent entities as child entities – is technically possible, but I usually
try to avoid that. In technical terms, there is neither lazy- nor eager-loading
in my code, there is explicit lazy-loading
