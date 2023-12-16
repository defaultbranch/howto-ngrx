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

```typescript
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


## Enable NgRx Entities

Have the `@ngrx/entity` library added to your project:

```
npm install @ngrx/entity --save
```

This changes nothing in your application yet, it only provides the
NgRx framework code to handle entity collections.


## Simple Entity Collection Example

Consider the following `SimpleEntity`:

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

Which by the way would be equivalent to:

```typescript
// don't use this !!!
export const addSimpleEntity = createAction(
  `[${SIMPLE_ENTITIES_FEATURE_KEY}] addSimpleEntity`,
  props<SimpleEntity>()
);
```

What this does:

- define a `SIMPLE_ENTITIES_FEATURE_KEY` string value, to distinguish this NgRx feature from other NgRx features
    - here, this will serve as the first part of the action identifier
    - later, this will serve as top-level identifier of the collection in the NgRx store (used by the NgRx reducer in the next section)
- define a `addSimpleEntity` action
    - note: using `createActionGroup`, we create a namespaced `action.createActionGroup` before
        - those actions that are to be triggered by external code may be exported outside of `actions`, for easier use
        - those actions that are used internally to chain up events can remain scoped in `actions`, without public export
    - note: as you see, the NgRx API uses the terms `action` and `event` interchangeably
- only for very simple code, `createAction` may be an option; in allmost all real-world cases, or as soon as you have more than one
  action, `createActionGroup` is more concise


### Feature State, Reducer and Selectors

For a `SimpleEntity[]` collection with `SimpleEntity.name` as unique identifer,
an NgRx `EntityAdapter` provides all standard methods.

```typescript
const adapter = createEntityAdapter<SimpleEntity>({ selectId: it => it.name });
```

This provides use with methods like `adapter.getInitialState()`, `adapter.addOne()`, `adapter.selectAll()`, and more.

This `adapter` helps in writing the reducer that defines the state initialization and transition:

```typescript
export const SIMPLE_ENTITIES_REDUCER = createReducer(
  adapter.getInitialState(),
  on(actions.addSimpleEntity, (state: EntityState<SimpleEntity>, it: SimpleEntity): EntityState<SimpleEntity> => adapter.addOne(it, state)),
  // ... more `on()` reducers later
);
```

To make the reducer active for a particular feature, we need to add it as a provider:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideState({ name: SIMPLE_ENTITIES_FEATURE_KEY, reducer: SIMPLE_ENTITIES_REDUCER }),
    // ... and more providers
  ]
};
```

Here, `SIMPLE_ENTITIES_FEATURE_KEY` denotes the top level entry in the NgRx store, and `SIMPLE_ENTITIES_REDUCER`
defines how this entry is first initialized and then updated by actions.

Finally, define selectors to query the state:

```typescript
const selectFeature = createFeatureSelector<EntityState<SimpleEntity>>(SIMPLE_ENTITIES_FEATURE_KEY);

const {
  selectAll,
} = adapter.getSelectors();

export const allEntities = createSelector(selectFeature, selectAll);
```



# Rest

I usually prefer to use one feature for each entity collection in the store;
i.e., I have all entity collections as top-level entries in the store.

Nesting entities – the placement of entities not at the root level, but beneath
other parent entities as child entities – is technically possible, but I usually
try to avoid that. In technical terms, there is neither lazy- nor eager-loading
in my code, there is explicit lazy-loading
