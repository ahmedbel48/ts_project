import type { NewWizard, Wizard } from "./types";
import type { Spell } from "./types";
import { ValidateSpellPower } from "./decorators";

class Repository<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

export class WizardRepository extends Repository<Wizard> {
  addNew(data: NewWizard): Wizard {
    const lastId = this.getAll().at(-1)?.id ?? 0;
    const wizard: Wizard = { ...data, id: lastId + 1 };
    this.add(wizard);
    return wizard;
  }

  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}

export class SpellRepository extends Repository<Spell> {
  @ValidateSpellPower
  override add(spell: Spell): void {
    super.add(spell);
  }
}
