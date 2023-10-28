import { Prisma } from "@prisma/client";
import { v4 } from "uuid";

import { IBbsArticle } from "@ORGANIZATION/PROJECT-api/lib/structures/IBbsArticle";

import { MyGlobal } from "../MyGlobal";
import { BbsArticleSnapshotProvider } from "./BbsArticleSnapshotProvider";

export namespace BbsArticleProvider {
    export namespace json {
        export const transform = (
            input: Prisma.bbs_articlesGetPayload<ReturnType<typeof select>>,
        ): IBbsArticle => ({
            id: input.id,
            snapshots: input.snapshots
                .sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
                .map(BbsArticleSnapshotProvider.json.transform),
            created_at: input.created_at.toISOString(),
        });

        export const select = () =>
            Prisma.validator<Prisma.bbs_articlesFindManyArgs>()({
                include: {
                    snapshots: BbsArticleSnapshotProvider.json.select(),
                } as const,
            });
    }

    export const at = async (id: string): Promise<IBbsArticle> => {
        const article = await MyGlobal.prisma.bbs_articles.findFirstOrThrow({
            where: { id },
            ...json.select(),
        });
        return json.transform(article);
    };

    export const store = async (
        input: IBbsArticle.IStore,
    ): Promise<IBbsArticle> => {
        const article = await MyGlobal.prisma.bbs_articles.create({
            data: collect(input),
            ...json.select(),
        });
        return json.transform(article);
    };

    export const update = async (
        id: string,
        input: IBbsArticle.IUpdate,
    ): Promise<IBbsArticle> => {
        const article = await at(id);
        const snapshot = await MyGlobal.prisma.bbs_article_snapshots.create({
            data: {
                ...BbsArticleSnapshotProvider.collect(input),
                article: { connect: { id: article.id } },
            },
            ...BbsArticleSnapshotProvider.json.select(),
        });
        return {
            ...article,
            snapshots: [
                ...article.snapshots,
                BbsArticleSnapshotProvider.json.transform(snapshot),
            ],
        };
    };

    export const erase = async (id: string): Promise<void> => {
        await MyGlobal.prisma.bbs_articles.delete({
            where: { id },
        });
    };

    const collect = (input: IBbsArticle.IStore) => {
        const snapshot = BbsArticleSnapshotProvider.collect(input);
        return Prisma.validator<Prisma.bbs_articlesCreateInput>()({
            id: v4(),
            snapshots: {
                create: [snapshot],
            },
            created_at: new Date(),
            deleted_at: null,
            mv_last: {
                create: {
                    snapshot: { connect: { id: snapshot.id } },
                },
            },
        });
    };
}
