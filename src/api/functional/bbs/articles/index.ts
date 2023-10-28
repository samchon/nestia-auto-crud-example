/**
 * @packageDocumentation
 * @module api.functional.bbs.articles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import type { IConnection, Primitive } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import type { IBbsArticle } from "../../../structures/IBbsArticle";
import { NestiaSimulator } from "../../../utils/NestiaSimulator";

/**
 * Read a record.
 * 
 * @param id Target record's id
 * @returns The record detailed
 * 
 * @controller BbsArticlesController.at
 * @path GET /bbs/articles/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
    connection: IConnection,
    id: string & Format<"uuid">,
): Promise<at.Output> {
    return !!connection.simulate
        ? at.simulate(
              connection,
              id,
          )
        : PlainFetcher.fetch(
              connection,
              {
                  ...at.METADATA,
                  path: at.path(id),
              } as const,
          );
}
export namespace at {
    export type Output = Primitive<IBbsArticle<IBbsArticle.ISnapshot>>;

    export const METADATA = {
        method: "GET",
        path: "/bbs/articles/:id",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (id: string & Format<"uuid">): string => {
        return `/bbs/articles/${encodeURIComponent(id ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<IBbsArticle<IBbsArticle.ISnapshot>> =>
        typia.random<Primitive<IBbsArticle<IBbsArticle.ISnapshot>>>(g);
    export const simulate = async (
        connection: IConnection,
        id: string & Format<"uuid">,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(id),
            contentType: "application/json",
        });
        assert.param("id")(() => typia.assert(id));
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}

/**
 * Write a new record.
 * 
 * @param input The input data
 * @returns Newly created record
 * 
 * @controller BbsArticlesController.create
 * @path POST /bbs/articles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function create(
    connection: IConnection,
    input: create.Input,
): Promise<create.Output> {
    return !!connection.simulate
        ? create.simulate(
              connection,
              input,
          )
        : PlainFetcher.fetch(
              {
                  ...connection,
                  headers: {
                      ...(connection.headers ?? {}),
                      "Content-Type": "application/json",
                  },
              },
              {
                  ...create.METADATA,
                  path: create.path(),
              } as const,
              input,
          );
}
export namespace create {
    export type Input = Primitive<IBbsArticle.IStore>;
    export type Output = Primitive<IBbsArticle<IBbsArticle.ISnapshot>>;

    export const METADATA = {
        method: "POST",
        path: "/bbs/articles",
        request: {
            type: "application/json",
            encrypted: false
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (): string => {
        return `/bbs/articles`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<IBbsArticle<IBbsArticle.ISnapshot>> =>
        typia.random<Primitive<IBbsArticle<IBbsArticle.ISnapshot>>>(g);
    export const simulate = async (
        connection: IConnection,
        input: create.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(),
            contentType: "application/json",
        });
        assert.body(() => typia.assert(input));
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}

/**
 * Update a record.
 * 
 * @param id Target record's id
 * @param input The input data for updating
 * @returns Updated record
 * 
 * @controller BbsArticlesController.update
 * @path PUT /bbs/articles/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function update(
    connection: IConnection,
    id: string & Format<"uuid">,
    input: update.Input,
): Promise<update.Output> {
    return !!connection.simulate
        ? update.simulate(
              connection,
              id,
              input,
          )
        : PlainFetcher.fetch(
              {
                  ...connection,
                  headers: {
                      ...(connection.headers ?? {}),
                      "Content-Type": "application/json",
                  },
              },
              {
                  ...update.METADATA,
                  path: update.path(id),
              } as const,
              input,
          );
}
export namespace update {
    export type Input = Primitive<IBbsArticle.IStore>;
    export type Output = Primitive<IBbsArticle<IBbsArticle.ISnapshot>>;

    export const METADATA = {
        method: "PUT",
        path: "/bbs/articles/:id",
        request: {
            type: "application/json",
            encrypted: false
        },
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (id: string & Format<"uuid">): string => {
        return `/bbs/articles/${encodeURIComponent(id ?? "null")}`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<IBbsArticle<IBbsArticle.ISnapshot>> =>
        typia.random<Primitive<IBbsArticle<IBbsArticle.ISnapshot>>>(g);
    export const simulate = async (
        connection: IConnection,
        id: string & Format<"uuid">,
        input: update.Input,
    ): Promise<Output> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(id),
            contentType: "application/json",
        });
        assert.param("id")(() => typia.assert(id));
        assert.body(() => typia.assert(input));
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}

/**
 * Erase a record.
 * 
 * @param id Target record's id
 * @returns Nothing
 * 
 * @controller BbsArticlesController.erase
 * @path DELETE /bbs/articles/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function erase(
    connection: IConnection,
    id: string & Format<"uuid">,
): Promise<void> {
    return !!connection.simulate
        ? erase.simulate(
              connection,
              id,
          )
        : PlainFetcher.fetch(
              connection,
              {
                  ...erase.METADATA,
                  path: erase.path(id),
              } as const,
          );
}
export namespace erase {

    export const METADATA = {
        method: "DELETE",
        path: "/bbs/articles/:id",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (id: string & Format<"uuid">): string => {
        return `/bbs/articles/${encodeURIComponent(id ?? "null")}`;
    }
    export const simulate = async (
        connection: IConnection,
        id: string & Format<"uuid">,
    ): Promise<void> => {
        const assert = NestiaSimulator.assert({
            method: METADATA.method,
            host: connection.host,
            path: path(id),
            contentType: "application/json",
        });
        assert.param("id")(() => typia.assert(id));
    }
}