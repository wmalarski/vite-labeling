import {
  Button,
  Container,
  FormElement,
  Input,
  Radio,
  Row,
  Spacer,
  Text,
} from "@nextui-org/react";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectDefinition, SelectDefinitionOption } from "renderer/models";

type Props = {
  fieldDefinition: Instance<typeof SelectDefinition>;
};

export const SelectEditor = observer(
  ({ fieldDefinition }: Props): ReactElement => {
    const { t } = useTranslation("definition");

    const [newOption, setNewOption] = useState("");
    const isValid = !fieldDefinition.options
      .map((option) => option.text)
      .includes(newOption);

    const handleDefaultChange = (value: string | number) => {
      fieldDefinition.setDefault(value as string);
    };

    const handleInputChange = (event: ChangeEvent<FormElement>) => {
      setNewOption(event.target.value);
    };

    const handleInputKeyDown = (event: KeyboardEvent<FormElement>) => {
      if (event.key !== "Enter" || !isValid) return;

      fieldDefinition.pushOption({ text: newOption, size: 2 });
      setNewOption("");
    };

    const handleAddClick = () => {
      fieldDefinition.pushOption({ text: newOption, size: 2 });
      setNewOption("");
    };

    const handleRemoveClick =
      (option: Instance<typeof SelectDefinitionOption>) => () => {
        fieldDefinition.removeOption(option);
      };

    const handleSizeChange =
      (option: Instance<typeof SelectDefinitionOption>) =>
      (event: ChangeEvent<FormElement>) => {
        option.setSize(Number(event.target.value));
      };

    return (
      <Container gap={0}>
        <Row>
          <Text h4>{t("selectHeader")}</Text>
        </Row>
        <Spacer y={1} />
        <Row>
          <Radio.Group
            value={fieldDefinition.default}
            onChange={handleDefaultChange}
            css={{ width: "100%" }}
          >
            <Container gap={0}>
              {fieldDefinition.options.map((option) => (
                <Row key={option.text} justify="space-between">
                  <Radio value={option.text}>
                    <Text>{option.text}</Text>
                    <Spacer x={1} />
                    <Input
                      type="number"
                      min={1}
                      max={12}
                      step={1}
                      placeholder={t("selectSize")}
                      aria-label={t("selectSize")}
                      labelLeft={t("selectSize")}
                      value={String(option.size)}
                      onChange={handleSizeChange(option)}
                    />
                  </Radio>
                  <Button
                    auto
                    color="error"
                    onClick={handleRemoveClick(option)}
                    icon={<TrashIcon />}
                  >
                    {t("selectRemoveOption")}
                  </Button>
                </Row>
              ))}
            </Container>
          </Radio.Group>
        </Row>
        <Spacer y={1.5} />
        <Row>
          <Input
            fullWidth
            value={newOption}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={t("selectInput")}
            labelLeft={t("selectInput")}
            aria-label={t("selectInput")}
          />
          <Spacer x={1} />
          <Button
            auto
            onClick={handleAddClick}
            disabled={!isValid}
            icon={<PlusIcon />}
          >
            {t("selectAddOption")}
          </Button>
        </Row>
      </Container>
    );
  }
);
