import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, "../client/public/registry.json");
const OUTPUT_DIR = path.resolve(__dirname, "../client/public/r");
const COMPONENTS_DIR = path.resolve(__dirname, "../client/src/components/saaskit");

// Assurez-vous que le dossier de sortie existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function buildRegistry() {
  console.log("🚀 Building registry...");

  try {
    const registryData = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
    const items = registryData.items;

    for (const item of items) {
      console.log(`📦 Processing ${item.name}...`);

      // Convert kebab-case name to PascalCase file name
      // pricing-table -> PricingTable
      const pascalName = item.name
        .split("-")
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");

      const sourceFilePath = path.join(COMPONENTS_DIR, `${pascalName}.tsx`);
      
      if (!fs.existsSync(sourceFilePath)) {
        console.error(`❌ Source file not found: ${sourceFilePath}`);
        continue;
      }

      const content = fs.readFileSync(sourceFilePath, "utf-8");

      // Détecter les dépendances de base (simplifié)
      const dependencies = [];
      if (content.includes("lucide-react")) dependencies.push("lucide-react");
      if (content.includes("framer-motion")) dependencies.push("framer-motion");
      if (content.includes("react-i18next")) dependencies.push("react-i18next");
      if (content.includes("clsx") || content.includes("tailwind-merge")) {
         // Souvent déjà présent dans shadcn, mais on peut les lister
      }

      // Structure du fichier JSON individuel pour shadcn CLI
      const componentJson = {
        name: item.name,
        type: "registry:component",
        dependencies: dependencies,
        files: [
          {
            path: `components/saaskit/${item.name}.tsx`,
            content: content,
            type: "registry:component",
            target: `components/saaskit/${item.name}.tsx`
          }
        ],
        title: item.title,
        description: item.description,
        categories: item.categories
      };

      fs.writeFileSync(
        path.join(OUTPUT_DIR, `${item.name}.json`),
        JSON.stringify(componentJson, null, 2)
      );
    }

    console.log("✅ Registry build complete!");
  } catch (error) {
    console.error("💥 Error building registry:", error);
  }
}

buildRegistry();
