import { SpellRepository, WizardRepository } from "./repository";
import { Cache } from "./decorators";
import type { House, SpellCastEvent, Wizard } from "./types";

class SpellCalculator {
  @Cache
  calculatePower(basePower: number, multiplier: number): number {
    console.log("Calculating...");
    return basePower * multiplier;
  }
}

const validHouses: readonly House[] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function isHouse(value: unknown): value is House {
  return typeof value === "string" && validHouses.some(h => h === value);
}

function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    isHouse(candidate.house) &&
    typeof candidate.level === "number" &&
    typeof candidate.active === "boolean"
  );
}

function handleSpellCast(event: SpellCastEvent): void {
  console.log(`Wizard ${event.wizardId} cast ${event.spellName}`);
}

handleSpellCast({
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus",
});

const wizardRepository = new WizardRepository();
const wizard = wizardRepository.addNew({
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
});

console.log(wizard);

wizardRepository.addNew({
  name: "Hermione Granger",
  house: "Gryffindor",
  level: 5,
  active: true,
});
wizardRepository.addNew({
  name: "Draco Malfoy",
  house: "Slytherin",
  level: 5,
  active: true,
});

console.log(wizardRepository.findByHouse("Gryffindor"));
console.log(wizardRepository.findByHouse("Slytherin"));

const spells = new SpellRepository();
spells.add({
  id: 102,
  name: "Protego",
  category: "defense",
  power: 50,
});
console.log("Protego ajouté");
console.log(spells.getAll());

try {
  spells.add({
    id: 103,
    name: "Invalid Spell",
    category: "attack",
    power: -10,
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    throw error;
  }
}

const spellCalculator = new SpellCalculator();
console.log(spellCalculator.calculatePower(10, 3));
console.log(spellCalculator.calculatePower(10, 3));
console.log(spellCalculator.calculatePower(5, 2));

const validData: unknown = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
};
const invalidData: unknown = {
  id: 2,
  name: "Viktor",
  house: "Durmstrang",
  level: 5,
  active: true,
};

console.log(isWizard(validData));
console.log(isWizard(invalidData));
