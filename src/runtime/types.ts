import { ComponentPublicInstance, MaybeRef, MaybeRefOrGetter } from "#imports";

type StringedCombination<
  T extends string[],
  Sep extends string = " ",
  All = T[number],
  Item = All,
> = Item extends string
  ? Item | `${Item}${Sep}${StringedCombination<[], Sep, Exclude<All, Item>>}`
  : never;

type TypesValue = ["lines", "words", "chars"];

type TypesListString = StringedCombination<TypesValue, ", ">;

export type TypeOptions = TypesListString;
export type VueInstance = ComponentPublicInstance;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRef<T>;
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRefOrGetter<T>;
export type MaybeElement = HTMLElement | VueInstance | undefined | null;
