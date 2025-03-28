interface IconProps {
  size: number;
  color?: string | undefined;
}

interface NavListsProps {
  name: string;
  path: string;
}

interface ButtonProps {
  btnType?: string;
  btnText?: string;
  path?: string;
  withIcon?: boolean;
  loadingState?: boolean;
  size: "sm" | "md" | "lg";
}

export type { IconProps, NavListsProps, ButtonProps };
