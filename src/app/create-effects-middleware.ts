import {
  AnyAction,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { createMatcher, Matcher, MatcherConfig } from "action-matchers";

export type EffectConfig<
  DispatchExt = {},
  S = any,
  D extends Dispatch = Dispatch
> = [MatcherConfig, Middleware<DispatchExt, S, D>];

export function createEffectsMiddleware<
  TState = any,
  DispatchExt = {},
  D extends Dispatch = Dispatch
>(
  effects: EffectConfig<DispatchExt, TState, D>[]
): Middleware<DispatchExt, TState, D> {
  type TMiddleware = Middleware<DispatchExt, TState, D>;
  const preparedMatchingMiddleware: [Matcher, TMiddleware][] = effects.map(
    (effectConfig) => {
      const matcherConfig = effectConfig.slice(0, -1) as MatcherConfig[];
      const matcher: Matcher = createMatcher(matcherConfig);
      const middleware = effectConfig[effectConfig.length - 1] as TMiddleware;
      return [matcher, middleware];
    }
  );

  return (api: MiddlewareAPI<D, TState>) => {
    const matchingMiddlewareWithApi: [Matcher, ReturnType<TMiddleware>][] =
      preparedMatchingMiddleware.map(([matcher, middleware]) => [
        matcher,
        middleware(api),
      ]);
    return (next: Dispatch<AnyAction>) => {
      const matchingMiddlewareWithNext: [
        Matcher,
        ReturnType<ReturnType<TMiddleware>>
      ][] = matchingMiddlewareWithApi.map(([matcher, middleware]) => [
        matcher,
        middleware(next),
      ]);
      return (action: any) => {
        const [matchedCount, lastResult] = matchingMiddlewareWithNext.reduce(
          ([matchedCount, lastResult], [matcher, middleware]) => {
            if (matcher(action)) {
              const result = middleware(action);
              return [matchedCount + 1, result];
            }
            return [matchedCount, lastResult];
          },
          [0, undefined]
        );

        // In case no actions were matched we let action to another middleware
        if (matchedCount === 0) {
          return next(action);
        } else {
          return lastResult;
        }
      };
    };
  };
}
