import { theme } from "@nextui-org/react";
import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.optional(types.literal("Line"), "Line");

export const LineValue = types.model({
  values: types.array(types.number),
});

export const LineDefinition = types
  .compose(
    "LineDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      color: types.optional(types.string, theme.colors.primary.value),
    })
  )
  .actions((self) => ({
    setColor(color: string) {
      self.color = color;
    },
  }));

export const LineField = types
  .compose(
    "LineField",
    FieldBase,
    types.model({
      kind,
      definition: LineDefinition,
      values: types.optional(types.map(LineValue), {}),
    })
  )
  .views((self) => ({
    get current() {
      switch (self.definition.change) {
        case "EveryFrame":
        case "FrameChanges":
          return self.values.get(self.currentFrame);
        case "Singleton":
          return self.values.get("All");
      }
    },
  }));