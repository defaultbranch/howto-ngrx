import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

const adapter = createEntityAdapter<SimpleEntity>({ selectId: it => it.name });

export const SIMPLE_ENTITIES_REDUCER = createReducer(
  adapter.getInitialState(),
  on(actions.addSimpleEntity, (state: EntityState<SimpleEntity>, it: SimpleEntity): EntityState<SimpleEntity> => adapter.addOne(it, state)),
  // ... more `on()` reducers later
);

// selectors

const selectFeature = createFeatureSelector<EntityState<SimpleEntity>>(SIMPLE_ENTITIES_FEATURE_KEY);

const {
  selectAll,
} = adapter.getSelectors();

export const allEntities = createSelector(selectFeature, selectAll);

export const entity = (name: string) => createSelector(selectFeature, (feature) => feature.entities[name]);
