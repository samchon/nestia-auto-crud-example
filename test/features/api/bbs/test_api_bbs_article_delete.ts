import { TestValidator } from "@nestia/e2e";
import typia from "typia";

import api from "@ORGANIZATION/PROJECT-api/lib/index";
import { IBbsArticle } from "@ORGANIZATION/PROJECT-api/lib/structures/IBbsArticle";

export const test_api_bbs_article_delete = async (
    connection: api.IConnection,
): Promise<void> => {
    const article: IBbsArticle = await api.functional.bbs.articles.create(
        connection,
        typia.random<IBbsArticle.IStore>(),
    );
    await api.functional.bbs.articles.at(connection, article.id);

    await api.functional.bbs.articles.erase(connection, article.id);
    await TestValidator.error("erase")(() =>
        api.functional.bbs.articles.at(connection, article.id),
    );
};
