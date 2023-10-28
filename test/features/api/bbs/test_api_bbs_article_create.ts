import { TestValidator } from "@nestia/e2e";
import typia from "typia";

import api from "@ORGANIZATION/PROJECT-api/lib/index";
import { IBbsArticle } from "@ORGANIZATION/PROJECT-api/lib/structures/IBbsArticle";

export const test_api_bbs_article_create = async (
    connection: api.IConnection,
): Promise<void> => {
    const input: IBbsArticle.IStore = typia.random<IBbsArticle.IStore>();
    const article: IBbsArticle = await api.functional.bbs.articles.create(
        connection,
        input,
    );
    TestValidator.equals("input")(input)(article.snapshots[0]);

    const read: IBbsArticle = await api.functional.bbs.articles.at(
        connection,
        article.id,
    );
    TestValidator.equals("read")(article)(read);
};
