export function ValidateSpellPower(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;
  descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
    const spell = args[0];
    if (
      typeof spell === "object" &&
      spell !== null &&
      "power" in spell &&
      typeof spell.power === "number" &&
      spell.power < 0
    ) {
      throw new Error("Spell power cannot be negative");
    }

    return originalMethod.apply(this, args);
  };
}

export function Cache(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;
  const cache = new WeakMap<object, Map<string, unknown>>();

  descriptor.value = function (this: object, ...args: unknown[]): unknown {
    const key = JSON.stringify(args);
    let instanceCache = cache.get(this);

    if (instanceCache?.has(key)) {
      console.log("[CACHE HIT] " + String(propertyKey));
      return instanceCache.get(key);
    }

    console.log("[CACHE MISS] " + String(propertyKey));
    const result = originalMethod.apply(this, args);
    if (!instanceCache) {
      instanceCache = new Map<string, unknown>();
      cache.set(this, instanceCache);
    }
    instanceCache.set(key, result);
    return result;
  };
}