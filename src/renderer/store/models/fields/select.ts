import { types } from "mobx-state-tree";
import { FieldBase, FieldDescriptionBase } from "../base";

const kind = types.literal("Select");

export const SelectValue = types.model("SelectValue", {
  value: types.string,
});

export const SelectDefinition = types
  .compose(
    "SelectDefinition",
    FieldDescriptionBase,
    types.model({
      kind,
      default: types.string,
      options: types.array(
        types.model({
          text: types.string,
          size: types.number,
        })
      ),
    })
  )
  .actions((self) => ({
    setDefault(defaultValue: string) {
      self.default = defaultValue;
    },
  }));

export const SelectField = types
  .compose(
    "SelectField",
    FieldBase,
    types.model({
      kind,
      definition: SelectDefinition,
      values: types.map(SelectValue),
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
