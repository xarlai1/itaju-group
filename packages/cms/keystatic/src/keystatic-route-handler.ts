import { makeRouteHandler } from '@keystatic/next/route-handler';

import { keyStaticConfig } from './keystatic.config';

const handlers = makeRouteHandler({
  config: keyStaticConfig,
});

/**
 * @name keystaticRouteHandlers
 * @description Route handlers for keystatic. Enabled in production so the
 * /keystatic editor can authenticate and edit via Keystatic Cloud.
 */
export const keystaticRouteHandlers = {
  POST: handlers.POST,
  GET: handlers.GET,
};
