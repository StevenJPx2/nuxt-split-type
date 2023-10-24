import type {
  ComponentPublicInstance,
  MaybeRef,
  MaybeRefOrGetter,
} from "#imports";
import type { Mutable } from "@vueuse/core";

type StringedCombination<
  T extends string[],
  Sep extends string = " ",
  All = T[number],
  Item = All,
> = Item extends string
  ? Item | `${Item}${Sep}${StringedCombination<[], Sep, Exclude<All, Item>>}`
  : never;

export const TypesValue = ["lines", "words", "chars"] as const;
export type TypesValue = Mutable<typeof TypesValue>;
export type TypesValueUnion = TypesValue[number];

export type TypesListString = StringedCombination<TypesValue, ",">;
export type TypesValueTuple =
  | [TypesValueUnion, TypesValueUnion, TypesValueUnion]
  | [TypesValueUnion, TypesValueUnion]
  | [TypesValueUnion];
export type TypeOptions = TypesListString | TypesValueTuple;

export type VueInstance = ComponentPublicInstance;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRef<T>;
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRefOrGetter<T>;
export type MaybeElement = HTMLElement | VueInstance | undefined | null;
