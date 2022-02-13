import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, ShapeDefinitionBase } from "../base";
import { currentValue } from "../utils";

const kind = types.optional(types.literal("Rectangle"), "Rectangle");

export const RectangleValue = types.model("RectangleValue", {
  value: types.array(types.number),
});

export const RectangleDefinition = types.compose(
  "RectangleDefinition",
  ShapeDefinitionBase,
  types.model({
    kind,
    color: types.optional(types.string, theme.colors.primary.value),
  })
);

export const RectangleField = types
  .compose(
    "RectangleField",
    FieldBase,
    types.model({
      kind,
      definition: RectangleDefinition,
      values: types.optional(types.map(RectangleValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      return currentValue(self);
    },
  }));
