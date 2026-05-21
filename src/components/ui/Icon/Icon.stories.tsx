
import Icon from "./Icon";
import { iconRegistry } from "./Icon.registry";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "stylesync",
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(iconRegistry),
    },
    size: {
      control: "number",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "close",
    size: 24,
  },
};

export const Large: Story = {
  args: {
    name: "search",
    size: 48,
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-8">
      {Object.keys(iconRegistry).map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <Icon name={icon as keyof typeof iconRegistry} size={28} />

          <span className="text-sm">{icon}</span>
        </div>
      ))}
    </div>
  ),
};
