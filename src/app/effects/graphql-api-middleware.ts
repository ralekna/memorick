import { gql, request } from 'graphql-request';
import { createEffectsMiddleware } from "../create-effects-middleware";

export function createGraphQLMiddleware<TState = any>(endpoint: string) {
  return createEffectsMiddleware<TState>([
    [(action: any) => action.meta?.gql, ({dispatch}) => (next) => async (action) => {
      console.log(`Handling GQL action`, action);
      dispatch({
        type: `${action.type}_LOADING`
      });
      try {
        console.log(`Executing GQL`, action.payload.query, action.payload.variables);
        
        let result = await request(endpoint, action.payload.query, action.payload.variables);
        console.log('GQL result:', result);
        dispatch({
          type: `${action.type}_SUCCESS`,
          payload: result
        });
      } catch(error) {
        console.error(`Error while trying to execute GQL query`, error);
        dispatch({
          type: `${action.type}_FAILED`,
          error
        });
      } finally {
        dispatch({
          type: `${action.type}_COMPLETED`,
        });
      }
    }]
  ])
}