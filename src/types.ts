export type House = "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff";

export interface Wizard {
  id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

export interface Spell {
  id: number;
  name: string;
  category: string;
  power: number;
}

export type NewWizard = Omit<Wizard, "id">;

export type AcademyEvent =
  | { type: "spell-cast"; wizardId: number; spellName: string }
  | { type: "level-up"; wizardId: number; newLevel: number }
  | { type: "wizard-expelled"; wizardId: number };

export type SpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;
