import * as React from "react";
import { cn } from "@/lib/utils";

const Navbar = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    className={cn("flex mx-auto items-center justify-between py-4", className)}
    {...props}
    ref={ref} />
));
Navbar.displayName = "Navbar";

const NavbarLeft = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-4 justify-start", className)}
    {...props}
    ref={ref} />
));
NavbarLeft.displayName = "NavbarLeft";

const NavbarRight = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-4 justify-end", className)}
    {...props}
    ref={ref} />
));
NavbarRight.displayName = "NavbarRight";

const NavbarCenter = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    className={cn("flex items-center gap-4 justify-center", className)}
    {...props}
    ref={ref} />
));
NavbarCenter.displayName = "NavbarCenter";

export { Navbar, NavbarLeft, NavbarRight, NavbarCenter };
