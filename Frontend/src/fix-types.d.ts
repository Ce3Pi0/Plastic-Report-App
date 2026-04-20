import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    placeholder?: any;
    onPointerEnterCapture?: any;
    onPointerLeaveCapture?: any;
  }
}
