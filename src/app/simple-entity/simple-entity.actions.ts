import { createActionGroup, props } from "@ngrx/store";
import { SimpleEntity } from "./simple-entity";

export const SIMPLE_ENTITIES_FEATURE_KEY = 'simple-entities';

export const actions = createActionGroup({
  source: SIMPLE_ENTITIES_FEATURE_KEY,
  events: {

    addSimpleEntity: props<SimpleEntity>(),
  }
})

export const {
  addSimpleEntity
} = actions;
