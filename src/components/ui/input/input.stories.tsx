import { CircleAlert, Search } from "lucide-react";

import { Input } from "./Input";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "이메일 주소 (EMAIL ADDRESS)",
    placeholder: "example@stylesync.com",
    variant: "default",
  },
  argTypes: {
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    fieldClassName: { control: false },
  },
  parameters: {
    backgrounds: { default: "stylesync" },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    className: "w-[320px]",
  },
};

export const Error: Story = {
  args: {
    className: "w-[320px]",
    label: "비밀번호 확인 (CONFIRM PASSWORD)",
    placeholder: "********",
    variant: "error",
    helperText: "로그인·회원가입·비번·음악검색 (4개)",
    trailingIcon: <CircleAlert size={18} />,
  },
};

export const SearchBar: Story = {
  args: {
    className: "w-[640px]",
    variant: "search",
    placeholder: "Frank Ocean",
    leadingIcon: <Search size={18} />,
    label: undefined,
  },
};

export const AuthExamples: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-6">
      <Input label="이메일 주소 (EMAIL ADDRESS)" placeholder="curator@stylesync.com" />
      <Input label="닉네임 (NICKNAME)" placeholder="@username" />
      <Input label="비밀번호 (PASSWORD)" placeholder="********" type="password" />
      <Input
        label="비밀번호 확인 (CONFIRM PASSWORD)"
        placeholder="********"
        type="password"
        variant="error"
        helperText="비밀번호가 일치하지 않아요."
      />
    </div>
  ),
};
