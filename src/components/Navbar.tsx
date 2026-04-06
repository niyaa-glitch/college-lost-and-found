import { Link, useLocation } from "react-router-dom";
import { Search, PlusCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">BackTrack</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/browse">
            <Button
              variant={isActive("/browse") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Browse</span>
            </Button>
          </Link>
          <Link to="/report">
            <Button
              variant={isActive("/report") ? "default" : "secondary"}
              size="sm"
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Report Item</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
