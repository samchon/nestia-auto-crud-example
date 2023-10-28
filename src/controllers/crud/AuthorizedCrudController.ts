import fastify from "@modules/fastify";
import nest from "@modules/nestjs";
import core from "@nestia/core";
import { tags } from "typia";

export function AuthorizedCrudController<Actor, Read, Create, Update>(
    props: AuthorizedCrudController.IProps<Actor, Read, Create, Update>,
) {
    @nest.Controller(props.path)
    class AuthorizedCrudController {
        /**
         * Read a record.
         *
         * @param request Request info for authorization.
         * @param id Target record's id
         * @returns The record detailed
         */
        @nest.Get(":id")
        public async at(
            @nest.Request() request: fastify.FastifyRequest,
            @core.TypedParam("id") id: string & tags.Format<"uuid">,
        ): Promise<Read> {
            const actor: Actor = await props.authorize(request);
            return props.read(actor, id);
        }

        /**
         * Write a new record.
         *
         * @param request Request info for authorization.
         * @param input The input data
         * @returns Newly created record
         */
        @nest.Post()
        public async create(
            @nest.Request() request: fastify.FastifyRequest,
            @core.TypedBody({
                type: "assert",
                assert: props.create.assert,
            })
            input: Create,
        ): Promise<Read> {
            const actor: Actor = await props.authorize(request);
            return props.create.execute(actor, input);
        }

        /**
         * Update a record.
         *
         * @param request Request info for authorization.
         * @param id Target record's id
         * @param input The input data for updating
         * @returns Updated record
         */
        @nest.Put(":id")
        public async update(
            @nest.Request() request: fastify.FastifyRequest,
            @core.TypedParam("id") id: string & tags.Format<"uuid">,
            @core.TypedBody({
                type: "assert",
                assert: props.update.assert,
            })
            input: Update,
        ): Promise<Read> {
            const actor: Actor = await props.authorize(request);
            return props.update.execute(actor, id, input);
        }

        /**
         * Erase a record.
         *
         * @param request Request info for authorization.
         * @param id Target record's id
         * @returns Nothing
         */
        @nest.Delete(":id")
        public async erase(
            @nest.Request() request: fastify.FastifyRequest,
            @core.TypedParam("id") id: string & tags.Format<"uuid">,
        ): Promise<void> {
            const actor: Actor = await props.authorize(request);
            return props.erase(actor, id);
        }
    }
    return AuthorizedCrudController;
}
export namespace AuthorizedCrudController {
    export interface IProps<Actor, Read, Create, Update> {
        path: string;
        authorize: (request: fastify.FastifyRequest) => Promise<Actor>;
        create: {
            assert: (input: Create) => Create;
            execute: (actor: Actor, input: Create) => Promise<Read>;
        };
        read: (actor: Actor, id: string) => Promise<Read>;
        update: {
            assert: (input: Update) => Update;
            execute: (actor: Actor, id: string, input: Update) => Promise<Read>;
        };
        erase: (actor: Actor, id: string) => Promise<void>;
    }
}
