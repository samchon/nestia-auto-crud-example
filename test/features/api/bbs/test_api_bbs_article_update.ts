import { ArrayUtil, TestValidator } from "@nestia/e2e";
import typia from "typia";

import api from "@ORGANIZATION/PROJECT-api/lib/index";
import { IBbsArticle } from "@ORGANIZATION/PROJECT-api/lib/structures/IBbsArticle";

export const test_api_bbs_article_update = async (
    connection: api.IConnection,
): Promise<void> => {
    const inputs: IBbsArticle.IStore[] = ArrayUtil.repeat(4)(() =>
        typia.random<IBbsArticle.IStore>(),
    );
    let article: IBbsArticle = await api.functional.bbs.articles.create(
        connection,
        inputs[0],
    );
    for (const i of inputs.slice(1))
        article = await api.functional.bbs.articles.update(
            connection,
            article.id,
            i,
        );

    TestValidator.equals("inputs")(inputs)(article.snapshots);

    const read: IBbsArticle = await api.functional.bbs.articles.at(
        connection,
        article.id,
    );
    TestValidator.equals("read")(article)(read);
};
