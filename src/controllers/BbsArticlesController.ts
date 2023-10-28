import typia from "typia";

import { BbsArticleProvider } from "../providers/BbsArticleProvider";

import { IBbsArticle } from "../api/structures/IBbsArticle";
import { AuthorizedCrudController } from "./crud/AuthorizedCrudController";

export class BbsArticlesController extends AuthorizedCrudController<
    null,
    IBbsArticle,
    IBbsArticle.IStore,
    IBbsArticle.IUpdate
>({
    path: "bbs/articles",
    authorize: async () => null,
    read: (_actor: null, id: string) => BbsArticleProvider.at(id),
    create: {
        assert: typia.createAssert<IBbsArticle.IStore>(),
        execute: (_actor: null, input: IBbsArticle.IStore) =>
            BbsArticleProvider.store(input),
    },
    update: {
        assert: typia.createAssert<IBbsArticle.IUpdate>(),
        execute: (_actor: null, id: string, input: IBbsArticle.IUpdate) =>
            BbsArticleProvider.update(id, input),
    },
    erase: (_actor: null, id: string) => BbsArticleProvider.erase(id),
}) {}
