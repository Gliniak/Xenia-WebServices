import { TinyTypeOf } from 'tiny-types';

export default class LeaderboardStatId extends TinyTypeOf<string>() {
  public constructor(value: string | number) {
    if (typeof value == 'string') super(value);
    else super(`${value}`);
  }
}
