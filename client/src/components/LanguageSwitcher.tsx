import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleLanguage("fr")}>
          Français {i18n.language.startsWith("fr") && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleLanguage("en")}>
          English {i18n.language.startsWith("en") && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
