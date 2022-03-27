import { ComponentMeta, ComponentStory } from "@storybook/react";
import { types } from "mobx-state-tree";
import { ComponentProps } from "react";
import { NumberDefinition, NumberField } from "renderer/models";
import { CurrentFrame } from "renderer/models/project/CurrentFrame";
import { PropsWithTestWrapper, TestWrapper } from "renderer/tests/Wrapper";
import { NumberForm } from "./NumberForm";

export default {
  title:
    "pages/Workspace/WorkspaceLayout/ItemsList/ItemsListItem/FieldListItem/NumberForm",
  component: NumberForm,
} as ComponentMeta<typeof NumberForm>;

type Props = ComponentProps<typeof NumberForm>;

const NumberFormStory = ({
  wrapperProps,
  ...props
}: PropsWithTestWrapper<Props>) => {
  return (
    <TestWrapper {...wrapperProps}>
      <NumberForm {...props} />
    </TestWrapper>
  );
};

const Template: ComponentStory<typeof NumberFormStory> = NumberFormStory;

const Model = types.model({
  definition: NumberDefinition,
  field: NumberField,
  currentFrame: CurrentFrame,
});

const instance = Model.create({
  currentFrame: { id: "id" },
  definition: {
    name: "Number",
    id: "id",
    kind: "Number",
  },
  field: {
    currentFrame: "id",
    definition: "id",
    id: "1",
    kind: "Number",
    values: { "0": { value: 1 } },
  },
});

export const Playground = Template.bind({});
Playground.args = { wrapperProps: {}, field: instance.field };
