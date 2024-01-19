export type TRouteType = {
  path: string;
  element: React.ReactNode;
  children?: TRouteType[];
  errorElement?: React.ReactNode;
};
