import { createActionGroup, props } from "@ngrx/store";
import { Ciudad } from "./ciudad";

export const SIMPLE_ENTITY_FEATURE_KEY = 'ciudades';

export const actions = createActionGroup({
  source: SIMPLE_ENTITY_FEATURE_KEY,
  events: {

    addSimpleEntity: props<SimpleEntity>(),
  }
})

export const {
  addSimpleEntity
} = actions;
